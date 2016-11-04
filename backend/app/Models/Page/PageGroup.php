<?php

namespace App\Models\Page;

use Illuminate\Database\Eloquent\Model;

class PageGroup extends Model {
    
    use \Illuminate\Database\Eloquent\SoftDeletes;
    
    public $timestamps = false;
    
    protected $dateFormat = 'U';
    
    protected $hidden = ['deleted_at'];


    public function pages() {
        return $this->hasMany('App\Models\Page\Page', 'group_id');
    }
    
    public function pageVariations() {
        return $this->hasManyThrough('App\Models\Page\PageVariation', 'App\Models\Page\Page', 'group_id');
    }
}