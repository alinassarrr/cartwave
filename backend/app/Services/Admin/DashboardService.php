<?php

namespace App\Services\Admin;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class DashboardService {
    public function getSummary(): array {
        return [
            'total_orders' => Order::count(),
            'total_revenue' => Order::sum('total'),
            'total_products' => Product::count(),
            'total_customers' => User::whereHas('orders')->count(),
        ];
    }

    public function getRecentOrders(int $limit = 5) {
        return Order::with('user')
            ->latest()
            ->take($limit)
            ->get()
            ->map(function ($order) {
                return [
                    'order_id' => $order->id,
                    'customer_name' => $order->user?->first_name,
                    'status' => $order->status,
                    'total' => $order->total,
                    'created_at' => $order->created_at->toDateTimeString(),
                ];
            });
    }

    public function getLowStockProducts(int $threshold = 3, int $limit = 5) {
        return Product::where('stock', '<', $threshold)
            ->orderBy('stock')
            ->take($limit)
            ->get(['id', 'name', 'stock']);
    }
}