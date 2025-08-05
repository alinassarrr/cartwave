<?php

namespace App\Services\User;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductService {
    public static function getFilteredProducts(array $filters) {
        $query = Product::with(['category', 'images']);

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (!empty($filters['color'])) {
            $query->where('color', $filters['color']);
        }

        if (!empty($filters['size'])) {
            $query->where('size', $filters['size']);
        }

        if (!empty($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if (!empty($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        if (!empty($filters['sort_by'])) {
            $query->orderBy($filters['sort_by'], $filters['sort_order'] ?? 'asc');
        }

        return $query->paginate($filters['per_page'] ?? 10)->through(function ($product) {
            $product->images->transform(function ($image) {
                $image->image_url = Storage::url($image->image_path);
                return $image;
            });
            return $product;
        });
    }

    public static function getProductById($id) {
        $product = Product::with(['category', 'images'])->findOrFail($id);

        $product->images->transform(function ($image) {
            $image->image_url = Storage::url($image->image_path);
            return $image;
        });

        return $product;
    }
}