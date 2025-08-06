<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Events\OrderPlaced;
use App\Listeners\HandleSendInvoice;
use App\Listeners\HandleStockUpdate;
use App\Listeners\HandlePushWebhook;
use App\Listeners\HandleSmsSend;
use App\Listeners\HandleOrderAnalytics;


class EventServiceProvider extends ServiceProvider {
   
    protected $listen = [
        OrderPlaced::class => [
            HandleSendInvoice::class,
            HandleStockUpdate::class,
            HandlePushWebhook::class,
            HandleSmsSend::class,
            HandleOrderAnalytics::class,
        ],
    ];

    public function boot(): void {
        //
    }
}
