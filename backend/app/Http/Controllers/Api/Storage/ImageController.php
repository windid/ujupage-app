<?php

namespace App\Http\Controllers\Api\Storage;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use App\Models\Storage\StorageImage;
use App\Models\Storage\StorageFolder;
use App\Models\Project\Project;

use App\Services\OSS;

class ImageController extends Controller {
       
    public $user;
    public $folder;
    public $image;
    
    public $project;    
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->image = new StorageImage();
        $this->folder = new StorageFolder();
        
        $this->project = new Project;
    }
    
    protected function initPF($folder_id) {
        $this->folder = $this->folder->find($folder_id);
        if (!$this->folder) {
            return $this->errorNotFound();
        }
        
        $this->project = $this->user->projects()->find($this->folder->project_id);
        if (!$this->project) {
            return $this->errorNotFound();
        }
        
        return $this->folder;
    }
    
    protected function initPFI($image_id) {
        $this->image = $this->image->find($image_id);
        if (!$this->image) {
            return $this->errorNotFound();
        }
        
        $this->folder = $this->initPF($this->image->folder_id);
        if (!$this->folder) {
            return $this->folder;
        }
        
        return $this->image;
    }
    
    /**
     * 图片列表
     * @param int $project_id 项目ID
     * @param string $dirname 文件夹名称
     * @param int $page 当前页数
     * @param int $page_size 每页显示N条
     * @return string json {
     *  current_page : 1,
     *  total_pages : 18,
     *  total_images : 600,
     *  page_size : 30 ，
     *  images : {
     *    {        
     *     id: 1234                 image id
     *     name:"test",             image 名称
     *     alt:"",                  image alt
     *     image:  "http://xxx.jpg",  image url
     *     width:"913",             image width
     *     height:"571"             image height
     *   }
     *  }
     * }
     */
    // ALTER TABLE `uju_storage_images` CHANGE `dir_id` `folder_id` INT(10) UNSIGNED NOT NULL;
    public function index()  {
        $folder = $this->initPF(request('folder_id', 0));  
        if (get_class($folder) == 'Illuminate\Http\JsonResponse') {
            return $folder;
        }
        $page = request('page', 1);
        $page_size = request('page_size', 30);
        $images = $this->image->where('folder_id', $folder->id)
                ->where('project_id', $this->project->id)
                ->skip(($page - 1) * $page_size)->take($page_size)->get();
        
        $total = $this->image->where('folder_id', $folder->id)
                ->where('project_id', $this->project->id)->count();
        $result = [
            'current_page' => $page,
            'total_pages' => ceil($total / $page_size),
            'total_images' => $total,
            'page_size' => $page_size,
            'images' => $images->toArray()
        ];
        
        return $this->successOK($result);        
    }
        
    /**
     * 上传图片
     * @param int $project_id 项目ID
     * @param file $file 图片(2选1)
     * @param string $url 图片地址(2选1)
     * @param string $folder 文件夹名称
     * @return string json {
     *  image : {
     *    id : 1234,
     *    name : test,
     *    folder : test,
     *    alt : test alt,
     *    url : http://xxx.jpg,
     *    width : 913,
     *    height : 571
     *  }
     *  , 'result' : 'true'
     * }
     */    
    public function store(Request $request) {
        $folder = $this->initPF($request->get('folder_id', 0));  
        if (get_class($folder) == 'Illuminate\Http\JsonResponse') {
            return $folder;
        }
        
        $image_validator = validator($request->allFiles(), ['file' => 'required|image']);
        $url_validator = validator($request->all(), ['url' => 'required|url']);
        if ($image_validator->fails() && $url_validator->fails()) {
            return $this->errorValidation($image_validator);
        }
        
        $this->image->folder_id = $folder->id;
        
        if ($request->hasFile('file')) {
            $file = $request->file('file');
        } else {
            $url = $request->get('url');           
            
            try {
                // 获取文件信息
                $pathinfo = pathinfo(parse_url($url)['path']);
                $filename = $pathinfo['basename']; // 文件名                
                $filepath = storage_path('app')  // 文件路径
                        . '/' 
                        . uniqid();               // 文件名
                // 保存本地
                $image = \Intervention\Image\ImageManagerStatic::make($url)->save($filepath);
                
                // 生成UploadedFile类                
                $file = new UploadedFile($filepath, $filename, $image->mime(), null, null, true);
                $image->destroy();
                
            } catch (\Intervention\Image\Exception\NotReadableException $e) {
                return $e;
            }
            
        }
        
        $this->image->project_id = $this->project->id;
        $this->image->name = $file->getClientOriginalName();

        $this->image->alt = "";
                
        $size = getimagesize($file->getRealPath());
        $this->image->width = $size[0];
        $this->image->height = $size[1];
        
        // 定义文件名
        $filepathOSS = str_replace('php','',$file->getBasename())
                .'.'
                .$file->getClientOriginalExtension();
        // 定义文件夹
        $filepathOSS = date('Ymd')
                .'/'
                .$filepathOSS;
        
        OSS::upload($filepathOSS, $file->getRealPath());   
        $this->image->url = OSS::getUrlCdn($filepathOSS);
        $this->image->save();
        
        // 删除临时文件
        
        Storage::delete($file->getBasename());
        
        return $this->successCreated($this->image->toArray());
    }
    
    /**
     * 修改图片信息
     * @param int $project_id 项目ID
     * @param int    $id  图片ID
     * @param string $name 图片名称
     * @param string $alt  标注
     * @param string $folder_id 文件夹ID
     * @return string json {
     *  image : {
     *    id : 1234,
     *    name : test,
     *    folder : test,
     *    alt : test alt,
     *    url : http://xxx.jpg,
     *    width : 913,
     *    height : 571
     *  }
     *  , 'result' : 'true'
     * }
     * 
     */
    public function update(Request $request, $image_id)  {        
        $image = $this->initPFI($image_id);  
        if (get_class($image) == 'Illuminate\Http\JsonResponse') {
            return $image;
        }
        
        if ($request->has('folder_id')) {
            $folder_id = $request->get('folder_id', 0);
            $validator = validator(['folder_id' => $folder_id]
                    , ['folder_id' => 'exists:storage_folders,id,project_id,'.$this->folder->project_id]);
            if ($validator->fails()) {
                return $this->errorValidation($validator);
            }
            $image->folder_id = $folder_id;
        }
                
        if ($request->has('name')) {
            $image->name = $request->name;
        }
        if ($request->has('alt')) {
            $image->alt = $request->alt;
        }
        $image->save();
        
        return $this->successCreated($image->toArray());
    }
    
    /**
     * 隐藏图片
     * @param int $project_id 项目ID
     * @param int    $id  图片ID
     * @return string json {
     *   'result' : 'true'
     * }
     * 
     */
    public function destroy(Request $request, $image_id)  {          
        $image = $this->initPFI($image_id);  
        if (get_class($image) == 'Illuminate\Http\JsonResponse') {
            return $image;
        }
        $image->delete();
        
        return $this->successNoConnect();
    }
}
