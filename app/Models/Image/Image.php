<?php

namespace App\Models\Image;

use Illuminate\Database\Eloquent\Model;

class Image extends Model {
    
    public $timestamps = true;
            
    protected $dateFormat = 'U';
    
    protected $hidden = ['dir_id','user_id','created_at', 'updated_at'];
}