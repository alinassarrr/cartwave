<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\UpdateProfileRequest;
use App\Http\Requests\Common\ProfileImageRequest;
use App\Services\Common\ProfileService;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller {
    public function show() {
        return $this->responseJSON(Auth::user());
    }

    public function update(UpdateProfileRequest $request) {
        $user = ProfileService::updateProfile(Auth::id(), $request->validated());
        return $this->responseJSON($user);
    }

    public function uploadProfilePicture(ProfileImageRequest $request) {
        $result = ProfileService::updateProfilePicture(Auth::id(), $request->validated()['profile_picture']);
        return $this->responseJSON($result, 'Profile picture updated');
    }

}