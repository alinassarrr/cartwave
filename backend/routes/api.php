<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Common\AuthController;
use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\User\AddressController;
use App\Http\Controllers\User\CheckoutController;
use App\Http\Controllers\Common\NotificationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrdersController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\CustomersController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\User\ProfileController;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']); // User/Admin login
    Route::post('/register', [AuthController::class, 'register']); // User registration
    Route::post('/password/email', [AuthController::class, 'sendResetLinkEmail']); // Send reset email
    Route::post('/password/reset', [AuthController::class, 'reset']); // Reset password
});

Route::middleware('auth:api')->prefix('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']); // Logout
    Route::get('/me', [AuthController::class, 'me']); // Get current user
    Route::post('/refresh', [AuthController::class, 'refresh']); // Refresh token
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']); // List all products
    Route::get('/{id}', [ProductController::class, 'show']); // Show product by ID
});

Route::middleware('auth:api')->group(function () {

    // Orders (User)
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']); // List user's orders
        Route::get('/{id}', [OrderController::class, 'show']); // Show user's order
    });

    // Addresses (User)
    Route::prefix('addresses')->group(function () {
        Route::get('/', [AddressController::class, 'index']); // List addresses
        Route::post('/', [AddressController::class, 'store']); // Add address
        Route::post('/{id}/set-default', [AddressController::class, 'setDefault']); // Set default address
        Route::post('/{id}', [AddressController::class, 'update']); // Update address
        Route::post('/{id}/delete', [AddressController::class, 'destroy']); // Delete address
    });

    // Checkout (User)
    Route::post('/cart/checkout', [CheckoutController::class, 'checkout']); // Checkout order

    // Notifications (User/Admin shared)
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']); // Get notifications
        Route::post('/{id}/mark-as-read', [NotificationController::class, 'markAsRead']); // Mark one as read
        Route::post('/mark-all-as-read', [NotificationController::class, 'markAllAsRead']); // Mark all as read
    });

    // Profile (User)
    Route::prefix('user/profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show']); // Show user profile
        Route::post('/update', [ProfileController::class, 'update']); // Update profile info
        Route::post('/upload-profile-picture', [ProfileController::class, 'uploadProfilePicture']); // Upload profile image (base64)
    });
});

Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']); // Dashboard summary

    // Orders
    Route::get('/orders', [OrdersController::class, 'index']); // List all orders
    Route::get('/orders/stats', [OrdersController::class, 'stats']); // Order/revenue stats
    Route::put('/orders/{id}/status', [OrdersController::class, 'updateStatus']); // Update order status

    // Products
    Route::get('/products', [ProductsController::class, 'index']); // List products
    Route::post('/products', [ProductsController::class, 'store']); // Add product
    Route::get('/products/{id}', [ProductsController::class, 'show']); // Show product
    Route::put('/products/{id}', [ProductsController::class, 'update']); // Update product
    Route::delete('/products/{id}', [ProductsController::class, 'destroy']); // Delete product
    Route::get('/products/low-stock', [ProductsController::class, 'lowStock']); // List low stock
    Route::get('/products/out-of-stock', [ProductsController::class, 'outOfStock']); // List out of stock
    Route::post('/products/generate-description', [ProductsController::class, 'generateDescription']);
    Route::get('/products/summary', [ProductsController::class, 'summary']); // Product summary (total/count)

    // Customers
    Route::get('/customers', [CustomersController::class, 'index']); // List customers with orders

    // Analytics
    Route::prefix('analytics')->group(function () {
        Route::get('/summary', [AnalyticsController::class, 'summary']); // Basic stats
        Route::get('/revenue-chart', [AnalyticsController::class, 'revenueChart']); // Revenue chart data
        Route::get('/orders-per-hour', [AnalyticsController::class, 'ordersPerHourChart']); // Orders per hour chart
    });

    // Settings (Admin profile)
    Route::prefix('settings')->group(function () {
        Route::post('/update-profile', [SettingsController::class, 'updateProfile']); // Update admin profile
        Route::post('/upload-profile-picture', [SettingsController::class, 'uploadProfilePicture']); // Upload admin image
        Route::delete('/remove-profile-picture', [SettingsController::class, 'removeProfilePicture']); // Remove admin image
    });
});
