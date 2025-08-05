<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Address;

class AddressSeeder extends Seeder {
    public function run(): void {
        foreach (User::all() as $user) {
            Address::factory()->count(2)->create([
                'user_id' => $user->id,
                'is_default' => false,
            ]);

            $user->addresses()->first()?->update(['is_default' => true]);
        }
    }
}