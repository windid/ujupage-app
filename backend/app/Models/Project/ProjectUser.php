<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;

class ProjectUser extends Model {
    
    public $timestamps = false;
    
    public $roles = [
        'admin', 'member'
    ];
    
}