<?php

namespace App\Services\Common;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthService {
    public static function login(array $credentials) {
        $token = Auth::attempt($credentials);

        if (! $token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        return self::respondWithToken($token);
    }

    public static function register(array $data) {
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'email'      => $data['email'],
            'password'   => Hash::make($data['password']),
        ]);

        $token = Auth::login($user);

        return [
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ];
    }

    public static function sendResetLink(array $data) {
        $status = Password::sendResetLink(['email' => $data['email']]);

        return $status === Password::RESET_LINK_SENT
            ? ['status' => __($status)]
            : response()->json(['message' => __($status)], 400);
    }

    public static function resetPassword(array $data) {
        $status = Password::reset(
            $data,
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? ['status' => __($status)]
            : response()->json(['message' => __($status)], 400);
    }

    public static function refresh() {
        return self::respondWithToken(Auth::refresh());
    }

    protected static function respondWithToken($token) {
        return [
            'user' => Auth::user(),
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ];
    }
}