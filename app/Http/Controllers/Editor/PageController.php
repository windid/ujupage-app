<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Page\Page;
use App\Models\Page\PageVariation;
use App\Models\User\UserSetting;

class PageController extends Controller {
    
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
        $page_id = $request->get('id', 0);
        $page_variation = $this->pageVariation->where('user_id', $this->user->id)
                                            ->find($page_id);
        if (!$page_variation) {
            return $this->err('找不到相关版本');
        }
        
        $page_variation_setting = $request->get('page_variation_setting', '');
        $page_setting = $request->get('page_setting', '');
        $user_setting = $request->get('user_setting', '');
        
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
        $this->userSetting->where('user_id', $page_variation->user_id)->update([
            'setting' => $user_setting
        ]);
        
        return $this->dump();
    }
    
}