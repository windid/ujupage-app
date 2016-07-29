<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Page\Page;
use App\Models\Page\PageVariation;
use App\Models\Page\PageGroup;

class PageController extends Controller {
    
    public $user;
    
    public $userSetting;
    public $page;
    public $pageVariation;
    public $pageGroup;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->page = new Page;
        $this->pageVariation = new PageVariation;
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
            return $this->err('not found variation');
        }
        $this->pageGroup = $this->pageGroup->find($this->page->group_id);
        if (!$this->pageGroup) {
            return $this->err('not found variation');
        }
        $this->project = $this->user->projects()->find($this->pageGroup->project_id);
        if (!$this->project) {
            return $this->err('not found variation');
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
     * page_savesetting
     * 设置保存
     * @param int $id 版本ID
     * @param string $page_variation_setting 版本设置
     * @param string $page_setting 页面设置
     * @param string $user_setting 用户设置
     * @return {
     *  result : true
     * }
     */
    public function savesetting(Request $request) {
        $page_variation_id = $request->get('id', 0);
        $page_variation = $this->initPGPV($page_variation_id);
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        $page_variation_setting = $request->get('page_variation_setting', '');
        $page_setting = $request->get('page_setting', '');
        //$user_setting = $request->get('user_setting', '');
        
        if (!$page_variation_setting 
                || !$page_setting
                || !$user_setting) {
            return $this->err('设置不能为空');
        }
        
        $this->pageVariation->where('id', $page_variation->id)->update([
            'setting' => $page_variation_setting
        ]);
        $this->page->where('id', $page_variation->page_id)->update([
            'setting' => $page_setting
        ]);
        
        return $this->dump();
    }
    
}