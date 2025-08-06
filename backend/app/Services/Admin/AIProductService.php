<?php

namespace App\Services\Admin;

use Illuminate\Support\Facades\Http;

class AIProductService {
    public static function generateDescription(string $name, float $price, string $color, string $size): string {
        $prompt = "Write a short, appealing product description for a product in an online store. " .
                  "The product is called '$name', it's $color in color, available in size $size, " .
                  "and costs \$$price.";

        $response = Http::withToken(config('services.openai.key'))
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4',
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a helpful marketing assistant.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
                'max_tokens' => 150,
                'temperature' => 0.7,
            ]);

        return $response->json('choices.0.message.content') ?? 'Unable to generate description.';
    }
}