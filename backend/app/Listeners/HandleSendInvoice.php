<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\OrderPlaced;
use App\Jobs\SendInvoiceEmail;


class HandleSendInvoice implements ShouldQueue {
    use InteractsWithQueue;

    public function handle(OrderPlaced $event): void {
        SendInvoiceEmail::dispatch($event->order)->onQueue('emails');
    }
}
