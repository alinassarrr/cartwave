<?php

namespace App\Services\Admin;

use App\Models\Order;
use App\Models\OrdersPerHour;
use Illuminate\Support\Carbon;

class AnalyticsService {
    public static function getSummaryMetrics(): array {
        $totalOrders = Order::count();
        $totalRevenue = Order::sum('total');
        $averageOrderValue = $totalOrders > 0 ? round($totalRevenue / $totalOrders, 2) : 0;

        return [
            'total_orders' => $totalOrders,
            'total_revenue' => $totalRevenue,
            'average_order_value' => $averageOrderValue,
        ];
    }

    public static function getRevenueChartData(): array {
        $data = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $dailyRevenue = Order::whereDate('created_at', $date)->sum('total');

            $data[] = [
                'date' => $date->toDateString(),
                'revenue' => $dailyRevenue,
            ];
        }

        return $data;
    }

    public static function getOrdersPerHourChartData(): array {
        return OrdersPerHour::orderBy('hour')->get(['hour', 'order_count', 'revenue'])->map(function ($item) {
            return [
                'hour' => Carbon::parse($item->hour)->format('H:00'),
                'orders' => $item->order_count,
                'revenue' => $item->revenue,
            ];
        })->toArray();
    }
}