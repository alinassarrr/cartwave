<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

class ProductFactory extends Factory {

    protected $model = Product::class;

    public function definition(): array {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(12),
            'price' => $this->faker->randomFloat(2, 5, 1000),
            'stock' => $this->faker->numberBetween(0, 500),
            'color' => $this->faker->randomElement(['Red', 'Blue', 'Black', 'White']),
            'size' => $this->faker->randomElement(['S', 'M', 'L', 'XL']),
            'sku' => $this->faker->unique()->regexify('[A-Z]{2}[0-9]{6}'),
            'category_id' => null,
        ];
    }
}
