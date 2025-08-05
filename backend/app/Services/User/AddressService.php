<?php

namespace App\Services\User;

use App\Models\Address;

class AddressService {
    public static function getUserAddresses($userId) {
        return Address::where('user_id', $userId)
                      ->orderByDesc('is_default')
                      ->get();
    }

    public static function createAddress($userId, array $data) {
        $data['user_id'] = $userId;
        return Address::create($data);
    }

    public static function updateAddress($userId, $addressId, array $data) {
        $address = Address::where('id', $addressId)->where('user_id', $userId)->first();
        if (! $address) return false;
        
        $address->update($data);
        return $address;
    }

    public static function deleteAddress($userId, $addressId) {
        $address = Address::where('id', $addressId)->where('user_id', $userId)->first();
        if (! $address) return false;

        return $address->delete();
    }

    public static function setDefaultAddress($userId, $addressId) {
        $address = Address::where('id', $addressId)
                          ->where('user_id', $userId)
                          ->first();

        if (! $address) {
            return false;
        }

        Address::where('user_id', $userId)->update(['is_default' => false]);
        $address->is_default = true;
        $address->save();

        return $address;
    }
}