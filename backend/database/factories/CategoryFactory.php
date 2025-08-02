<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CategoryFactory extends Factory {

    protected $model = Category::class;

    public function definition(): array {

        $name = $this->faker->unique()->word();

        return [
            'name' => ucfirst($this->faker->unique()->word()),
            'description' => $this->faker->sentence(),
            'image_url' => $this->faker->imageUrl(),
            'is_active' => true,
        ];
    }
}