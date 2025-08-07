<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\OrderItem;
use App\Models\Product;

class UpdateStock implements ShouldQueue {
    use Queueable, Dispatchable, InteractsWithQueue, SerializesModels;

    public $order;

    public function __construct($order) {
        $this->order = $order;
    }

    public function handle(): void {
        foreach ($this->order->orderItems as $item) {
            $product = Product::find($item->product_id);
            if ($product) {
                $product->stock -= $item->quantity;
                $product->save();
            } else {
                \Log::warning("Product not found for order item ID: {$item->id}");
            }
        }
    }
}
