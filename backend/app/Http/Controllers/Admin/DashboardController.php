<?php

namespace App\Http\Controllers\Admin;
use App\Traits\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Services\Admin\DashboardService;

class DashboardController extends Controller
{
    use RespondsWithJson;
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function overview()
    {
        $overview = $this->dashboardService->getOverview();
        return $this->responseJSON($overview);
    }

    public function recentOrders()
    {
        $orders = $this->dashboardService->getRecentOrders();
        return $this->responseJSON($orders);
    }

    public function lowStockProducts()
    {
        $products = $this->dashboardService->getLowStockProducts();
        return $this->responseJSON($products);
    }
}