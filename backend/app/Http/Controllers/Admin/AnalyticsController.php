<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AnalyticsService;

class AnalyticsController extends Controller {
    public function summary() {
        $data = AnalyticsService::getSummaryMetrics();
        return $this->responseJSON($data);
    }

    public function revenueChart() {
        $chart = AnalyticsService::getRevenueChartData();
        return $this->responseJSON($chart);
    }

    public function ordersPerHourChart() {
        $chart = AnalyticsService::getOrdersPerHourChartData();
        return $this->responseJSON($chart);
    }
}