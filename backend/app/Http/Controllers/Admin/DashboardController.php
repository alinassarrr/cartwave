<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\DashboardService;

class DashboardController extends Controller {
    public function index() {
        $summary = DashboardService::getSummary();
        $recentOrders = DashboardService::getRecentOrders();
        $lowStockProducts = DashboardService::getLowStockProducts();

        return $this->responseJSON([
            'summary' => $summary,
            'recent_orders' => $recentOrders,
            'low_stock_products' => $lowStockProducts,
        ]);
    }
}