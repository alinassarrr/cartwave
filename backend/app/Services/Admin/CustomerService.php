<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Models\Order;

class CustomerService
{
    public function getCustomers($filters = [])
    {
        $query = User::whereDoesntHave('admin')
            ->withCount(['orders'])
            ->withSum('orders', 'total');

        // Apply filters
        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('first_name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('last_name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('email', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (!empty($filters['has_orders'])) {
            if ($filters['has_orders'] === 'true') {
                $query->has('orders');
            } else {
                $query->doesntHave('orders');
            }
        }

        if (!empty($filters['sort_by'])) {
            $direction = $filters['sort_direction'] ?? 'desc';
            $query->orderBy($filters['sort_by'], $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function getCustomer($id)
    {
        return User::whereDoesntHave('admin')
            ->with([
                'orders' => function($query) {
                    $query->orderBy('created_at', 'desc');
                },
                'addresses'
            ])
            ->withCount(['orders'])
            ->withSum('orders', 'total')
            ->findOrFail($id);
    }
} 