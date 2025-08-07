<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Order;
use App\Models\User;

class OrderFactory extends Factory  {
    
    protected $model = Order::class;

    public function definition(): array {
        $shipping = $this->faker->randomFloat(2, 3, 15);
        $subtotal = $this->faker->randomFloat(2, 20, 300);
        $total = $subtotal + $shipping;
        return [
            'order_number' => 'ORD-' . strtoupper($this->faker->bothify('??##??##')),
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'total' => $total,
            'shipping_price' => $shipping,
            'status' => $this->faker->randomElement(['pending', 'paid', 'packed', 'shipped']),
        ];
    }
}
