<?php

namespace App\Http\Json;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Illuminate\Support\Facades\Storage;

use App\User;
use App\Models\Image\Image;
use App\Models\Image\ImageDir;

use App\Services\OSS;

class EditorJson extends Jsons{
    
    public $user;
    public $request;
    public $image;
    public $imageDir;
    
    public function __construct(User $user, Request $request) {
        $this->user = $user;
        $this->request = $request;
        $this->image = new Image;
        $this->imageDir = new ImageDir;
    }
    
    /**
     * editor_images
     * 图片列表
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
    public function images(string $dirname = "default" 
                                    , int $page = 1 
                                    , int $page_size = 30) {
        if ($dirname != 'default') {
            $dir = $this->imageDir->where('dirname', $dirname)
                ->where('user_id', $this->user->id)
                ->first();
            if ($dir) {
                $dir_id = $dir->id;
            } else {
                $dir_id = 0;
            }
        } else {
            $dir_id = 0;
        }
        
        $images = $this->image->where('dir_id', $dir_id)
                ->where('user_id', $this->user->id)
                ->skip(($page - 1) * $page_size)->take($page_size)->get();
        
        $total = $this->image->where('dir_id', $dir_id)
                ->where('user_id', $this->user->id)->count();
        $result = [
            'current_page' => $page,
            'total_pages' => ceil($total / $page_size),
            'total_images' => $total,
            'page_size' => $page_size,
            'images' => $images->toArray()
        ];
        return $this->dump($result);  
    }
    
    /**
     * editor_dir
     * 文件夹列表
     * @return string json {
     *  dir : {dir1, dir2, dir3}
     * }
     */
    public function dir()  {
        $dirs = $this->imageDir
                ->where('user_id', $this->user->id)
                ->lists('dirname');
        
        return $this->dump(['dir' => array_merge(['default'], $dirs->toArray())]);
    }
    
    /**
     * editor_mkdir
     * 增加文件夹
     * @param  string $dirname 文件夹名称
     * @return string json {
     *  dirname : dir1,
     *  result  : true
     * }
     */    
    public function mkdir(string $dirname)  {
        if ($dirname != 'default') {
            $dir = $this->imageDir->firstOrCreate(['dirname' => $dirname
                    , 'user_id' => $this->user->id]);
            $dirname = $dir->dirname;
        } else {
            $dirname = 'default';
        }
        
        return $this->dump(['dirname' => $dirname]);
    }
    
    /**
     * editor_moddir
     * 修改文件夹
     * @param  string $dirname 文件夹名称
     * @return string json {
     *  dirname : dir1,
     *  result  : true
     * }
     */   
    public function moddir(string $dirname, string $mod_dirname)  {
        if ($dirname == 'default' || $mod_dirname == 'default') {
            return $this->err('默认目录不能修改或目标目录不能修改为default');
        }
        
        $mod_dir = $this->imageDir->where('dirname', $mod_dirname)
                ->where('user_id', $this->user->id)
                ->first();
        if ($mod_dir) {            
            return $this->err('修改名称已存在');
        }
        
        $dir = $this->imageDir->where('dirname', $dirname)
                ->where('user_id', $this->user->id)
                ->first();
        
        if ($dir) {
            $dir->dirname = $mod_dirname;
            $dir->save();
        } else {
            return $this->err('目标目录不存在');
        }
                
        return $this->dump(['dirname' => $dir->dirname]);
    }
    
    /**
     * editor_deldir
     * 删除文件夹
     * @param  string $dirname 文件夹名称
     * @return string json {
     *  dirname : dir1,
     *  result  : true
     * }
     */   
    public function deldir(string $dirname)  {
        $dir = $this->imageDir->where('dirname', $dirname)
                ->where('user_id', $this->user->id)
                ->first();
        
        if (!$dir) {
            return $this->err('目录不存在');
        }
        
        $this->image->where('dir_id', $dir->id)->delete();
        $dir->delete();
        
        return $this->dir();        
    }
    
    
    
    /**
     * editor_upload
     * 上传图片
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
    public function upload() {
        if (!$this->request->hasFile('file') && !$this->request->has('url')) {
            return $this->err('请上传文件');
        }
        
        if ($this->request->has('folder')) {
            $dir = $this->imageDir->where('dirname', $this->request->folder)
                    ->where('user_id', $this->user->id)
                    ->first();            
            if ($dir) {
                $this->image->dir_id = $dir->id;
            } else {
                $this->image->dir_id = 0;
            }
        } else {
            $this->image->dir_id = 0;
        }
        
        if ($this->request->hasFile('file')) {
            $file = $this->request->file('file');
            if (!$file->isValid()) {
                return $this->err('上传文件失败');
            }

            $validate = validator($this->request->all(), ['file' => 'image']);
            if ($validate->fails()) {
                return $this->err('请上传jpeg/jpg, png, gif的图片');
            }
        } else {
            $url = $this->request->get('url');           
            
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
                return $this->err('请粘贴有效的图片网址');
            }
            
        }
        
        $this->image->user_id = $this->user->id;
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
        
        return $this->dump(['image' => $this->image->toArray()]);
    }
    
    /**
     * editor_modimage
     * 修改图片信息
     * @param int    $id  图片ID
     * @param string $name 图片名称
     * @param string $alt  标注
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
     * 
     */
    public function modimage()  {
        $dir = $this->imageDir->where('dirname', $this->request->folder)
                ->where('user_id', $this->user->id)
                ->first();
        if (!$dir) {
            $dir_id = $dir->id;
        } else {
            $dir_id = 0;
        }
        
        $image = $this->image->where('user_id', $this->user->id)
                ->find($this->request->id);
        
        if (!$image) {
            return $this->err('图片不存在');
        }
        
        $image->dir_id = $dir_id;
        $image->name = $this->request->name;
        $image->alt = $this->request->alt;
        $image->save();
        
        return $this->dump(['image' => $image->toArray()]);
    }
    
    /**
     * editor_delimage
     * 隐藏图片
     * @param int    $id  图片ID
     * @return string json {
     *   'result' : 'true'
     * }
     * 
     */
    public function delimage(int $id)  {
        
        $this->image->where('id', $id)
                ->where('user_id', $this->user->id)
                ->delete();
        
        return $this->dump();
    }
}
