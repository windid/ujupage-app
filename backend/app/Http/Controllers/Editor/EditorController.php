<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Request;

use App\Models\Page\PageVariation;
use App\Models\Page\Page;
use App\Models\Page\PageGroup;
use App\Models\Project\Project;

class EditorController extends Controller {

    public $user;
    public $project;
    public $pageGroup;
    public $page;
    public $pageVariation;    

    public function __construct() {
        $this->user = auth()->user();
        
        $this->pageVariation = new PageVariation;
        $this->page = new Page;
        $this->pageGroup = new PageGroup;
        $this->project = new Project;
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
    
    // editor 页面
    public function index($id) {
        $page = $this->initPGP($id);
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            throw new \ErrorException('not found page');
        }        
        $page->variations = $page->variation()->select('id', 'name')
                ->orderBy('id', 'desc')
                ->get()->toArray();
        
        return view('editor', ['page' => $page, 'project_id' => $this->project->id]);
    }
    
    /**
     * 版本预览
     * @param int $id 版本ID
     * @return string $content 页面内空
     */
    public function previewVariation(int $id) {
         
        $page_variation = $this->initPGPV($id);
        if (get_class($page_variation) == 'Illuminate\Http\JsonResponse') {
            return $page_variation;
        }
        
        $content = \App\Services\ParseHtml::decode($page_variation->toArray());
        if(!$content){
            return '页面尚未被编辑';
        }
        return view('preview.variation', compact('content'));
    }

    /**
     * 页面预览 Todo:输出页面下所有Variation的id和name
     * @param int $id Page ID
     * @return 预览页面，在iframe中嵌套previewVariation中的版本 
     */
    public function preview(){
        return view('preview.index');
    }
    
    public function api(Request $request) {
        if (!$request->has('m')) {
            return $this->err('找不到相关内容');
        }

        $methods = explode('@', $request->get('m'));
        if (count($methods) < 1) {
            return $this->err('找不到相关内容');
        }

        $parameters = [];
        if ($request->has('p')) {
            $parameters = explode('@', $request->get('p'));
            if (count($methods) != count($parameters)) {
                return $this->err('非法参数数量');
            }
        }
        
        $namespaces = $results = [];
        foreach ($methods as $k => $v) {
            $_point = explode("_", $v);
            if (!isset($namespaces[$_point[0]])) {
                $_namespace = "App\Http\Json\\" . ucwords($_point[0]) . "Json";
                if (!class_exists($_namespace)) {
                    return $this->err('非法n操作');
                }
                
                $namespaces[$_point[0]] = app($_namespace, [$this->user, $request]);
            }

            $class = $namespaces[$_point[0]];
            $method = $_point[1];
            if (!method_exists($class, $method)) {
                return $this->err('非法m操作');
            }
            
            $_parameters = explode('_', $parameters[$k]);
            array_walk($_parameters, [$this, 'decode_parameter']);
            try {
                $results[$v] = call_user_func_array([$class, $method], !isset($parameters[$k]) ? :$_parameters);
            } catch (\ErrorException $ex) {
                return $this->err('m操作含有非法参数');
            }
        }
        
        return $this->dump($results);
    }
    
    private function decode_parameter(&$v) {
        
        $v = base64_decode($v);
    }

}
