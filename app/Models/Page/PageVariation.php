<?php

namespace App\Models\Page;

use Illuminate\Database\Eloquent\Model;

class PageVariation extends Model {
    
    public $timestamps = true;
    
    protected $dateFormat = 'U';
    
    public function page() {
        return $this->hasOne('App\Models\Page\Page', 'id', 'page_id');
    }
    
    public function userSetting() {
        return $this->hasOne('App\Models\User\UserSetting', 'user_id', 'user_id');
    }
    
    public function getSettingAttribute($value) {
        return json_decode($value, true);
    }
    public function getHtmlJsonAttribute($value) {
        return json_decode($value, true);
    }
}