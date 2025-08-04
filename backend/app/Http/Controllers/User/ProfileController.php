<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ProfileUpdateRequest;
use App\Http\Requests\User\ProfileImageRequest;
use App\Services\User\ProfileService;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller {
    public function show() {
        return $this->responseJSON(Auth::user());
    }

    public function update(ProfileUpdateRequest $request) {
        $user = ProfileService::updateProfile(Auth::id(), $request->validated());
        return $this->responseJSON($user);
    }

    public function uploadPicture(ProfileImageRequest $request) {
        $result = ProfileService::uploadProfilePicture(Auth::id(), $request->file('image'));
        return $this->responseJSON($result);
    }
}