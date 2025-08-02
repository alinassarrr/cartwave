<?php

namespace App\Http\Controllers\User;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;


class ProductController extends Controller {
    public function index(Request $request) {
        $cacheKey = 'products_' . md5($request->getQueryString() ?? 'all');
        return Cache::remember($cacheKey, 3600, function () use ($request) {
            $query = \App\Models\Product::with('category');

            if ($request->has('search')) {
                $query->where('name', 'like', "%{$request->search}%");
            }

            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            if ($request->has('min_price') || $request->has('max_price')) {
                $query->whereBetween('price', [
                    $request->min_price ?? 0,
                    $request->max_price ?? PHP_INT_MAX
                ]);
            }

            return $query->paginate(10);
        });
    }

    public function store(Request $request) {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric',
                'stock' => 'required|integer',
                'color' => 'required|in:Red,Blue,Black,White',
                'size' => 'required|in:S,M,L,XL',
                'image_path' => 'nullable|image|max:2048',
                'category_id' => 'nullable|exists:categories,id',
            ]);

            $product = \App\Models\Product::create($request->only([
                'name', 'description', 'price', 'stock', 'color', 'size', 'image_path', 'category_id'
            ]));

            if ($request->hasFile('image')) {
                $product->image = $request->file('image')->store('products', 'public');
                $product->save();
            }

            Cache::forget('products_*');
            return response()->json([
                'message' => 'Product created',
                'product' => $product
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create product',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id) {
        $product = \App\Models\Product::with('category')->findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id) {
        try {
            $product = \App\Models\Product::findOrFail($id);
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric',
                'stock' => 'required|integer',
                'color' => 'required|in:Red,Blue,Black,White',
                'size' => 'required|in:S,M,L,XL',
                'image_path' => 'nullable|image|max:2048',
                'category_id' => 'nullable|exists:categories,id',
            ]);

            $product->update($request->only([
                'name', 'description', 'price', 'stock', 'color', 'size', 'image_path', 'category_id'
            ]));

            if ($request->hasFile('image')) {
                $product->image = $request->file('image')->store('products', 'public');
                $product->save();
            }

            Cache::forget('products_*');
            return response()->json([
                'message' => 'Product updated',
                'product' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update product',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id) {
        try {
            $product = \App\Models\Product::findOrFail($id);
            $product->delete();
            Cache::forget('products_*');
            return response()->json(['message' => 'Product deleted']);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete product',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
