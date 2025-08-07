<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\AddressRequest;
use App\Services\User\AddressService;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller {
    public function index() {
        $addresses = AddressService::getUserAddresses(Auth::id());
        return $this->responseJSON($addresses);
    }

    public function store(AddressRequest $request) {
        $address = AddressService::createAddress(Auth::id(), $request->validated());
        return $this->responseJSON($address);
    }

    public function update(AddressRequest $request, $id) {
        $updated = AddressService::updateAddress(Auth::id(), $id, $request->validated());
        if (! $updated) {
            return $this->responseJSON(null, 'error', 404);
        }
        return $this->responseJSON($updated);
    }

    public function destroy($id) {
        $deleted = AddressService::deleteAddress(Auth::id(), $id);
        if (! $deleted) {
            return $this->responseJSON(null, 'error', 404);
        }
        return $this->responseJSON(['message' => 'Address deleted']);
    }

    public function setDefault($id) {
        $result = AddressService::setDefaultAddress(Auth::id(), $id);
        if (! $result) {
            return $this->responseJSON(null, 'error', 404);
        }
        return $this->responseJSON($result);
    }
}