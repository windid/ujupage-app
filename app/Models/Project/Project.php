<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model {
    
    use SoftDeletes;
    
    public $timestamps = true;
    
    protected $dateFormat = 'U';    
    
    protected $hidden = [
        'user_id'
    ];
    
    
    public function pagegroups() {
        return $this->hasMany('App\Models\Page\PageGroup');
    }
    
}