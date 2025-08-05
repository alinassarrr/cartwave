<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateProfileRequest;
use App\Http\Requests\Admin\UploadImageRequest;
use App\Services\Admin\ProfileService;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller {
    public function updateProfile(UpdateProfileRequest $request) {
        $updated = ProfileService::updateProfile(Auth::id(), $request->validated());
        return $this->responseJSON($updated, 'Profile updated successfully');
    }

    public function uploadProfilePicture(UploadImageRequest $request) {
        $url = ProfileService::updateProfilePicture(Auth::id(), $request->file('profile_picture'));
        return $this->responseJSON(['profile_picture_url' => $url], 'Profile picture updated');
    }

    public function removeProfilePicture() {
        ProfileService::removeProfilePicture(Auth::id());
        return $this->responseJSON(null, 'Profile picture removed');
    }
}