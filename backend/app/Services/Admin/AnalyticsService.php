<?php

namespace App\Services\Admin;

use App\Models\Order;
use App\Models\OrdersPerHour;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    public function getRevenueData()
    {
        $now = Carbon::now();
        $lastMonth = Carbon::now()->subMonth();

        // Get revenue for last 7 days
        $dailyRevenue = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = $now->copy()->subDays($i);
            $revenue = Order::where('status', 'completed')
                ->whereDate('created_at', $date)
                ->sum('total_amount');
            
            $dailyRevenue[] = [
                'date' => $date->format('Y-m-d'),
                'revenue' => $revenue
            ];
        }

        // Monthly comparison
        $currentMonthRevenue = Order::where('status', 'completed')
            ->whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->sum('total_amount');

        $lastMonthRevenue = Order::where('status', 'completed')
            ->whereMonth('created_at', $lastMonth->month)
            ->whereYear('created_at', $lastMonth->year)
            ->sum('total_amount');

        $growth = $lastMonthRevenue > 0 ? round((($currentMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100, 1) : 0;

        return [
            'daily_revenue' => $dailyRevenue,
            'current_month' => $currentMonthRevenue,
            'last_month' => $lastMonthRevenue,
            'growth_percentage' => $growth
        ];
    }

    public function getOrdersPerHour()
    {
        $today = Carbon::today();
        
        // Get orders per hour for today
        $ordersPerHour = Order::whereDate('created_at', $today)
            ->selectRaw('HOUR(created_at) as hour, COUNT(*) as orders')
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->keyBy('hour');

        // Fill in missing hours with 0 orders
        $data = [];
        for ($hour = 0; $hour < 24; $hour++) {
            $data[] = [
                'hour' => sprintf('%02d:00', $hour),
                'orders' => $ordersPerHour->get($hour, (object)['orders' => 0])->orders
            ];
        }

        return $data;
    }
}