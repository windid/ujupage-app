<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Request;

use App\Models\Page\Page;
use App\Models\Project\Project;

class ProjectController extends Controller {

    public $user;
    public $page;
    public $project;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->page = new Page;
        $this->project = new Project;
    }
    
    /**
     * 获取该用户下的所有项目
     * @return json {
     *  project = {
     *   id = 项目ID,
     *   name = 项目名称,
     *   is_default = 是否默认项目,
     *   created_at = 创建时间,
     *   updated_at = 更新时间
     *  }    
     *  result = true
     * }
     */
    public function get() {
        $default_project = $this->project->where('is_default', 1)
                ->where('user_id', $this->user->id)
                ->first();
        if (!$default_project) {
            $this->project->user_id = $this->user->id;
            $this->project->name = $this->user->name . "的项目";
            $this->project->is_default = 1;
            
            $this->user->projects()->save($this->project, ['role' => 'admin']);
        }
        
        $projects = $this->user->projects()->get()->toArray();
        foreach ($projects as $k => $v) {
            array_forget($projects[$k], 'pivot');
        }
        
        return $this->dump(['projects' => $projects]);
    }
    
    /**
     * 新建项目
     * @param string 项目名称
     * @return json {
     *  id = 项目ID
     *  name = 项目名称
     * }
     */    
    public function add(Request $request) { 
        
        $this->project->name = $request->get('name', '');
        $this->project->user_id = $this->user->id;
        if ($this->project->name == '') {
            return $this->err('empty project name');
        }
        $this->user->projects()->save($this->project, ['role' => 'admin']);
        
        return $this->dump(['project' => ['id' => $this->project->id
                , 'name' => $this->project->name]]);
    }
    
    /**
     * 修改项目
     * @param int $id 项目ID
     * @param string $name
     * @return json {
     *  result = true
     * }
     */
    public function mod(Request $request) {
        $project_id = $request->get('id', 0);
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->err('not found project');
        }
        
        $project->name = $request->get('name', '');
        if ($project->name == '') {
            return $this->err('empty project name');
        }
        
        $project->save();
        
        return $this->dump();
    }
    
    /**
     * 删除项目
     * @param int $id
     * @return json {
     *  result = true
     * }
     */
    public function remove(int $id) {
        $project = $this->user->projects()->find($id);        
        if (!$project) {
            return $this->err('not found project');
        }
        
        $project->delete();
        
        return $this->dump();
    }
}