<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class FilterProductRequest extends FormRequest {
    public function rules(): array {
        return [
            'search' => 'nullable|string',
            'category_id' => 'nullable|integer|exists:categories,id',
            'color' => 'nullable|in:Red,Blue,Black,White',
            'size' => 'nullable|in:S,M,L,XL',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|gte:min_price',
            'sort_by' => 'nullable|in:price,name,created_at',
            'sort_order' => 'nullable|in:asc,desc',
            'page' => 'nullable|integer|min:1',
            'per_page' => 'nullable|integer|min:1|max:100',
        ];
    }
}