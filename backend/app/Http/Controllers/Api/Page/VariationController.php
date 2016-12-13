<?php

namespace App\Http\Controllers\Api\Page;

use App\Http\Controllers\Api\Controller;
use Illuminate\Http\Request;

use App\Models\Page\PageVariation;
use App\Models\Page\Page;
use App\Models\Page\PageGroup;

class VariationController extends Controller {
    
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
            return $this->errorNotFound();
        }
        $this->pageGroup = $this->pageGroup->find($this->page->group_id);
        if (!$this->pageGroup) {
            return $this->errorNotFound();
        }
        $this->project = $this->user->projects()->find($this->pageGroup->project_id);
        if (!$this->project) {
            return $this->errorNotFound();
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
            return $this->errorNotFound();
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
    public function show($page_id,  $variation_id) {
        $page_variation = $this->initPGPV($variation_id);               
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        //return $page_variation->html_json;
        return $this->successOK($page_variation->toArray());
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
    public function index(int $page_id) {
        $page = $this->initPGP($page_id); 
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        
        $page->variations = $page->variation()->select('id', 'name', 'quota')
                ->orderBy('id', 'desc')
                ->get()->toArray();
        
        return $this->successOK($page->variations);
    }
    
    
    /**
     * 新建版本
     * @param int $page_id
     * @return {
     *  id = 版本ID,
     *  name = 版本号
     * }
     */
    public function store(Request $request, $page_id) {
        $page = $this->initPGP($page_id); 
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        
        $exist_variations = $this->pageVariation->where('page_id', $page_id)
                ->where('user_id' , $this->user->id)
                ->whereNull('deleted_at')
                ->count();
        $validator = validator(['exist_variations' => $exist_variations+1], ['exist_variations' => 'integer|max:10']);        
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }
                
        $this->pageVariation->page_id = $page_id;
        $this->pageVariation->user_id = $this->user->id;
        $this->pageVariation->name = $this->getVariationName($this->page->variation_history);
        $this->pageVariation->setting = json_encode([]);
        $this->pageVariation->html_json = json_encode([]);
        $this->pageVariation->html = '';
        $this->pageVariation->save();
        $this->page->increment('variation_history');
        
        return $this->successCreated(['id' => $this->pageVariation->id, 'name'=> $this->pageVariation->name]);
    }
        
    /**
     * 保存版本
     * @param int $id 版本id
     * @param string $htmljson 页面json
     * @return {
     *  result : true
     * }
     */
    public function update(Request $request, $page_id, $variation_id) {    
        $page_variation = $this->initPGPV($variation_id);         
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        if ($request->htmljson) {
            $page_variation->html_json = $request->get('htmljson');
        }
        if ($request->name) {
            $page_variation->name = $request->get('name'
                                                , $this->getVariationName($this->page->variation_history));
        }
        
        $page_variation->save();
        
        return $this->successCreated();
    }
        
    /**
     * 删除版本（设为删除状态）
     * @param type $id 版本ID
     * @return {
     *  result: success
     * }
     */    
    public function destroy(Request $request, $page_id, $variation_id) {
        $page_variation = $this->initPGPV($variation_id);         
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        $exist_variations = $this->pageVariation->where('page_id', $page_variation->page_id)
                ->where('user_id' , $this->user->id)
                ->count();
        
        $validator = validator(['exist_variations' => $exist_variations-1], ['exist_variations' => 'integer|min:1']);
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }
        
        $page_variation->delete();
        
        return $this->successNoConnect();
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
    public function copy($page_id, $variation_id) {
        $page_variation = $this->initPGPV($variation_id);         
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        $exist_variations = $this->pageVariation->where('page_id', $page_variation->page_id)
                ->where('user_id' , $this->user->id)
                ->where('deleted_at' , 0)
                ->count();
        $validator = validator(['exist_variations' => $exist_variations+1], ['exist_variations' => 'integer|max:10']);        
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }
                
        $copy_variation = new PageVariation;
        $copy_variation->page_id = $page_variation->page_id;
        $copy_variation->user_id = $page_variation->user_id;
        $copy_variation->name = $this->getVariationName($this->page->variation_history);
        $copy_variation->setting = json_encode($page_variation->setting);
        $copy_variation->html_json = $page_variation->html_json;
        $copy_variation->html = $page_variation->html;
        $copy_variation->quota = $page_variation->quota;
        $copy_variation->save();
        $this->page->increment('variation_history');
        
        return $this->successCreated(['id' => $copy_variation->id, 'name'=> $copy_variation->name]);
    }
    
    /**
     * 
     * 分配权重
     * @param int $id page_id
     * @return json $quota id: quota
     */
    
    /**
     * 版本预览
     * @param int $id 版本ID
     * @return string $content 页面内容
     */
    public function preview($page_id, $variation_id) {
         
        $page_variation = $this->initPGPV($variation_id);
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        $content = \App\Services\ParseHtml::decode($page_variation->toArray());
        if(!$content){
            return '页面尚未被编辑';
        }
        return view('preview.variation', compact('content'));
    }
}