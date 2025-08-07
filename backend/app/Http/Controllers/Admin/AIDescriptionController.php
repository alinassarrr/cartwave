<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Services\Admin\AIProductService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class AIDescriptionController extends Controller {
    public function generateDescription(Request $request): JsonResponse {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'color' => 'required|in:' . implode(',', Product::getColorOptions()),
            'size' => 'required|in:' . implode(',', Product::getSizeOptions()),
        ]);

        try {
            $description = AIProductService::generateDescription(
                $request->input('name'),
                $request->input('price'),
                $request->input('color'),
                $request->input('size')
            );

            return response()->json(['description' => $description]);
        } catch (\Exception $e) {
            Log::error('AI description generation failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to generate description',
                'message' => 'Please try again later'
            ], 500);
        }
    }
}