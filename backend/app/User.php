<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $dateFormat = 'U';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'token', 'actived_at', 'created_at', 'updated_at'
    ];
    
    public function projects($with_role = false) {
        $_this = $this->belongsToMany('App\Models\Project\Project'
                                    , 'project_users');
        
        if ($with_role) {            
            return $_this->withPivot('role');
        }
        return $_this;
    }    
}
