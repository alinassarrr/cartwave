<?php

namespace App\Traits;

trait RespondsWithJson {
    public function responseJSON($data = null, $status = 'success', $code = 200) {
        if ($data instanceof \Illuminate\Http\JsonResponse) {
            return $data;
        }

        if ($data instanceof \Illuminate\Pagination\LengthAwarePaginator) {
            return response()->json([
                'status' => $status,
                'data' => $data->items(),
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
                'from' => $data->firstItem(),
                'to' => $data->lastItem(),
            ], $code);
        }

        return response()->json([
            'status' => $status,
            'data' => $data,
        ], $code);
    }
}