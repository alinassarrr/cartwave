<?php

namespace App\Services\Admin;

use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Carbon;

class OrderService {
    public static function getOrderStats(): array {
        $today = Carbon::today();

        return [
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'shipped_today' => Order::where('status', 'shipped')->whereDate('updated_at', $today)->count(),
            'revenue_today' => Order::whereDate('created_at', $today)->sum('total'),
        ];
    }

    public static function getFilteredOrders(array $filters) {
        $query = Order::with('user');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['from_date']) && !empty($filters['to_date'])) {
            $query->whereBetween('created_at', [
                Carbon::parse($filters['from_date'])->startOfDay(),
                Carbon::parse($filters['to_date'])->endOfDay()
            ]);
        }

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->whereHas('user', function ($subQ) use ($filters) {
                    $subQ->where('first_name', 'like', '%' . $filters['search'] . '%')
                         ->orWhere('email', 'like', '%' . $filters['search'] . '%');
                })->orWhere('order_number', 'like', '%' . $filters['search'] . '%');
            });
        }

        return $query->latest()->paginate(10);
    }

    public static function updateOrderStatus(int $orderId, string $newStatus): Order {
        $order = Order::findOrFail($orderId);
        $oldStatus = $order->status;

        if ($oldStatus === $newStatus) {
            return $order;
        }

        $order->status = $newStatus;
        $order->save();

        //AuditLogService::logStatusChange($order->id, auth()->id(), $oldStatus, $newStatus);

        return $order;
    }
}