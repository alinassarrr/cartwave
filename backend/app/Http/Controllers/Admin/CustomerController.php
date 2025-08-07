<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\CustomerService;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    protected $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    public function index(Request $request)
    {
        $filters = $request->all();
        $customers = $this->customerService->getCustomers($filters);
        return $this->responseJSON($customers);
    }

    public function show($id)
    {
        $customer = $this->customerService->getCustomer($id);
        return $this->responseJSON($customer);
    }
} 