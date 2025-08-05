<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\OrderService;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller {
    public function index() {
        $orders = OrderService::getOrdersForUser(Auth::id());
        return $this->responseJSON($orders);
    }

    public function show($id) {
        $order = OrderService::getSingleOrderForUser(Auth::id(), $id);
        if (!$order) {
            return $this->responseJSON(null, 'error', 404);
        }
        return $this->responseJSON($order);
    }
}