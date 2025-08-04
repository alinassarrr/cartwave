<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\SendResetLinkRequest;
use App\Services\Common\AuthService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller {
    protected AuthService $authService;

    public function __construct(AuthService $authService) {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request) {
        return $this->authService->login($request->validated());
    }

    public function register(RegisterRequest $request) {
        return $this->authService->register($request->validated());
    }

    public function logout() {
        Auth::logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh() {
        return $this->authService->respondWithToken(Auth::refresh());
    }

    public function me() {
        return response()->json(Auth::user());
    }

    public function sendResetLinkEmail(SendResetLinkRequest $request) {
        return $this->authService->sendResetLink($request->validated());
    }

    public function reset(ResetPasswordRequest $request) {
        return $this->authService->resetPassword($request->validated());
    }
}