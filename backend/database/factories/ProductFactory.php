<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(12),
            'price' => $this->faker->randomFloat(2, 5, 1000),
            'stock' => $this->faker->numberBetween(0, 500),
            'color' => $this->faker->randomElement(['Red', 'Blue', 'Black', 'White']),
            'size' => $this->faker->randomElement(['S', 'M', 'L', 'XL']),
            'image_path' => $this->faker->imageUrl(640, 480, 'products', true),
            'category_id' => null,
        ];
    }
}
