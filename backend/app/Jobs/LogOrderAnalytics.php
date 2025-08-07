<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\OrdersPerHour;
use Carbon\Carbon;

class LogOrderAnalytics implements ShouldQueue
{
    use Queueable, Dispatchable, InteractsWithQueue, SerializesModels;

    public $order;

    public function __construct($order) {
        $this->order = $order;
    }

    public function handle(): void {
        $hour = Carbon::now()->startOfHour();
        $record = OrdersPerHour::firstOrCreate(['hour' => $hour], ['order_count' => 0, 'revenue' => 0.00]);
        $record->increment('order_count');
        $record->increment('revenue', $this->order->total);
        $record->save();
    }
}
