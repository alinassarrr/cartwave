<?php

namespace App\Services\User;

use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileService
{
    public function getUserProfile()
    {
        $user = Auth::user();
        
        // Get user stats
        $stats = $this->getUserStats($user->id);
        
        return [
            'user' => $user,
            'stats' => $stats
        ];
    }

    public function updateProfile($data)
    {
        $user = Auth::user();
        
        $user->update($data);
        
        return $this->getUserProfile();
    }

    public function updateAvatar($file)
    {
        $user = Auth::user();
        
        // Delete old avatar if exists
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }
        
        // Store new avatar
        $path = $file->store('avatars', 'public');
        
        $user->update(['avatar' => $path]);
        
        return $this->getUserProfile();
    }

    private function getUserStats($userId)
    {
        $totalOrders = Order::where('user_id', $userId)->count();
        $totalSpent = Order::where('user_id', $userId)
            ->where('status', 'completed')
            ->sum('total_amount');
        $pendingOrders = Order::where('user_id', $userId)
            ->whereIn('status', ['pending', 'processing'])
            ->count();
        
        return [
            'total_orders' => $totalOrders,
            'total_spent' => $totalSpent,
            'pending_orders' => $pendingOrders,
            'average_order_value' => $totalOrders > 0 ? round($totalSpent / $totalOrders, 2) : 0
        ];
    }
} 