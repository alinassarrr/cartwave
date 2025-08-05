<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductRequest;
use App\Services\Admin\ProductService;
use Illuminate\Http\Request;

class ProductsController extends Controller {
    public function index(Request $request) {
        $products = ProductService::getFilteredProducts($request->all());
        return $this->responseJSON($products);
    }

    public function store(ProductRequest $request) {
        $product = ProductService::createProduct($request->validated());
        return $this->responseJSON($product, 'Product created successfully');
    }

    public function show($id) {
        $product = ProductService::getProductById($id);
        return $this->responseJSON($product);
    }

    public function update(ProductRequest $request, $id) {
        $product = ProductService::updateProduct($id, $request->validated());
        return $this->responseJSON($product, 'Product updated successfully');
    }

    public function destroy($id) {
        ProductService::deleteProduct($id);
        return $this->responseJSON(null, 'Product deleted successfully');
    }

    public function lowStock() {
        $products = ProductService::getLowStockProducts();
        return $this->responseJSON($products);
    }

    public function outOfStock() {
        $products = ProductService::getOutOfStockProducts();
        return $this->responseJSON($products);
    }

    public function summary() {
        $summary = ProductService::getSummaryCards();
        return $this->responseJSON($summary);
    }
}