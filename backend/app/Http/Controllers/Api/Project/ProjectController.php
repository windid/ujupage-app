<?php

namespace App\Http\Controllers\Api\Project;

use App\Http\Controllers\Api\Controller;
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
     * @return json
     */
    public function index() {
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
        
        return $this->successOK($projects);
    }
    
    /**
     * 新建项目
     * @param \Illuminate\Http\Request $request
     * @return json 
     */    
    public function store(Request $request) { 
        $this->project->name = $request->get('name', '');
        $this->project->user_id = $this->user->id;        
        if ($this->project->name == '') {
            return $this->err('empty project name');
        }
        $this->user->projects()->save($this->project, ['role' => 'admin']);
        
        return $this->successCreated(['id' => $this->project->id
                , 'name' => $this->project->name]);
    }
    
    
    /**
     * 修改项目
     * @param \Illuminate\Http\Request $request
     * @param int $project_id
     * @return json
     */
    public function update(Request $request, $project_id) {
        $project = $this->user->projects()->find($project_id);
        if (!$project) {
            return $this->errorNotFound();
        }
        
        $project->name = $request->get('name', '');
        $validator = validator($project->toArray(), ['name' => 'required']);
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }
        
        $project->save();
        
        return $this->successCreated();
    }
           
    /**
     * 删除项目
     * @param \Illuminate\Http\Request $request
     * @param int $project_id
     * @return json 
     */
    public function destroy(Request $request, $project_id) {
        $project = $this->user->projects()->find($project_id);        
        if (!$project) {
            return $this->errorNotFound();
        }
        
        $project->delete();
        
        return $this->successNoConnect();
    }
}