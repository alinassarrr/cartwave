<?php

namespace App\Services\User;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use App\Events\OrderPlaced;

class CheckoutService {
    public static function processCheckout($userId, array $data) {
        return DB::transaction(function () use ($userId, $data) {
            $total = 0;
            $items = [];

            foreach ($data['items'] as $item) {
                $product = Product::lockForUpdate()->find($item['product_id']);

                if (! $product || $product->stock < $item['quantity']) {
                    throw new \Exception('Insufficient stock for product ID ' . $item['product_id']);
                }

                $lineTotal = $product->price * $item['quantity'];
                $total += $lineTotal;

                $items[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ];
            }

            $order = Order::create([
                'user_id' => $userId,
                'total' => $total,
                'shipping_price' => 0,
                'status' => 'pending',
            ]);

            foreach ($items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product']->id,
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);

                $item['product']->decrement('stock', $item['quantity']);
            }

            Event::dispatch(new OrderPlaced($order));

            return $order->load('orderItems.product');
        });
    }
}