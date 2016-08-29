<?php

namespace App\Http\Controllers\Api\Storage;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;

use App\Models\Storage\StorageFolder;
use App\Models\Project\Project;

class FolderController extends Controller {
    public $user;
    
    public $folder;    
    public $project;    
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->folder = new StorageFolder();        
        $this->project = new Project;
    }
    
    protected function initP($project_id) {
        $this->project = $this->user->projects()->find($project_id);
        if (!$this->project) {
            return $this->errorNotFound();
        }
        
        return $this->project;
    }
    
    protected function initPF($folder_id) {
        $this->folder = $this->folder->find($folder_id);
        if (!$this->folder) {
            return $this->errorNotFound();
        }
        $this->project = $this->initP($this->folder->project_id);
        if (!$this->project) {
            return $this->errorNotFound();
        }
        
        return $this->folder;
    }
    
    /**
     * 文件夹列表
     * @param int $project_id 项目ID
     * @return string json {
     *  dir : {dir1, dir2, dir3}
     * }
     */
    public function index()  {
        $project = $this->initP(request('project_id', 0));  
        if (get_class($project) == 'Illuminate\Http\JsonResponse') {
            return $project;
        }
        $dirs = $this->folder
                ->select('id', 'dirname')
                ->where('project_id', $this->project->id)->get();
        if ($dirs->count() < 1) {
            $request = Request::create(route('api.storage.folder.store'), 'POST', [
                'project_id' => $this->project->id,
                'dirname' => '默认',
                'setdefault' => '1'
            ]);        
            $this->store($request);
            $dirs = $this->folder
                    ->select('id', 'dirname')
                    ->where('project_id', $this->project->id)->get();
        }
        
        return $this->successOK($dirs->toArray());
    }
    
    /**
     * 增加文件夹
     * @param int $project_id 项目ID
     * @param  string $dirname 文件夹名称
     * @return string json {
     *  dirname : dir1,
     *  result  : true
     * }
     */    
    public function store(Request $request)  {
        $project = $this->initP(request('project_id', 0));  
        if (get_class($project) == 'Illuminate\Http\JsonResponse') {
            return $project;
        }
        $dirname = $request->get('dirname', '');
        if (empty($dirname)) {
            $dirname = '新建文件夹' . rand(100,900);
        }
        
        if ($request->has('setdefault')) {
            $this->folder->is_default = 1;
        } else {
            $validator = validator(['dirname' => $dirname]
                , [
                    'dirname' => 'required|not_in:默认|unique:storage_folders,dirname,null,id,project_id,'.$this->project->id
                    ]);
            if ($validator->fails()) {
                return $this->errorValidation($validator);
            }
        }
        
        $this->folder->dirname = $dirname;
        $this->folder->project_id = $project->id;
        $this->folder->user_id = $this->user->id;
        
        $this->folder->save();
        
        return $this->successCreated(['id' => $this->folder->id, 'dirname' => $dirname]);
    }
    
    
    /**
     * 修改文件夹
     * @param  string $folder_id 文件夹名称
     * @param int $project_id 项目ID
     * @return string json {
     *  dirname : dir1,
     *  result  : true
     * }
     */   
    public function update(Request $request, $folder_id)  {  
        $folder = $this->initPF($folder_id);  
        if (get_class($folder) == 'Illuminate\Http\JsonResponse') {
            return $folder;
        }
                
        $mod_dirname = $request->get('mod_dirname', '');
        $validator = validator(['mod_dirname' => $mod_dirname]
                , [
                    'mod_dirname' => 'required|not_in:默认|unique:storage_folders,dirname,null,id,project_id,'.$this->project->id
                    ]);
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }        
                
        $folder->dirname = $mod_dirname;
        $folder->save();
                
        return $this->successCreated();
    }
        
    /**
     * 删除文件夹
     * @param int $project_id 项目ID
     * @param  string $dirname 文件夹名称
     * @return string json {
     *  dirname : dir1,
     *  result  : true
     * }
     */   
    public function destroy(Request $request, $folder_id)  { 
        $folder = $this->initPF($folder_id);  
        if (get_class($folder) == 'Illuminate\Http\JsonResponse') {
            return $folder;
        }
        
        $folder->delete();
        
        return $this->successNoConnect();        
    }
}
