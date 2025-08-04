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
    public function login(LoginRequest $request) {
        $result = AuthService::login($request->validated());
        return $this->responseJSON($result);
    }

    public function register(RegisterRequest $request) {
        $result = AuthService::register($request->validated());
        return $this->responseJSON($result);
    }

    public function logout() {
        Auth::logout();
        return $this->responseJSON(null, 'success');
    }

    public function refresh() {
        return $this->responseJSON(AuthService::refresh());
    }

    public function me() {
        return $this->responseJSON(Auth::user());
    }

    public function sendResetLinkEmail(SendResetLinkRequest $request) {
        $result = AuthService::sendResetLink($request->validated());
        return $this->responseJSON($result);
    }

    public function reset(ResetPasswordRequest $request) {
        $result = AuthService::resetPassword($request->validated());
        return $this->responseJSON($result);
    }
}