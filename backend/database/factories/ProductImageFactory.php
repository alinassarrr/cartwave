<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImageFactory extends Factory {
    protected $model = ProductImage::class;

    public function definition(): array {
        return [
            'product_id' => Product::factory(),
            'image_path' => 'product_images/' . $this->faker->uuid . '.jpg',
            'is_primary' => false,
            'position' => 0,
        ];
    }
}