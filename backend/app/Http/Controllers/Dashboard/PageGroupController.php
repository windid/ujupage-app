<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Request;

use App\Models\Page\Page;
use App\Models\Page\PageGroup;
use App\Models\Project\Project;

class PageGroupController extends Controller {
    
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
     * @return json {
     *  {
     *   id = 分组ID
     *   project_id = 项目ID
     *   name = 分组名称
     *  }
     * }
     */    
    public function get(int $project_id) {
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->err('not found project');
        }
        
        $pagegroups = $project->pagegroups()->where('is_default', '1')->first();
        if (!$pagegroups) {
            $this->pageGroup->name = "default";
            $this->pageGroup->is_default = 1;
            
            $project->pagegroups()->save($this->pageGroup);
        }
        
        $pagegroups = $project->pagegroups()->get();
        
        return $this->dump(['pagegroups' => $pagegroups->toArray()]);
    }
    
    /**
     * 获取该项目的分组
     * @param int $project_id
     * @return json {
     *  {
     *   id = 分组ID
     *   project_id = 项目ID
     *   name = 分组名称
     *  }
     * }
     */    
    public function show(int $project_id) {
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->err('not found project');
        }
        
        $pagegroups = $project->pagegroups()->where('is_default', '1')->first();
        if (!$pagegroups) {
            $this->pageGroup->name = "default";
            $this->pageGroup->is_default = 1;
            
            $project->pagegroups()->save($this->pageGroup);
        }
        
        $pagegroups = $project->pagegroups()->get();
        
        return $this->dump(['pagegroups' => $pagegroups->toArray()]);
    }
    
    /**
     * 增加分组
     * @param int $project_id 项目ID
     * @param string $name 分组名称
     * @return json {
     *  id = 分组ID
     *  project_id = 项目ID
     *  name = 项目名称
     * }
     */
    public function add(Request $request) {
        
        $project_id = $request->get('project_id', 0);
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->err('not found project');
        }
                
        $this->pageGroup->name = $request->get('name', '');
        if ($this->pageGroup->name == '') {
            return $this->err('empty group name');
        }
        
        $project->pagegroups()->save($this->pageGroup);
        return $this->dump(['group' => $this->pageGroup->toArray()]);
    }
    
    /**
     * 增加分组
     * @param int $project_id 项目ID
     * @param string $name 分组名称
     * @return json {
     *  id = 分组ID
     *  project_id = 项目ID
     *  name = 项目名称
     * }
     */
    public function store(Request $request) {
        
        $project_id = $request->get('project_id', 0);
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->err('not found project');
        }
                
        $this->pageGroup->name = $request->get('name', '');
        if ($this->pageGroup->name == '') {
            return $this->err('empty group name');
        }
        
        $project->pagegroups()->save($this->pageGroup);
        return $this->dump(['group' => $this->pageGroup->toArray()]);
    }
    
    /**
     * 修改分组名称
     * @param int $id 分组ID
     * @param string $name 分组名称
     * @return json {
     *  id = 分组ID
     *  project_id = 项目ID
     *  name = 项目名称
     */
    public function mod(Request $request) {
        
        $group_id = $request->get('id', 0);         
        $pagegroup = $this->pageGroup->find($group_id);
        if (!$pagegroup) {
            return $this->err('not found page group');
        }
        $project = $this->user->projects()->find($pagegroup->project_id);
        if (!$project) {
            return $this->err('not found project');
        }
        $pagegroup = $project->pagegroups()->find($pagegroup->id);
        if (!$pagegroup) {
            return $this->err('not found page group');
        }
                
        $pagegroup->name = $request->get('name', '');
        if ($pagegroup->name == '') {
            return $this->err('empty group name');
        }
        
        $pagegroup->save();
        return $this->dump(['group' => $pagegroup->toArray()]);
    }
    
    /**
     * 修改分组名称
     * @param int $id 分组ID
     * @param string $name 分组名称
     * @return json {
     *  id = 分组ID
     *  project_id = 项目ID
     *  name = 项目名称
     */
    public function update(Request $request, $group_id) {        
        $pagegroup = $this->pageGroup->find($group_id);
        if (!$pagegroup) {
            return $this->err('not found page group');
        }
        $project = $this->user->projects()->find($pagegroup->project_id);
        if (!$project) {
            return $this->err('not found project');
        }
        $pagegroup = $project->pagegroups()->find($pagegroup->id);
        if (!$pagegroup) {
            return $this->err('not found page group');
        }
                
        $pagegroup->name = $request->get('name', '');
        if ($pagegroup->name == '') {
            return $this->err('empty group name');
        }
        
        $pagegroup->save();
        return $this->dump(['group' => $pagegroup->toArray()]);
    }
    
    /**
     * 删除分组名称
     * @param int $id 分组ID
     * @return json {
     *   result = true
     *  }
     */
    public function destroy(Request $request, int $group_id) {
              
        $pagegroup = $this->pageGroup->find($group_id);
        if (!$pagegroup) {
            return $this->err('not found page group');
        }        
        $project = $this->user->projects()->find($pagegroup->project_id);
        if (!$project) {
            return $this->err('not found project');
        }
        $pagegroup = $project->pagegroups()->find($pagegroup->id);
        if (!$pagegroup) {
            return $this->err('not found page group');
        }                
        $page_variations = $pagegroup->pageVariations()->get();
        foreach ($page_variations as $v) {
            $v->delete();
        }
        $pagegroup->pages()->delete();
        $pagegroup->delete();
        
        return $this->dump();
    }
}