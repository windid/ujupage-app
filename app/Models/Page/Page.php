<?php

namespace App\Models\Page;

use Illuminate\Database\Eloquent\Model;

class Page extends Model {
    
    public $timestamps = true;
    
    protected $dateFormat = 'U';    
    
    public function variation() {
        return $this->hasMany('App\Models\Page\PageVariation', 'page_id', 'id');
    }
    
    public function getSettingAttribute($value) {
        return json_decode($value, true);
    }
}