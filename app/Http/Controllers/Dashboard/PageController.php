<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Request;

use App\Models\Page\Page;
use App\Models\Page\PageVariation;
use App\Models\Page\PageGroup;
use App\Models\Project\Project;

class PageController extends Controller {
    
    public $user;
    public $page;
    public $pageVariation;
    public $pageGroup;
    public $project;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->page = new Page;
        $this->pageVariation = new PageVariation;
        $this->pageGroup = new PageGroup;
        $this->project = new Project;
    }
    
    /**
     * 初始化project,grouppage
     * @param int $group_id
     * @return App\Models\Page\PageGroup $pagegroup
     */
    private function initPG(int $group_id) {
        $this->pageGroup = $this->pageGroup->find($group_id);
        if (!$this->pageGroup) {
            return $this->err('not found group');
        }
        $this->project = $this->user->projects()->find($this->pageGroup->project_id);
        if (!$this->project) {
            return $this->err('not found group');
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
            return $this->err('not found page');
        }
        
        $pagegroup = $this->initPG($this->page->group_id);
        if (get_class($pagegroup) == 'Illuminate\Http\JsonResponse') {
            return $this->err('not found page');
        }
        
        return $this->page;
    }
    
    /**
     * 获取该分组的页面
     * @param int $group_id
     * @return json {
     *  {
     *   id = 页面iD
     *   name = 项目ID
     *   url = 分组名称
     *   setting = 页面设置
     *  }
     * }
     */    
    public function get(int $group_id) {
        $pagegroup= $this->initPG($group_id);        
        if (get_class($pagegroup) == 'Illuminate\Http\JsonResponse') {
            return $pagegroup;
        }
        
        $pages = $pagegroup->pages()->get();        
        return $this->dump(['pages' => $pages->toArray()]);
    }
    
    /**
     * 获取页面(单行)
     * @param int $page_id
     * @return json {
     *  id = 页面iD
     *  name = 项目ID
     *  url = 分组名称
     *  setting = 页面设置
     * }
     */    
    public function one(int $page_id) {
        $page= $this->initPGP($page_id);        
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
             
        return $this->dump(['page' => $page->toArray()]);
    }
    
    /**
     * 增加页面
     * @param int $group_id 分组ID
     * @param string $name 页面名称
     * @param string $url url地址
     * @param json $setting 页设置
     * @return json {
     *   id = 页面iD
     *   name = 项目ID
     *   url = 分组名称
     *   setting = 页面设置
     * }
     */
    public function add(Request $request) {        
        $group_id = $request->get('group_id', 0);        
        $pagegroup= $this->initPG($group_id);        
        if (get_class($pagegroup) == 'Illuminate\Http\JsonResponse') {
            return $pagegroup;
        }
                        
        $this->page->user_id = $this->user->id;
        $this->page->name = $request->get('name', '');        
        if ($this->pageGroup->name == '') {
            return $this->err('empty page name');
        }
        $this->page->url = $request->get('url', '');
        $this->page->setting = $request->get('setting', '');
        $pagegroup->pages()->save($this->page);
        
        return $this->dump(['page' => $this->page]);
    }
    
    /**
     * 修改页面信息
     * @param int $id 页面ID
     * @param int $group_id 分组ID
     * @param string $name 页面名称
     * @param string $url url地址
     * @param json $setting 页设置
     * @return json {
     *  id = 分组ID
     *  project_id = 项目ID
     *  name = 项目名称
     */
    public function mod(Request $request) {
        $group_id = $request->get('group_id', 0);        
        $pagegroup= $this->initPG($group_id);        
        if (get_class($pagegroup) == 'Illuminate\Http\JsonResponse') {
            return $pagegroup;
        }
        
        $page_id = $request->get('id', 0);
        $page = $this->initPGP($page_id);
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        
        $page->name = $request->get('name', '');        
        if ($this->pageGroup->name == '') {
            return $this->err('empty page name');
        }
        $page->url = $request->get('url', '');
        $page->setting = $request->get('setting', '');        
        $pagegroup->pages()->save($page);
        
        return $this->dump(['group' => $page->toArray()]);
    }
    
    /**
     * 删除页面
     * @param int $id 页面ID
     * @return json {
     *   result = true
     *  }
     */
    public function remove(int $id) {
              
        $page = $this->initPGP($id);        
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        $page->variation()->delete();
        $page->delete();
        
        return $this->dump();
    }
    
}