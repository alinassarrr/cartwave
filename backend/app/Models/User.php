<?php

namespace App\Models;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject {
    use HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'profile_picture_url',
        'phone_number',
        'date_of_birth',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

    public function sendPasswordResetNotification($token) {
        $this->notify(new ResetPassword($token));
    }

    public function admin() {
        return $this->hasOne(Admin::class);
    }

    public function isAdmin(): bool {
        return $this->admin()->exists();
    }
}
