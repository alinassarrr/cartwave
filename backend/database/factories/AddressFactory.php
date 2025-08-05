<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory {
    protected $model = Address::class;

    public function definition(): array {
        return [
            'user_id' => User::factory(),
            'address_line1' => $this->faker->streetAddress,
            'address_line2' => $this->faker->secondaryAddress,
            'city' => $this->faker->city,
            'state' => $this->faker->state,
            'postal_code' => $this->faker->postcode,
            'country' => $this->faker->country,
            'is_default' => false,
        ];
    }
}