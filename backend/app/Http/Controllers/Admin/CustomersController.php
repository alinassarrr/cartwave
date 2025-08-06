<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\CustomersService;
use Illuminate\Http\Request;

class CustomersController extends Controller {
    public function index(Request $request) {
        $customers = CustomersService::getCustomersWithOrderStats($request->all());
        return $this->responseJSON($customers);
    }
}