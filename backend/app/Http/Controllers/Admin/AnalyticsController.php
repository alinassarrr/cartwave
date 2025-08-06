<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AnalyticsService;

class AnalyticsController extends Controller
{
    protected $analyticsService;

    public function __construct(AnalyticsService $analyticsService)
    {
        $this->analyticsService = $analyticsService;
    }

    public function revenue()
    {
        $data = $this->analyticsService->getRevenueData();
        return $this->responseJSON($data);
    }

    public function ordersPerHour()
    {
        $data = $this->analyticsService->getOrdersPerHour();
        return $this->responseJSON($data);
    }
}