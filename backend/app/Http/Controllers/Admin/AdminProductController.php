<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminProductService;
use Illuminate\Http\Request;

class AdminProductController extends Controller
{
    protected $productService;

    public function __construct(AdminProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {
        $filters = $request->all();
        $products = $this->productService->getProducts($filters);
        return $this->responseJSON($products);
    }

    public function overview()
    {
        $overview = $this->productService->getProductOverview();
        return $this->responseJSON($overview);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'sku' => 'nullable|string|unique:products,sku',
            'color' => 'nullable|string|max:50',
            'size' => 'nullable|string|max:50',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        
        $data = $request->all();
        if (empty($data['sku'])) {
            // Generate a more unique SKU
            $timestamp = time();
            $random = rand(1000, 9999);
            $data['sku'] = 'SKU-' . $timestamp . '-' . $random;
            
            
            while (\App\Models\Product::where('sku', $data['sku'])->exists()) {
                $random = rand(1000, 9999);
                $data['sku'] = 'SKU-' . $timestamp . '-' . $random;
            }
        }

        try {
            $product = $this->productService->createProduct($data);
            return $this->responseJSON($product, 'Product created successfully');
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function show($id)
    {
        $product = $this->productService->getProduct($id);
        return $this->responseJSON($product);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'category_id' => 'sometimes|exists:categories,id',
            'sku' => 'sometimes|string|unique:products,sku,' . $id,
            'color' => 'nullable|string|max:50',
            'size' => 'nullable|string|max:50',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $product = $this->productService->updateProduct($id, $request->all());
        return $this->responseJSON($product, 'Product updated successfully');
    }

    public function destroy($id)
    {
        $this->productService->deleteProduct($id);
        return $this->responseJSON(null, 'Product deleted successfully');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:products,id'
        ]);

        $this->productService->bulkDelete($request->ids);
        return $this->responseJSON(null, 'Products deleted successfully');
    }
} 