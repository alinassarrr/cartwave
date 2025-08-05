<?php

namespace App\Services\User;

use App\Models\Order;

class OrderService {
    public static function getOrdersForUser($userId) {
        return Order::with('orderItems.product')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public static function getSingleOrderForUser($userId, $orderId) {
        return Order::with('orderItems.product')
            ->where('user_id', $userId)
            ->where('id', $orderId)
            ->first();
    }
}