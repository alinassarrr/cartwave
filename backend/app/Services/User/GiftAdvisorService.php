<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Http;

class GiftAdvisorService {
    public static function getSuggestion(array $input, $products): array {
        $productList = $products->map(function ($product) {
            return "- {$product->name}: {$product->description}";
        })->implode("\n");

        $prompt = "You are a helpful gift recommendation assistant. A user is looking for a gift for a " .
                  "{$input['age']}-year-old " . ($input['gender'] ?? 'person') . " who is interested in {$input['interests']} " .
                  "with a budget of \${$input['budget']}.\n\nHere are the available products:\n{$productList}\n\n" .
                  "Pick one product and explain briefly why it's a great gift.";

        $response = Http::withToken(config('services.openai.key'))
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4',
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a helpful and concise gift assistant.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
                'max_tokens' => 200,
                'temperature' => 0.8,
            ]);

        return [
            'suggestion' => $response->json('choices.0.message.content') ?? 'No recommendation found.',
        ];
    }
}