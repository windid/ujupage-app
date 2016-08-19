<?php

namespace App\Http\Json;

class PageJson extends Jsons {
    
    public $user;
    public $request;
    
    public function __construct(User $user, Request $request) {
        $this->user = $user;
        $this->request = $request;
    }
    
    /**
     * 增加页面
     */
    public function createpage() {
        
    }
    
    /**
     * 加载
     */
        
    /**
     * page_save
     * 保存
     * @param 
     */
    public function save() {
        
    }
    
    /**
     * 设置保存
     */
    
    /**
     * 预览
     */
    
    
}