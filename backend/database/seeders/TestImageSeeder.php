<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class TestImageSeeder extends Seeder {
    public function run(): void {
        // Get the first product
        $product = Product::first();
        
        if ($product) {
            // Add a test image with external URL
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => 'https://www.pexels.com/photo/black-fujifilm-dslr-camera-90946/',
                'is_primary' => true,
                'position' => 0,
            ]);
            
            echo "Test image added to product: " . $product->name . "\n";
        } else {
            echo "No products found in database\n";
        }
    }
} 