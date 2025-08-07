<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        // External image URLs for products
        $imageUrls = [
            'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1647977/pexels-photo-1647977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1647978/pexels-photo-1647978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1647979/pexels-photo-1647979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1647980/pexels-photo-1647980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1647981/pexels-photo-1647981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/1647982/pexels-photo-1647982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        ];

        foreach (Product::all() as $index => $product) {
            // Assign 2-4 images per product
            $numImages = rand(2, 4);
            
            for ($i = 0; $i < $numImages; $i++) {
                $imageUrl = $imageUrls[($index + $i) % count($imageUrls)];
                
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $imageUrl,
                    'is_primary' => $i === 0, // First image is primary
                    'position' => $i,
                ]);
            }
        }
    }
}