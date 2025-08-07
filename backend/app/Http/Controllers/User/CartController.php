<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index()
    {
        $cart = $this->cartService->getUserCart();
        return $this->responseJSON($cart);
    }

    public function addItem(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = $this->cartService->addItem(
            $request->product_id,
            $request->quantity
        );

        return $this->responseJSON($cart);
    }

    public function updateQuantity(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);

        $cart = $this->cartService->updateQuantity($id, $request->quantity);
        return $this->responseJSON($cart);
    }

    public function removeItem($id)
    {
        $cart = $this->cartService->removeItem($id);
        return $this->responseJSON($cart);
    }

    public function clearCart()
    {
        $this->cartService->clearCart();
        return $this->responseJSON(['message' => 'Cart cleared successfully']);
    }
} 