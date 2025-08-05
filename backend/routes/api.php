<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\User\AddressController;
use App\Http\Controllers\User\CheckoutController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrdersController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\CustomersController;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/password/email', [AuthController::class, 'sendResetLinkEmail']);
    Route::post('/password/reset', [AuthController::class, 'reset']);
});

Route::middleware('auth:api')->prefix('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'show']);
});

Route::middleware('auth:api')->prefix('orders')->group(function () {
    Route::get('/', [OrderController::class, 'index']);
    Route::get('/{id}', [OrderController::class, 'show']);
});

Route::middleware('auth:api')->prefix('addresses')->group(function () {
    Route::get('/', [AddressController::class, 'index']);
    Route::post('/', [AddressController::class, 'store']);
    Route::post('/{id}/set-default', [AddressController::class, 'setDefault']);
    Route::post('/{id}', [AddressController::class, 'update']);
    Route::post('/{id}/delete', [AddressController::class, 'destroy']);
});

Route::middleware('auth:api')->post('/cart/checkout', [CheckoutController::class, 'checkout']);

Route::middleware('auth:api')->prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index']);
    Route::post('/{id}/mark-as-read', [NotificationController::class, 'markAsRead']);
    Route::post('/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);
});

Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function () {
    Route::get('/orders', [OrdersController::class, 'index']);
    Route::get('/orders/stats', [OrdersController::class, 'stats']);
    Route::put('/orders/{id}/status', [OrdersController::class, 'updateStatus']);
});

Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function () {
    Route::get('/products', [ProductsController::class, 'index']);
    Route::post('/products', [ProductsController::class, 'store']);
    Route::get('/products/{id}', [ProductsController::class, 'show']);
    Route::put('/products/{id}', [ProductsController::class, 'update']);
    Route::delete('/products/{id}', [ProductsController::class, 'destroy']);
    Route::get('/products/low-stock', [ProductsController::class, 'lowStock']);
    Route::get('/products/out-of-stock', [ProductsController::class, 'outOfStock']);
    Route::get('/products/summary', [ProductsController::class, 'summary']);
});

Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function () {
    Route::get('/customers', [CustomersController::class, 'index']);
});
