<?php

namespace App\Services\Admin;

use App\Models\User;
use Illuminate\Support\Facades\Storage;

class ProfileService {
    public static function updateProfile(int $userId, array $data): User {
        $user = User::findOrFail($userId);
        $user->update($data);
        return $user;
    }

    public static function updateProfilePicture(int $userId, string $base64Image): string {
        $user = User::findOrFail($userId);

        if ($user->profile_picture_url) {
            Storage::disk('public')->delete($user->profile_picture_url);
        }

        if (!preg_match('/^data:image\/(\w+);base64,/', $base64Image, $type)) {
            throw new \Exception('Invalid image format.');
        }

        $extension = strtolower($type[1]);
        $base64Data = substr($base64Image, strpos($base64Image, ',') + 1);
        $decodedImage = base64_decode($base64Data);

        if ($decodedImage === false) {
            throw new \Exception('Invalid base64 image data.');
        }

        $filename = 'profile_pictures/' . uniqid('admin_') . '.' . $extension;

        Storage::disk('public')->put($filename, $decodedImage);

        $user->profile_picture_url = $filename;
        $user->save();

        return Storage::url($filename);
    }

    public static function removeProfilePicture(int $userId): void {
        $user = User::findOrFail($userId);

        if ($user->profile_picture_url) {
            Storage::disk('public')->delete($user->profile_picture_url);
            $user->profile_picture_url = null;
            $user->save();
        }
    }
}