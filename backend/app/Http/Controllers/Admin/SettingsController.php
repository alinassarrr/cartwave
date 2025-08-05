<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\UpdateProfileRequest;
use App\Http\Requests\Common\ProfileImageRequest;
use App\Services\Common\ProfileService;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller {
    public function updateProfile(UpdateProfileRequest $request) {
        $updated = ProfileService::updateProfile(Auth::id(), $request->validated());
        return $this->responseJSON($updated, 'Profile updated successfully');
    }

    public function uploadProfilePicture(ProfileImageRequest $request) {
        $result = ProfileService::updateProfilePicture(Auth::id(), $request->validated()['profile_picture']);
        return $this->responseJSON($result, 'Profile picture updated');
    }

    public function removeProfilePicture() {
        ProfileService::removeProfilePicture(Auth::id());
        return $this->responseJSON(null, 'Profile picture removed');
    }
}