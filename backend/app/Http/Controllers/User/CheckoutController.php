<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Checkout\CheckoutRequest;
use App\Services\User\CheckoutService;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller {
    public function checkout(CheckoutRequest $request) {
        $order = CheckoutService::processCheckout(Auth::id(), $request->validated());

        if (! $order) {
            return $this->responseJSON(null, 'error', 400);
        }

        return $this->responseJSON($order);
    }
}