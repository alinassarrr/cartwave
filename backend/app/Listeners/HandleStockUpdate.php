<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\OrderPlaced;
use App\Jobs\UpdateStock;


class HandleStockUpdate implements ShouldQueue {
 
    public function __construct() {
        //
    }

    public function handle(OrderPlaced $event): void {
        try {
            UpdateStock::dispatch($event->order)->onQueue('stocks');
        } catch (\Exception $e) {
            \Log::error('Failed to dispatch UpdateStock job: ' . $e->getMessage(), [
                'order_id' => $event->order->id ?? null
            ]);
        }
    }
}
