<?php

namespace App\Services\Admin;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;

class DashboardService
{
    public function getOverview()
    {
        $now = Carbon::now();
        $lastMonth = Carbon::now()->subMonth();

        // Total orders
        $totalOrders = Order::count();
        $lastMonthOrders = Order::where('created_at', '>=', $lastMonth)->count();
        $orderGrowth = $lastMonthOrders > 0 ? round((($totalOrders - $lastMonthOrders) / $lastMonthOrders) * 100, 1) : 0;

        // Revenue
        $totalRevenue = Order::where('status', 'paid')->sum('total');
        $lastMonthRevenue = Order::where('status', 'paid')
            ->where('created_at', '>=', $lastMonth)
            ->sum('total');
        $revenueGrowth = $lastMonthRevenue > 0 ? round((($totalRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100, 1) : 0;

        // Products
        $totalProducts = Product::count();
        $newProductsThisWeek = Product::where('created_at', '>=', Carbon::now()->subWeek())->count();

        // Customers
        $totalCustomers = User::whereDoesntHave('admin')->count();
        $newCustomersThisMonth = User::whereDoesntHave('admin')
            ->where('created_at', '>=', $lastMonth)
            ->count();
        $customerGrowth = $totalCustomers > 0 ? round(($newCustomersThisMonth / $totalCustomers) * 100, 1) : 0;

        return [
            'total_orders' => [
                'value' => $totalOrders,
                'growth' => $orderGrowth,
                'note' => $orderGrowth >= 0 ? "+{$orderGrowth}% from last month" : "{$orderGrowth}% from last month"
            ],
            'revenue' => [
                'value' => $totalRevenue,
                'growth' => $revenueGrowth,
                'note' => $revenueGrowth >= 0 ? "+{$revenueGrowth}% from last month" : "{$revenueGrowth}% from last month"
            ],
            'products' => [
                'value' => $totalProducts,
                'note' => "+{$newProductsThisWeek} new this week"
            ],
            'customers' => [
                'value' => $totalCustomers,
                'growth' => $customerGrowth,
                'note' => $customerGrowth >= 0 ? "+{$customerGrowth}% from last month" : "{$customerGrowth}% from last month"
            ]
        ];
    }

    public function getRecentOrders()
    {
        return Order::with(['user:id,first_name,last_name'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'customer' => $order->user->first_name . ' ' . $order->user->last_name,
                    'amount' => $order->total,
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('Y-m-d H:i:s')
                ];
            });
    }

    public function getLowStockProducts()
    {
        return Product::where('stock', '<=', 10)
            ->orderBy('stock', 'asc')
            ->limit(5)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'stock' => $product->stock,
                    'sku' => $product->sku
                ];
            });
    }
}