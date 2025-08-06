<?php

namespace App\Services\User;
use App\Services\User\CartService;

use App\Models\Order;

class OrderService {
    public static function getOrdersForUser($userId) {
        return Order::with('items.product')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public static function getSingleOrderForUser($userId, $orderId) {
        return Order::with('items.product')
            ->where('user_id', $userId)
            ->where('id', $orderId)
            ->first();
    }

     public static function createOrder($userId, $orderData) {
        // Create the order
        $order = Order::create([
            'user_id' => $userId,
            'order_number' => 'ORD-' . time(),
            'status' => 'pending',
            // 'total_amount' => $orderData['total_amount'] ?? 0,
            // 'shipping_address' => json_encode($orderData['shipping_address'] ?? []),
            // 'billing_address' => json_encode($orderData['billing_address'] ?? []),
            // 'payment_method' => $orderData['payment_method'] ?? 'cash_on_delivery',
            // 'notes' => $orderData['notes'] ?? '',
            'total' => $orderData['total_amount'] ?? 0,
            'shipping_price' => 0,
        ]);

        // Create order items from cart
        $cartItems = $orderData['items'] ?? [];
        foreach ($cartItems as $item) {
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                // 'total' => $item['price'] * $item['quantity'],
            ]);
        }

        // Clear the user's cart after order creation
        CartService::clearCart($userId);

        return $order->load('items.product');
    }
}