<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendInvoiceEmail implements ShouldQueue {
    use Queueable;

    public $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function handle(): void {
        Mail::raw("Invoice for Order #{$this->order->id}", function ($message) {
            $message->to('customer@example.com')->subject('Your Invoice');
        });
    }
}
