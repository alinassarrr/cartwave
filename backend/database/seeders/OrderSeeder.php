<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;

class OrderSeeder extends Seeder {
    public function run(): void {
        
        $users = User::all();

        foreach ($users as $user) {
            Order::factory()->count(2)->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
