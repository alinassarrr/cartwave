<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

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