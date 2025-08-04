<?php
namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class ProfileImageRequest extends FormRequest {
    public function rules(): array {
        return [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }
}