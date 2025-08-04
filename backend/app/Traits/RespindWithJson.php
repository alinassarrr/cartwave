<?php

namespace App\Traits;

trait RespondsWithJson {
    public function responseJSON($data = null, $status = 'success', $code = 200) {
        return response()->json([
            'status' => $status,
            'data' => $data,
        ], $code);
    }
}