<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder {

    public function run(): void {
        
        // Create specific categories that match our frontend
        $categories = [
            ['name' => 'Clothing', 'description' => 'Fashion and apparel items'],
            ['name' => 'Electronics', 'description' => 'Electronic devices and gadgets'],
            ['name' => 'Books', 'description' => 'Books and publications'],
            ['name' => 'Accessories', 'description' => 'Fashion accessories and add-ons'],
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }
    }
}
