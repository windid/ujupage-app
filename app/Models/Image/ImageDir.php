<?php

namespace App\Models\Image;

use Illuminate\Database\Eloquent\Model;

class ImageDir extends Model {
    
    public $timestamps = true;
            
    protected $dateFormat = 'U';
    
    protected $fillable = ['dirname', 'user_id'];
}