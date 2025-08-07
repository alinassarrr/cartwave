<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\OrderPlaced;
use App\Jobs\SendSmsNotification;

class HandleSmsSend implements ShouldQueue {

    use InteractsWithQueue;
   
    public function __construct() {
        //
    }

    public function handle(OrderPlaced $event): void {
        SendSmsNotification::dispatch($event->order)->onQueue('sms');
    }
}
