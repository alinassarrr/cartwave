<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory {
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'first_name' => fake()->name(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'password' => static::$password ??= Hash::make('password'),
            'profile_picture_url' => fake()->imageUrl(640, 480, 'people'),
            'phone_number' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'date_of_birth' => fake()->date(),
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified(): static {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
