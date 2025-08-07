<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminOrderService;
use App\Traits\RespondsWithJson;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    use RespondsWithJson;
    protected $orderService;

    public function __construct(AdminOrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index(Request $request)
    {
        $filters = $request->all();
        $orders = $this->orderService->getOrders($filters);
        return $this->responseJSON($orders);
    }

    public function show($id)
    {
        $order = $this->orderService->getOrder($id);
        return $this->responseJSON($order);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,paid,packed,shipped'
        ]);

        $order = $this->orderService->updateStatus($id, $request->status);
        return $this->responseJSON($order, 'Order status updated successfully');
    }
    public function summary()
    {
        $summary = $this->orderService->getOrderSummary();
        return $this->responseJSON($summary);
    }
} 