<?php

namespace App\Services\Admin;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;

class AdminProductService
{
    public function getProductOverview()
    {
        return [
            'total_products' => Product::count(),
            'low_stock' => Product::where('stock', '<=', 10)->where('stock', '>', 0)->count(),
            'out_of_stock' => Product::where('stock', 0)->count(),
            'categories' => \App\Models\Category::count(),
        ];
    }
    public function getProducts($filters = [])
    {
        $query = Product::with(['category', 'images']);

        // Apply filters
        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('description', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('sku', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (!empty($filters['status'])) {
            if ($filters['status'] === 'in_stock') {
                $query->where('stock', '>', 0);
            } elseif ($filters['status'] === 'out_of_stock') {
                $query->where('stock', 0);
            } elseif ($filters['status'] === 'low_stock') {
                $query->where('stock', '<=', 10)->where('stock', '>', 0);
            }
        }

        if (!empty($filters['sort_by'])) {
            $direction = $filters['sort_direction'] ?? 'asc';
            $query->orderBy($filters['sort_by'], $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function createProduct($data)
    {
        $product = Product::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'price' => $data['price'],
            'stock' => $data['stock'],
            'category_id' => $data['category_id'],
            'sku' => $data['sku'],
            'color' => $data['color'] ?? null,
            'size' => $data['size'] ?? null,
        ]);

        // Handle images
        if (isset($data['images']) && is_array($data['images'])) {
            foreach ($data['images'] as $image) {
                $path = $image->store('products', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'is_primary' => false,
                    'position' => 0,
                ]);
            }
        }

        return $product->load(['category', 'images']);
    }

    public function getProduct($id)
    {
        return Product::with(['category', 'images'])->findOrFail($id);
    }

    public function updateProduct($id, $data)
    {
        $product = Product::findOrFail($id);
        
        $product->update([
            'name' => $data['name'] ?? $product->name,
            'description' => $data['description'] ?? $product->description,
            'price' => $data['price'] ?? $product->price,
            'stock' => $data['stock'] ?? $product->stock,
            'category_id' => $data['category_id'] ?? $product->category_id,
            'sku' => $data['sku'] ?? $product->sku,
            'color' => $data['color'] ?? $product->color,
            'size' => $data['size'] ?? $product->size,
        ]);

        // Handle new images
        if (isset($data['images']) && is_array($data['images'])) {
            foreach ($data['images'] as $image) {
                $path = $image->store('products', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'is_primary' => false,
                    'position' => 0,
                ]);
            }
        }

        return $product->load(['category', 'images']);
    }

    public function deleteProduct($id)
    {
        $product = Product::findOrFail($id);
        
        // Delete associated images
        foreach ($product->images as $image) {
            if (Storage::disk('public')->exists($image->image_path)) {
                Storage::disk('public')->delete($image->image_path);
            }
            $image->delete();
        }
        
        $product->delete();
    }

    public function bulkDelete($ids)
    {
        $products = Product::whereIn('id', $ids)->get();
        
        foreach ($products as $product) {
            // Delete associated images
            foreach ($product->images as $image) {
                if (Storage::disk('public')->exists($image->image_path)) {
                    Storage::disk('public')->delete($image->image_path);
                }
                $image->delete();
            }
        }
        
        Product::whereIn('id', $ids)->delete();
    }
} 