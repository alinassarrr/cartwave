<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\OrderItem;
use App\Models\Order;
use App\Models\Product;

class OrderItemSeeder extends Seeder {

    public function run(): void {
        
        $orders = Order::all();
        $products = Product::all();

        foreach ($orders as $order) {
            OrderItem::factory()->count(2)->create([
                'order_id' => $order->id,
                'product_id' => $products->random()->id,
            ]);
        }
    }
}