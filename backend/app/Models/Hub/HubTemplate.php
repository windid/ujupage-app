<?php 
namespace App\Models\Hub;

use Illuminate\Database\Eloquent\Model;

class HubTemplate extends Model {
        
    public $timestamps = true; // 控制自动时间戳; 默认为false
    
    public function tags() {
        return $this->belongsToMany('\App\Model\Hub\HubTemplateTag', 'hub_template_tag_relateds', 'template_id', 'tag_id');
    }
}