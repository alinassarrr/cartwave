<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Services\User\GiftAdvisorService;
use App\Traits\RespondsWithJson;

class GiftAdvisorController extends Controller {
    use RespondsWithJson;
    public function recommend(Request $request) {
        $validated = $request->validate([
            'age' => 'required|integer|min:1|max:100',
            'interests' => 'required|string|max:255',
            'budget' => 'required|numeric|min:1',
            'gender' => 'nullable|string|max:10',
        ]);

        $products = Product::where('price', '<=', $validated['budget'])->limit(10)->get();

        $result = GiftAdvisorService::getSuggestion($validated, $products);

        return $this->responseJSON($result);
    }
}