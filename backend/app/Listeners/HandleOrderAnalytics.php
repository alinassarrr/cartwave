<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\OrderPlaced;
use App\Jobs\LogOrderAnalytics;

class HandleOrderAnalytics implements ShouldQueue {

    use InteractsWithQueue;
   
    public function __construct() {
        //
    }

    public function handle(OrderPlaced $event): void {
        try {
            LogOrderAnalytics::dispatch($event->order)->onQueue('analytics');
        } catch (\Exception $e) {
            \Log::error('Failed to dispatch LogOrderAnalytics job: ' . $e->getMessage(), [
                'order_id' => $event->order->id ?? null
            ]);
        }
    }
}
