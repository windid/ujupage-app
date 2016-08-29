<?php

namespace App\Models\Storage;

use Illuminate\Database\Eloquent\Model;

class StorageImage extends Model {
    
    public $timestamps = true;
            
    protected $dateFormat = 'U';
    
    protected $hidden = ['dir_id','user_id','created_at', 'updated_at'];
}