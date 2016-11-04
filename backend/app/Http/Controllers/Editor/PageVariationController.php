<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Page\PageVariation;
use App\Models\Page\Page;
use App\Models\Page\PageGroup;

class PageVariationController extends Controller {
    
    public $user;
    
    public $pageVariation;
    public $page;
    public $pageGroup;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->pageVariation = new PageVariation;
        $this->page = new Page;
        $this->pageGroup = new PageGroup;
    }
    /**
     * 初始化project,grouppage,page
     * @param int $page_id
     * @return App\Models\Page\Pagen $page
     */
    private function initPGP(int $page_id) {
        $this->page = $this->page->find($page_id);
        if (!$this->page) {
            return $this->err('not found page');
        }
        $this->pageGroup = $this->pageGroup->find($this->page->group_id);
        if (!$this->pageGroup) {
            return $this->err('not found page');
        }
        $this->project = $this->user->projects()->find($this->pageGroup->project_id);
        if (!$this->project) {
            return $this->err('not found page');
        }
        
        return $this->page;
    }
    /**
     * 初始化project,grouppage,page,pagevariation
     * @param int $variation_id
     * @return App\Models\Page\PageVariation $pageVariation
     */
    private function initPGPV(int $variation_id) {
        $this->pageVariation = $this->pageVariation->find($variation_id);
        if (!$this->pageVariation) {
            return $this->err('not found variation');
        }        
        $this->page = $this->initPGP($this->pageVariation->page_id);                 
        if (get_class($this->page) == 'Illuminate\Http\JsonResponse') {
            return $this->page;
        }
        
        return $this->pageVariation;
    }
    
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
        $page_variation = $this->initPGPV($id);               
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        return $page_variation->html_json;
    }
    public function show(int $id = 0) {
        $page_variation = $this->initPGPV($id);               
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        return $page_variation->html_json;
    }
    
    /**
     * 所有版本
     * @param int $page_id 页面ID
     * @return {
     *  {
     *    id = 版本ID,
     *    name = 版本号,
     *    quota = 百份比
     *   }
     * }
     */
    public function all(int $page_id) {
        $page = $this->initPGP($page_id); 
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        
        $page->variations = $page->variation()->select('id', 'name', 'quota')
                ->orderBy('id', 'desc')
                ->get()->toArray();
        
        return $this->dump(['variations' => $page->variations]);
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
        $page_variation = $this->initPGPV($page_variation_id);         
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        if (!$request->htmljson) {
            return $this->err('页面数据不能为空');
        }
        
        $page_variation->html_json = $request->htmljson;
        $page_variation->save();
        
        return $this->dump();
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
    public function update(Request $request, $page_variation_id) {    
        $page_variation = $this->initPGPV($page_variation_id);         
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
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
        $page_variation = $this->initPGPV($id);         
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        $page_variations = $this->pageVariation->where('page_id', $page_variation->page_id)
                ->where('user_id' , $this->user->id)
                ->count();
        if ($page_variations <= 1) {
            return $this->err('该页面下只有这个版本，不能删除');
        }
        
        $page_variation->delete();
        
        return $this->dump(['result' => 'success']);
    }
    
    /**
     * 删除版本（设为删除状态）
     * @param type $id 版本ID
     * @return {
     *  result: success
     * }
     */    
    public function destroy(Request $request, $id) {
        $page_variation = $this->initPGPV($id);         
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        $page_variations = $this->pageVariation->where('page_id', $page_variation->page_id)
                ->where('user_id' , $this->user->id)
                ->count();
        if ($page_variations <= 1) {
            return $this->err('该页面下只有这个版本，不能删除');
        }
        
        $page_variation->delete();
        
        return $this->dump(['result' => 'success']);
    }
    
    /**
     * 自动生成版本号
     * @param int $counts
     * @return string
     */
    public function getVariationName(int $counts) {
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
        $page_variation = $this->initPGPV($id);         
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        $exist_variations = $this->pageVariation->where('page_id', $page_variation->page_id)
                ->where('user_id' , $this->user->id)
                ->where('deleted_at' , 0)
                ->count();
        if ($exist_variations>=10) {
            return $this->err('活跃版本数量上限为10个');
        }
                
        $copy_variation = new PageVariation;
        $copy_variation->page_id = $page_variation->page_id;
        $copy_variation->user_id = $page_variation->user_id;
        $copy_variation->name = $this->getVariationName($this->page->variation_history);
        $copy_variation->setting = json_encode($page_variation->setting);
        $copy_variation->html_json = $page_variation->html_json;
        $copy_variation->html = $page_variation->html;
        $copy_variation->quote = $page_variation->quote;
        $copy_variation->save();
        $this->page->increment('variation_history');
        
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
    public function create(Request $request) {
        $page = $this->initPGP($request->get('page_id', 0)); 
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        
        $exist_variations = $this->pageVariation->where('page_id', $page_id)
                ->where('user_id' , $this->user->id)
                ->where('deleted_at' , 0)
                ->count();
        if ($exist_variations>=10) {
            return $this->err('活跃版本数量上限为10个');
        }
                
        $this->pageVariation->page_id = $page_id;
        $this->pageVariation->user_id = $this->user->id;
        $this->pageVariation->name = $this->getVariationName($this->page->variation_history);
        $this->pageVariation->setting = json_encode([]);
        $this->pageVariation->html_json = json_encode([]);
        $this->pageVariation->html = '';
        $this->pageVariation->save();
        $this->page->increment('variation_history');
        
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
        $page_variation = $this->initPGPV($page_variation_id);         
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
                
        $page_variation->name = $request->get('name', $this->getVariationName($this->page->variation_history));
        $page_variation->save();
        
        return $this->dump();
    }
}