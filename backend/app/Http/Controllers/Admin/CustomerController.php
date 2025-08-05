<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\CustomerService;
use Illuminate\Http\Request;

class CustomersController extends Controller {
    public function index(Request $request) {
        $customers = CustomerService::getCustomersWithOrderStats($request->all());
        return $this->responseJSON($customers);
    }
}