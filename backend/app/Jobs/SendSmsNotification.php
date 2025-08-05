<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendSmsNotification implements ShouldQueue {
    use Queueable, Dispatchable, InteractsWithQueue, SerializesModels;

    public $order;

    public function __construct($order) {
        $this->order = $order;
    }

    public function handle(): void {
        Log::info('SMS Sent for Order #' . $this->order->id);
    }
}
