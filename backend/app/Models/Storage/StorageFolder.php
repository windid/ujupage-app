<?php

namespace App\Models\Storage;

use Illuminate\Database\Eloquent\Model;

class StorageFolder extends Model {
    
    public $timestamps = true;
            
    protected $dateFormat = 'U';
    
    protected $fillable = ['dirname', 'user_id'];
}