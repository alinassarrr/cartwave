<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class ProductImageSeeder extends Seeder {
    public function run(): void {
        foreach (Product::all() as $product) {
            ProductImage::factory()->count(4)->sequence(
                ['is_primary' => true, 'position' => 0],
                ['is_primary' => false, 'position' => 1],
                ['is_primary' => false, 'position' => 3],
                ['is_primary' => false, 'position' => 4]

            )->create([
                'product_id' => $product->id,
            ]);
        }
    }
}