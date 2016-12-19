<?php

namespace App\Http\Controllers\Api\Hub;

use App\Http\Controllers\Api\Controller;

use App\Models\Hub\HubTemplate;
use App\Models\Hub\HubTemplateTag;
use App\Models\Page\Page;
use App\Models\Page\PageVariation;
use App\Models\Page\PageGroup;
use App\Models\Project\Project;

class TemplateController extends Controller {
    
    public $hubTemplate;
    public $hubTemplateTag;
    
    public $user;
    public $page;
    public $pageVariation;
    public $pageGroup;
    public $project;
    
    public function __construct() {        
        $this->hubTemplate = new HubTemplate;
        $this->hubTemplateTag = new HubTemplateTag;
                
        $this->page = new Page;
        $this->pageVariation = new PageVariation;
        $this->pageGroup = new PageGroup;
        $this->project = new Project;
    }
    
    /**
     * GET api/hub/template/tag 获取标签
     * @return StatusCode 200
     * @return {
     *   [
     *      id 标签ID
     *      tag 名称
     *   ]
     * }
     */
    public function tag() {
        return $this->successOK($this->hubTemplateTag
                ->get(['id', 'tag'])
                ->toArray());
    }
    
    /**
    * GET api/hub/template 获取模板库
    * tags 标签ID 多选:1,2,3
    * @return StatusCode 200
    * @return {
    *    id 模板ID
    *    image_url 图片地址
    *  }
    * }
    * 
    */    
    public function index() {
        $tags = request()->has('tags') ? explode(',', request('tags')) : [];
        array_walk($tags, [$this, 'toInt']);
        
        \DB::enableQueryLog();
        $templates = $this->hubTemplate
                ->join('hub_template_tag_relateds', 'template_id', '=', $this->hubTemplate->getTable() . '.id')
                ->groupBy($this->hubTemplate->getTable() . '.id')
                ->orderBy('order_by', 'asc')
                ->select([$this->hubTemplate->getTable() . '.id', 'image_url']);
        if (!empty($tags)) {
            $templates = $templates->whereIn('tag_id', $tags);
        }
        
        return $this->successOK($templates->get()->toArray());
    }
    
    public function toInt(&$value) {
        $value = intval($value);
    }
    
    /**
     * 初始化project,grouppage
     * @param int $group_id
     * @return App\Models\Page\PageGroup $pagegroup
     */
    private function initPG(int $group_id) {
        $this->pageGroup = $this->pageGroup->find($group_id);
        if (!$this->pageGroup) {
            return $this->errorNotFound();
        }
        $this->project = $this->user->projects()->find($this->pageGroup->project_id);
        if (!$this->project) {
            return $this->errorNotFound();
        }
        
        return $this->pageGroup;
    }
    
    /**
     * 初始化project,grouppage,page
     * @param int $page_id
     * @return App\Models\Page\Page $page
     */
    private function initPGP(int $page_id) {
        $this->page = $this->page->find($page_id);
        if (!$this->page) {
            return $this->errorNotFound();
        }
        
        $pagegroup = $this->initPG($this->page->group_id);
        if (get_class($pagegroup) == 'Illuminate\Http\JsonResponse') {
            return $this->errorNotFound();
        }
        
        return $this->page;
    }
    
    /**
    * GET api/hub/template/copy/{template_id} 复制模板到项目中
    * group_id (必选) 分组ID
    * page_name (2选1) 页面名称
    * --------
    * page_id (2选1) 页面ID
    * @return StatusCode 200
    */ 
    public function copy($template_id) {
        $template = $this->hubTemplate->find($template_id);
        if (!$template) {
            return $this->errorNotFound();
        }
        
        $templateVariation = $this->pageVariation->find($template->variation_id);
        if (!$templateVariation) {
            return $this->errorNotFound();
        }
        
        $this->user = auth()->user();
        if (!$this->user) {
            return $this->errorUnauthorized();
        }
        
        if (request()->has('page_id')) {
            $page = $this->initPGP(request('page_id', 0));
            if (get_class($page) == 'Illuminate\Http\JsonResponse') {
                return $page;
            }
            
        } elseif (request()->has('page_name')) {         
            $pagegroup = $this->initPG(request('group_id', 0));
            if (get_class($pagegroup) == 'Illuminate\Http\JsonResponse') {
                return $pagegroup;
            }
            
            $page = new Page;
            $page->group_id = $pagegroup->id;
            $page->user_id = $this->user->id;
            $page->name = request('page_name');
            $page->url = '';
            $page->setting = "";
            $page->variation_history = 0;
            $page->save();
            $pagegroup->pages()->save($page);
            
        } else {
            return $this->err('page_id or page_name not be null', 422);
        }
        
        
        $pageVariation = new PageVariation;
        $pageVariation->page_id = $page->id;
        $pageVariation->user_id = $this->user->id;
        $pageVariation->name = $this->getVariationName($page->variation_history);
        $pageVariation->setting = '[]';
        $pageVariation->html_json = $templateVariation->html_json;
        $pageVariation->html = $templateVariation->html;
        $pageVariation->quota = 1;
        $pageVariation->save();
        $page->increment('variation_history');            
        
        $this->successCreated();
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
     * GET api/hub/template/preview/{template_id} 预览模板
     * @return StatusCode 200
     * @return string $content 页面内容
     */
    public function preview($template_id) {
        $template = $this->hubTemplate->find($template_id);
        if (!$template) {
            return $this->errorNotFound();
        }
        
        $templateVariation = $this->pageVariation->find($template->variation_id);
        if (!$templateVariation) {
            return $this->errorNotFound();
        }
        if (request()->has('color')) {
            $templateVariation = $templateVariation->toArray();
            $content = json_decode($templateVariation['html_json'],true);
            $content['colorSet'] = explode(',', request('color', ''));
           
            $templateVariation['html_json'] = $content;
            return \App\Services\ParseHtml::decode($templateVariation);
        }
        return \App\Services\ParseHtml::decode($templateVariation);
    }
}
    