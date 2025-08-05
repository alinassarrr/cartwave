<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model {
    
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'order_id',
        'action',
        'old_status',
        'new_status',
    ];

    public function admin() {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function order() {
        return $this->belongsTo(Order::class);
    }
}