<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateOrderStatusRequest;
use App\Services\Admin\OrderService;
use Illuminate\Http\Request;

class OrdersController extends Controller {
    public function index(Request $request) {
        $orders = OrderService::getFilteredOrders($request->all());
        return $this->responseJSON($orders);
    }

    public function stats() {
        $stats = OrderService::getOrderStats();
        return $this->responseJSON($stats);
    }

    public function updateStatus(UpdateOrderStatusRequest $request, $id) {
        $updatedOrder = OrderService::updateOrderStatus($id, $request->validated()['status']);
        return $this->responseJSON($updatedOrder, 'Order status updated');
    }
}