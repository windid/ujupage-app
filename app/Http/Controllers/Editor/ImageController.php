<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImageController extends Controller {
    
    public $user;
    
    public function __construct() {
        $this->user = auth()->user();
    }
    
    /**
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
     *   1567: {                    image id
     *     name:"test",             image 名称
     *     alt:"",                  image alt
     *     url:  "http://xxx.jpg",  image url
     *     thumb:"http://xxx.jpg",  thumb url
     *     width:"913",             image width
     *     height:"571"             image height
     *   }
     *  }
     * }
     */
    public function getIndex(string $dirname = "default" 
                                    , int $page = 1 
                                    , int $page_size = 30)  {
        var_dump($dirname, $page, $page_size);
        return "";        
    }
    
    /**
     * 文件夹列表
     * @return string json {
     *  dir : {dir1, dir2, dir3}
     * }
     */
    public function dir()  {        
        
    
        return response()->json(['dir' => ['default', 'dir1', 'dir2', 'dir3']]);
    }
    
    /**
     * 增加文件夹
     * @param  string $dirname 文件夹名称
     * @return string json {
     *  dirname : dir1,
     *  result  : true
     * }
     */    
    public function mkdir(string $dirname)  {        
        
        return response()->json(['dirname' => $dirname, 'result' => 'true']);
    }
    
    /**
     * 修改文件夹
     * @param  string $dirname 文件夹名称
     * @return string json {
     *  dirname : dir1,
     *  result  : true
     * }
     */   
    public function moddir(string $dirname)  {
                
        return response()->json(['dirname' => $dirname, 'result' => 'true']);
    }
    
    /**
     * 删除文件夹
     * @param  string $dirname 文件夹名称
     * @return string json {
     *  dirname : dir1,
     *  result  : true
     * }
     */   
    public function deldir(string $dirname)  {
        
        return response()->json(['dirname' => $dirname, 'result' => 'true']);        
    }
    
    
    
    /**
     * 上传图片
     * @param file $file 图片
     * @param string $dirname 文件夹名称
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
    public function upload(Request $request) {
        
    }
    
    /**
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
    public function modimage(Request $request)  {
        
        return response()->json([
            'image' => [
                "id" => "123456",
                "name" => "test", 
                "folder" => "default",
                "alt" => "",
                "url" => "http://xxx.jpg", 
                "thumb" => "http://xxx.jpg", 
                "width" => "913", 
                "height" => "571"
            ]
            , 'result' => 'true']);
    }
    
    /**
     * 隐藏图片
     * @param int    $id  图片ID
     * @return string json {
     *   'result' : 'true'
     * }
     * 
     */
    public function delimage(int $id)  {
        
        return response()->json(['result' => 'true']);
    }
    
}
