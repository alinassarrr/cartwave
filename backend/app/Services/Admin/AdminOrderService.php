<?php

namespace App\Services\Admin;

use App\Models\Order;
use App\Models\OrderItem;

class AdminOrderService
{
    public function getOrders($filters = [])
    {
        $query = Order::with(['user:id,first_name,last_name,email', 'items.product']);

        // Apply filters
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('id', 'like', '%' . $filters['search'] . '%')
                  ->orWhereHas('user', function($userQuery) use ($filters) {
                      $userQuery->where('first_name', 'like', '%' . $filters['search'] . '%')
                               ->orWhere('last_name', 'like', '%' . $filters['search'] . '%')
                               ->orWhere('email', 'like', '%' . $filters['search'] . '%');
                  });
            });
        }

        if (!empty($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        if (!empty($filters['sort_by'])) {
            $direction = $filters['sort_direction'] ?? 'desc';
            $query->orderBy($filters['sort_by'], $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function getOrder($id)
    {
        return Order::with([
            'user:id,first_name,last_name,email,phone',
            'items.product',
            'address'
        ])->findOrFail($id);
    }

    public function updateStatus($id, $status)
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => $status]);
        
        return $order->load(['user:id,first_name,last_name,email', 'items.product']);
    }
} 