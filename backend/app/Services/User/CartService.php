<?php

namespace App\Services\User;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class CartService
{
    public function getUserCart()
    {
        $userId = Auth::id();
        $cartKey = "cart_user_{$userId}";
        
        $cart = Cache::get($cartKey, [
            'items' => [],
            'total' => 0,
            'count' => 0
        ]);

        // Load product details for each cart item
        foreach ($cart['items'] as &$item) {
            $product = Product::find($item['product_id']);
            if ($product) {
                $item['product'] = $product;
                $item['price'] = $product->price;
                $item['subtotal'] = $product->price * $item['quantity'];
            }
        }

        return $cart;
    }

    public function addItem($productId, $quantity = 1)
    {
        $userId = Auth::id();
        $cartKey = "cart_user_{$userId}";
        
        $cart = Cache::get($cartKey, [
            'items' => [],
            'total' => 0,
            'count' => 0
        ]);

        // Check if product exists
        $product = Product::find($productId);
        if (!$product) {
            throw new \Exception('Product not found');
        }

        // Check if product is already in cart
        $existingItemIndex = null;
        foreach ($cart['items'] as $index => $item) {
            if ($item['product_id'] == $productId) {
                $existingItemIndex = $index;
                break;
            }
        }

        if ($existingItemIndex !== null) {
            // Update existing item quantity
            $cart['items'][$existingItemIndex]['quantity'] += $quantity;
        } else {
            // Add new item
            $cart['items'][] = [
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $product->price
            ];
        }

        $this->updateCartTotals($cart);
        Cache::put($cartKey, $cart, 60 * 24 * 7); // 7 days

        return $cart;
    }

    public function updateQuantity($productId, $quantity)
    {
        $userId = Auth::id();
        $cartKey = "cart_user_{$userId}";
        
        $cart = Cache::get($cartKey, [
            'items' => [],
            'total' => 0,
            'count' => 0
        ]);

        // Find and update the item
        foreach ($cart['items'] as $index => $item) {
            if ($item['product_id'] == $productId) {
                if ($quantity <= 0) {
                    // Remove item if quantity is 0 or less
                    unset($cart['items'][$index]);
                } else {
                    $cart['items'][$index]['quantity'] = $quantity;
                }
                break;
            }
        }

        // Re-index array
        $cart['items'] = array_values($cart['items']);
        
        $this->updateCartTotals($cart);
        Cache::put($cartKey, $cart, 60 * 24 * 7);

        return $cart;
    }

    public function removeItem($productId)
    {
        $userId = Auth::id();
        $cartKey = "cart_user_{$userId}";
        
        $cart = Cache::get($cartKey, [
            'items' => [],
            'total' => 0,
            'count' => 0
        ]);

        // Remove the item
        $cart['items'] = array_filter($cart['items'], function($item) use ($productId) {
            return $item['product_id'] != $productId;
        });

        // Re-index array
        $cart['items'] = array_values($cart['items']);
        
        $this->updateCartTotals($cart);
        Cache::put($cartKey, $cart, 60 * 24 * 7);

        return $cart;
    }

    public static function clearCart()
    {
        $userId = Auth::id();
        $cartKey = "cart_user_{$userId}";
        
        Cache::forget($cartKey);
    }

    private function updateCartTotals(&$cart)
    {
        $total = 0;
        $count = 0;

        foreach ($cart['items'] as $item) {
            $product = Product::find($item['product_id']);
            if ($product) {
                $subtotal = $product->price * $item['quantity'];
                $total += $subtotal;
                $count += $item['quantity'];
            }
        }

        $cart['total'] = $total;
        $cart['count'] = $count;
    }
} 