<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\OrderPlaced;
use App\Jobs\MockWebhook;

class HandlePushWebhook implements ShouldQueue {

    use InteractsWithQueue;

    public function __construct() {
        //
    }

    public function handle(OrderPlaced $event): void {
        MockWebhook::dispatch($event->order)->onQueue('webhooks');
    }
}
