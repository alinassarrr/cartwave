<?php

namespace App\Services\Admin;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class AIProductService  {
    public static function generateDescription(string $name, float $price, string $color, string $size): string  {
        $apiKey = config('services.openai.key');
        
        if (!$apiKey) {
            throw new Exception('OpenAI API key not configured');
        }

        $prompt = "Write a short, appealing product description for an online store. " .
                  "The product is called '$name', it's $color in color, available in size $size, " .
                  "and costs \$$price.";

        try {
            $response = Http::withToken($apiKey)
                ->timeout(30)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => 'gpt-4',
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a helpful marketing assistant.'],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'max_tokens' => 150,
                    'temperature' => 0.7,
                ]);

            if ($response->failed()) {
                Log::error('OpenAI API request failed', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                throw new Exception('OpenAI API request failed: ' . $response->status());
            }

            $content = $response->json('choices.0.message.content');
            
            if (!$content) {
                throw new Exception('No content received from OpenAI API');
            }

            return $content;

        } catch (Exception $e) {
            Log::error('AI description generation error: ' . $e->getMessage());
            throw $e;
        }
    }
}