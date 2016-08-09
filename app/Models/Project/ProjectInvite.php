<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;

class ProjectInvite extends Model {
        
    public $timestamps = true;
    
    protected $dateFormat = 'U';    
    
    protected $hidden = ['i', 'id', 'updated_at', 'project_id'];


    public function project() {
        return $this->hasOne('App\Models\Project\Project');
    }
    
}