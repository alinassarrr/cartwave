<?php

namespace App\Services\Admin;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Category;

class ProductService {
    public static function getFilteredProducts(array $filters) {
        $query = Product::with(['category', 'images']);

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('stock', $filters['status'] === 'out_of_stock' ? 0 : '<', 3);
        }

        return $query->latest()->paginate(10);
    }

    public static function createProduct(array $data): Product {
        $images = $data['images'] ?? [];
        unset($data['images']);

        $product = Product::create($data);

        self::saveImages($product, $images);

        return $product->load('images');
    }

    public static function updateProduct(int $productId, array $data): Product {
        $product = Product::findOrFail($productId);
        $images = $data['images'] ?? null;
        unset($data['images']);

        $product->update($data);

        if ($images !== null) {
            $product->images()->delete();
            self::saveImages($product, $images);
        }

        return $product->load('images');
    }

    public static function deleteProduct(int $productId): void {
        $product = Product::findOrFail($productId);
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }
        $product->delete();
    }

    public static function getProductById(int $productId): Product {
        return Product::with(['category', 'images'])->findOrFail($productId);
    }

    private static function saveImages(Product $product, array $images): void {
        foreach ($images as $index => $base64Image) {
            $path = self::saveBase64Image($base64Image, 'product_images');

            $product->images()->create([
                'image_path' => $path,
                'is_primary' => $index === 0,
                'position' => $index,
            ]);
        }
    }

    private static function saveBase64Image(string $base64, string $folder): string {
        if (!preg_match('/^data:image\/(\w+);base64,/', $base64, $type)) {
            throw new \Exception('Invalid image format.');
        }

        $extension = strtolower($type[1]);
        $base64Data = substr($base64, strpos($base64, ',') + 1);
        $decoded = base64_decode($base64Data);

        if ($decoded === false) {
            throw new \Exception('Base64 decoding failed.');
        }

        $filename = $folder . '/' . Str::uuid() . '.' . $extension;

        Storage::disk('public')->put($filename, $decoded);

        return $filename;
    }
    
    public static function getLowStockProducts(int $threshold = 3) {
        return Product::with('images')
            ->where('stock', '<', $threshold)
            ->orderBy('stock')
            ->get();
    }

    public static function getOutOfStockProducts() {
        return Product::with('images')
            ->where('stock', 0)
            ->orderBy('updated_at', 'desc')
            ->get();
    }

    public static function getSummaryCards(): array {
        return [
            'total_products' => Product::count(),
            'total_categories' => Category::count(),
        ];
    }
}