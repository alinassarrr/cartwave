<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder{
    public function run(): void{
        $this->call([
            UserSeeder::class,
            AdminSeeder::class,
            OrderItemSeeder::class,
            OrderSeeder::class,
            ProductSeeder::class,
            CategorySeeder::class,
            ProductImageSeeder::class,
            AddressSeeder::class,
        ]);
    }
}