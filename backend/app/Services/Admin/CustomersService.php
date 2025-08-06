<?php

namespace App\Services\Admin;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class CustomersService {
    public static function getCustomersWithOrderStats(array $filters) {
        $query = User::with(['addresses', 'orders'])
            ->whereHas('orders');

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('first_name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('email', 'like', '%' . $filters['search'] . '%');
            });
        }

        return $query->paginate(10)->through(function ($user) {
            $address = $user->addresses->first();

            return [
                'id' => $user->id,
                'name' => $user->first_name . ' ' . $user->last_name,
                'email' => $user->email,
                'city' => $address?->city,
                'country' => $address?->country,
                'total_orders' => $user->orders->count(),
            ];
        });
    }
}