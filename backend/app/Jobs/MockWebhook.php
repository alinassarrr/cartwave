<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class MockWebhook implements ShouldQueue {
    use Queueable, InteractsWithQueue, Dispatchable, SerializesModels;

    public $order;

    public function __construct($order) {
        $this->order = $order;
    }
  
    public function handle(): void {
        Http::post('http://localhost:8000/api/webhook', ['order_id' => $this->order->id, 'payload' => json_encode($this->order)]);
    }
}
