<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class UserActive extends Model {
    
    public $timestamps = false;
        
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['email', 'token', 'created_at'];
    
    public static function createNewToken() {
        return hash_hmac('sha256', Str::random(40), config('app')['key']);
    }
}