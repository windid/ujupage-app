<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;

class ProjectInvite extends Model {
        
    public $timestamps = true;
    
    protected $dateFormat = 'U';    
        
    public function project() {
        return $this->hasOne('App\Models\Project\Project');
    }
    
}