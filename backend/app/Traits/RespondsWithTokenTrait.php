<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait RespondsWithToken {
    public function respondWithToken($token) {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }
}