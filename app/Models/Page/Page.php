<?php

namespace App\Models\Page;

use Illuminate\Database\Eloquent\Model;

class Page extends Model {
    
    use \Illuminate\Database\Eloquent\SoftDeletes;
    
    public $timestamps = true;
    
    protected $dateFormat = 'U';    
    
    protected $hidden = ['deleted_at'];


    public function variation() {
        return $this->hasMany('App\Models\Page\PageVariation');
    }
    
    public function getSettingAttribute($value) {
        return json_decode($value, true);
    }
}