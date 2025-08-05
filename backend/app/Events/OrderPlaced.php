<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Order;

class OrderPlaced implements ShouldBroadcast {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order;

    public function __construct(Order $order) {
        $this->order = $order;
    }

    public function broadcastOn(): PrivateChannel {
        return new PrivateChannel('orders.' . $this->order->user_id);
    }

    public function broadcastWith(): array {
        return [
            'order_id' => $this->order->id,
            'status' => $this->order->status,
            'total' => $this->order->total,
            'created_at' => $this->order->created_at,
        ];
    }
}
