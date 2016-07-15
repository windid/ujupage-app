<?php

namespace App\Models\Page;

use Illuminate\Database\Eloquent\Model;

class Page extends Model {
    
    public $timestamps = true;
    
    protected $dateFormat = 'U';    
    
    public function getSettingAttribute($value) {
        return json_decode($value, true);
    }
}