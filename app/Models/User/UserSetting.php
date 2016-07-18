<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model {
    
    public $timestamps = false;
        
    public function getSettingAttribute($value) {
        return json_decode($value, true);
    }
}