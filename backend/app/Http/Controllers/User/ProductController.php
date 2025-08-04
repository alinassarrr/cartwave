<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\FilterProductRequest;
use App\Services\User\ProductService;

class ProductController extends Controller {
    public function index(FilterProductRequest $request) {
        $products = ProductService::getFilteredProducts($request->validated());
        return $this->responseJSON($products);
    }

    public function show($id) {
        $product = ProductService::getProductById($id);
        return $this->responseJSON($product);
    }
}