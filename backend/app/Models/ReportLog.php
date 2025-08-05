<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportLog extends Model {
    
    protected $fillable = [
        'sent_at',
        'total_orders',
        'total_revenue',
    ];
}
