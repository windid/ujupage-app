<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Page\Page;
use App\Models\Page\PageVariation;
use App\Models\User\UserSetting;

class PageVariationController extends Controller {
    
    public $user;
    
    public $userSetting;
    public $page;
    public $pageVariation;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->userSetting = new UserSetting;
        $this->page = new Page;
        $this->pageVariation = new PageVariation;
    }
    
    /**
     * 增加页面
    public function createpage() {
        
    }
     */
    
    /**
     * 初始化加载
     * @param int $id 版本ID
     * @return {
     *   {
            id : 1
            page_id : 1
            user_id : 1
            name : test_version
            setting : {
              asetting : avalue
            }
            html_json : {
              ahtml : atag
            }
            created_at : 1468573042
            updated_at : 1468573042
            page : {
              id : 1
              user_id : 1
              name : test
              setting : {
                asetting : avalue
              }
              created_at : 1468573008
              updated_at : 1468573008
            }
            user_setting : {
              user_id : 1
              setting : {
                asetting : avalue
              }
            }
          }
     * }
     */
    /**
     * 版本初始化
     * @param int $id 版本ID
     * @return string json
     */
    public function start(int $id = 0) {
        $page_variation = $this->pageVariation->where('user_id', $this->user->id)
                                            ->with(['page', 'userSetting'])
                                            ->find($id);
        if (!$page_variation) {
            return $this->err('找不到相关版本');
        }
        //return $this->dump($page_variation->toArray());
        return $page_variation->html_json;
    }
    
    /**
     * page_save
     * 保存版本
     * @param int $id 版本id
     * @param string $htmljson 页面json
     * @return {
     *  result : true
     * }
     */
    public function save(Request $request) {        
        $page_variation_id = $request->get('id', 0);
        $page_variation = $this->pageVariation->where('user_id', $this->user->id)
                                            ->find($page_variation_id);
        if (!$page_variation) {
            return $this->err('找不到相关版本');
        }
        if (!$request->htmljson) {
            return $this->err('页面数据不能为空');
        }
        
        $page_variation->html_json = $request->htmljson;
        $page_variation->save();
        
        return $this->dump();
    }
    
    /**
     * 删除版本（设为删除状态）
     * @param type $id 版本ID
     * @return {
     *  result: success
     * }
     */    
    public function remove($id) {
        $page_variation = $this->pageVariation->where('user_id', $this->user->id)
                                            ->find($id);
        if (!$page_variation) {
            return $this->err('找不到相关版本');
        }
        
        $page_variations = $this->pageVariation->where('page_id', $page_variation->page_id)
                ->where('user_id' , $this->user->id)
                ->count();
        if ($page_variations <= 1) {
            return $this->err('该页面下只有这个版本，不能删除');
        }
        
        $page_variation->deleted_at = time();
        $page_variation->save();
        
        return $this->dump(['result' => 'success']);
    }
    /**
     * 自动生成版本号
     * @param int $counts
     * @return string
     */
    protected function getVariationName(int $counts) {
        $num26 = base_convert($counts, 10, 26);
        $addcode = 17;  
        $result = '';  
        for ($i=0; $i<strlen($num26); $i++) {  
            $code = ord($num26{$i});  
            if ($code < 58) {  
                $result .= chr($code+$addcode);  
            } else {  
                $result .= chr($code+$addcode-39);  
            }  
        }  
        return '版本 '.$result; 
    }

    /**
     * 复制副本
     * @param int $id 版本ID
     * @return {
     *  id = 版本ID,
     *  name = 版本号
     * }
     */
    public function duplicate($id) {
        $page_variation = $this->pageVariation->where('user_id', $this->user->id)
                                            ->find($id);
        if (!$page_variation) {
            return $this->err('找不到相关版本');
        }
        
        $exist_variations = $this->pageVariation->where('page_id', $page_variation->page_id)
                ->where('user_id' , $this->user->id)
                ->where('deleted_at' , 0)
                ->count();
        if ($exist_variations>=10) {
            return $this->err('活跃版本数量上限为10个');
        }
        
        $page_variations = $this->pageVariation->where('page_id', $page_variation->page_id)
                ->where('user_id' , $this->user->id)
                ->count();
        
        $copy_variation = new PageVariation;
        $copy_variation->page_id = $page_variation->page_id;
        $copy_variation->user_id = $page_variation->user_id;
        $copy_variation->name = $this->getVariationName($page_variations);
        $copy_variation->setting = json_encode($page_variation->setting);
        $copy_variation->html_json = $page_variation->html_json;
        $copy_variation->save();
        
        return $this->dump(['id' => $copy_variation->id, 'name'=> $copy_variation->name]);
    }
    
    
    /**
     * 新建版本
     * @param int $page_id
     * @return {
     *  id = 版本ID,
     *  name = 版本号
     * }
     */
    public function create(int $page_id = 0) {
        $page = $this->page->find($page_id);
        if (!$page) {
            return $this->err('找不到该页面');
        }
        
        $exist_variations = $this->pageVariation->where('page_id', $page_id)
                ->where('user_id' , $this->user->id)
                ->where('deleted_at' , 0)
                ->count();
        if ($exist_variations>=10) {
            return $this->err('活跃版本数量上限为10个');
        }
        
        $page_variations = $this->pageVariation->where('page_id', $page_id)
                ->where('user_id' , $this->user->id)
                ->count();
        
        $this->pageVariation->page_id = $page_id;
        $this->pageVariation->user_id = $this->user->id;
        $this->pageVariation->name = $this->getVariationName($page_variations);
        $this->pageVariation->setting = json_encode([]);
        $this->pageVariation->html_json = json_encode([]);
        $this->pageVariation->save();
        
        return $this->dump(['id' => $this->pageVariation->id, 'name'=> $this->pageVariation->name]);
    }
    
    
    /**
     * 修改版本号
     * @param int $id 版本ID
     * @param string $name 版本名称
     * @return {
     *  result = true
     * }
     */
    public function rename(Request $request) {
        $page_variation_id = $request->get('id', 0);
        $page_variation = $this->pageVariation->where('user_id', $this->user->id)
                                            ->find($page_variation_id);
        if (!$page_variation) {
            return $this->err('找不到相关版本');
        }
        
        $page_variations = $this->pageVariation->where('page_id', $page_variation->page_id)
                ->where('user_id' , $this->user->id)
                ->count();
                
        $page_variation->name = $request->get('name', $this->getVariationName($page_variations));
        $page_variation->save();
        
        return $this->dump();
    }
}