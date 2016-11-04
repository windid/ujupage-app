<?php

namespace App\Models\Page;

use Illuminate\Database\Eloquent\Model;

class PageVariation extends Model {
        
    use \Illuminate\Database\Eloquent\SoftDeletes;
    
    public $timestamps = true;
    
    protected $dateFormat = 'U';
    
    protected $hidden = ['deleted_at'];


    public function page() {
        return $this->hasOne('App\Models\Page\Page', 'id', 'page_id');
    }
    
    public function userSetting() {
        return $this->hasOne('App\Models\User\UserSetting', 'user_id', 'user_id');
    }
    
    public function getSettingAttribute($value) {
        return json_decode($value, true);
    }
    /*
    public function getHtmlJsonAttribute($value) {
        return json_decode($value, true);
    }
    */
}