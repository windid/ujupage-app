<?php

namespace App\Http\Controllers\Api\Storage;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;

use App\Models\Storage\StorageFolder;
use App\Models\Storage\StorageImage;
use App\Models\Project\Project;

class FolderController extends Controller {
    public $user;
    
    public $folder;    
    public $project;    
    public $image;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->image = new StorageImage;
        $this->folder = new StorageFolder;        
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
        if (get_class($this->project) == 'Illuminate\Http\JsonResponse') {
            if ($this->folder->user_id != $this->user->id) {
                return $this->errorNotFound();
            }
            $this->project->id = 0;
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
    public function index() {
        $project_id = request('project_id', 0);
        if ($project_id > 0) {
            $project = $this->initP($project_id);
            if (get_class($project) == 'Illuminate\Http\JsonResponse') {
                return $project;
            }
        }
        $this->folder = $this->folder
                ->select('id', 'dirname', 'is_default')
                ->where('project_id', $project_id);
        if ($project_id == 0) {
            $this->folder = $this->folder
                    ->where('user_id', $this->user->id);
        }
        $dirs = $this->folder->get();
        if ($dirs->count() < 1) {
            $request = Request::create(route('api.storage.folder.store'), 'POST', [
                'project_id' => $project_id,
                'dirname' => '默认',
                'setdefault' => '1'
            ]);        
            $this->store($request);
            $this->folder = $this->folder
                    ->select('id', 'dirname', 'is_default')
                    ->where('project_id', $project_id);
            if ($project_id == 0) {
                $this->folder = $this->folder
                        ->where('user_id', $this->user->id);
            }
            $dirs = $this->folder->get();
        }
        $dirs = $dirs->toArray();
        if ($dirs) {
            foreach ($dirs as $k => $v) {
                $image = $this->image;
                $image = $image->where('folder_id', $v['id'])->where('project_id', $project_id);     
                if ($project_id == 0) {
                    $image = $image->where('user_id', $this->user->id);
                }
                $dirs[$k]['total_image'] = $image->count();
            }
        }
        return $this->successOK($dirs);
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
        $project_id = request('project_id', 0);
        if ($project_id > 0) {
            $project = $this->initP($project_id);  
            if (get_class($project) == 'Illuminate\Http\JsonResponse') {
                return $project;
            }
        }
        $dirname = $request->get('dirname', '');
        if (empty($dirname)) {
            $dirname = '新建文件夹' . rand(100,900);
        }
        
        $this->folder = new StorageFolder();
        $this->folder->is_default = 0;
        if ($request->has('setdefault')) {
            $this->folder->is_default = 1;
        } else {
            $validator = validator(['dirname' => $dirname]
                , [
                    'dirname' => 'required|not_in:默认|unique:storage_folders,dirname,null,id,project_id,'.$project_id
                    ]);
            if ($validator->fails()) {
                return $this->errorValidation($validator);
            }
        }
        
        $this->folder->dirname = $dirname;
        $this->folder->project_id = $project_id;
        $this->folder->user_id = $this->user->id;
//        dd($this->folder);
        $this->folder->save();
        
        return $this->successCreated(['id' => $this->folder->id, 'dirname' => $dirname, 'is_default' => $this->folder->is_default]);
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
                
        $dirname = $request->get('dirname', '');
        $validator = validator(['dirname' => $dirname]
                , [
                    'dirname' => 'required|not_in:默认|unique:storage_folders,dirname,null,id,project_id,'.$this->project->id
                    ]);
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }        
                
        $folder->dirname = $dirname;
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
