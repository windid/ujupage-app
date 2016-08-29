<?php

namespace App\Http\Controllers\Api\Project;

use App\Http\Controllers\Api\Controller;
use Symfony\Component\HttpFoundation\Request;

use App\Models\Page\Page;
use App\Models\Page\PageGroup;
use App\Models\Project\Project;

class GroupController extends Controller {
    
    public $user;
    public $page;
    public $pageGroup;
    public $project;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->page = new Page;
        $this->pageGroup = new PageGroup;
        $this->project = new Project;
    }
        
    /**
     * 获取该项目的分组
     * @param int $project_id
     * @return json 
     */    
    public function index(int $project_id) {
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->errorNotFound();
        }
        
        $pagegroups = $project->pagegroups()->where('is_default', '1')->first();
        if (!$pagegroups) {
            $this->pageGroup->name = "default";
            $this->pageGroup->is_default = 1;
            
            $project->pagegroups()->save($this->pageGroup);
        }
        
        $pagegroups = $project->pagegroups()->get();
        
        return $this->successOK($pagegroups->toArray());
    }
    
    /**
     * 增加分组
     * @param \Illuminate\Http\Request $request
     * @param int $project_id 项目ID
     * @return json
     */
    public function store(Request $request, $project_id) {
        
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->errorNotFound();
        }
                
        $validator = validator(request()->all(), ['name' => 'required']);        
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }
        
        $this->pageGroup->name = $request->get('name');
        $project->pagegroups()->save($this->pageGroup);
        return $this->successCreated($this->pageGroup->toArray());
    }
    
    
    /**
     * 修改分组名称
     * @param \Illuminate\Http\Request $request
     * @param int $project_id 项目ID
     * @param int $group_id 分组ID
     * @return json
     */
    public function update(Request $request, $project_id, $group_id) {        
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->errorNotFound();
        }
        $pagegroup = $project->pagegroups()->find($group_id);
        if (!$pagegroup) {
            return $this->errorNotFound();
        }
                
        $validator = validator(request()->all(), ['name' => 'required']);        
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }
        $pagegroup->name = $request->get('name');        
        $pagegroup->save();
        return $this->successCreated($pagegroup->toArray());
    }
    
    /**
     * 删除分组
     * @param \Illuminate\Http\Request $request
     * @param int $project_id 项目ID
     * @param int $group_id 分组ID
     * @return json {
     *   result = true
     *  }
     */
    public function destroy(Request $request, int $project_id, int $group_id) {
              
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->errorNotFound();
        }
        $pagegroup = $project->pagegroups()->find($group_id);
        if (!$pagegroup) {
            return $this->errorNotFound();
        }                
        
        $page_variations = $pagegroup->pageVariations()->get();
        foreach ($page_variations as $v) {
            $v->delete();
        }
        $pagegroup->pages()->delete();
        $pagegroup->delete();
        
        return $this->successNoConnect();
    }
}