<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Storage;

class ProfileService {
    public static function updateProfile($userId, array $data) {
        $user = User::findOrFail($userId);
        $user->update($data);
        return $user;
    }

    public static function uploadProfilePicture($userId, $image) {
        $user = User::findOrFail($userId);

        $path = $image->store('profile_pictures', 'public');
        $user->profile_picture_url = Storage::url($path);
        $user->save();

        return ['profile_picture_url' => $user->profile_picture_url];
    }
}