<?php

namespace App\Http\Controllers\Api\Page;

use App\Http\Controllers\Api\Controller;
use Symfony\Component\HttpFoundation\Request;

use App\Models\Page\Page;
use App\Models\Page\PageVariation;
use App\Models\Page\PageGroup;
use App\Models\Project\Project;
use App\Models\Page\PageForm;

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
    public function index() {
        $pagegroup = $this->initPG(request('group_id', 0));        
        if (get_class($pagegroup) == 'Illuminate\Http\JsonResponse') {
            return $pagegroup;
        }
        
        $pages = $pagegroup->pages()->get()->toArray();    
        /*
        if (empty($pages)) {
            $request = Request::create(route('api.page.store'), 'POST', [
                'group_id' => $pagegroup->id,
                'name' => '默认页面'
            ]);
            $this->store($request);
            $pages = $pagegroup->pages()->get()->toArray();
        }
        */
        return $this->successOK($pages);
    }
    
    /**
     * 获取页面(单行)
     * @param int $page_id
     * @return json {
     *  id = 页面ID
     *  project_id = 项目ID
     *  name = 项目ID
     *  url = 分组名称
     *  setting = 页面设置
     * }
     */    
    public function show(int $page_id) {
        $page= $this->initPGP($page_id);        
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        $page['project_id'] = $this->project->id;
        return $this->successOK($page->toArray());
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
    public function store(Request $request) {        
        $group_id = $request->get('group_id', 0);        
        $pagegroup= $this->initPG($group_id);        
        if (get_class($pagegroup) == 'Illuminate\Http\JsonResponse') {
            return $pagegroup;
        }
                        
        $this->page->user_id = $this->user->id;
        $this->page->name = $request->get('name', '');        
        $validator = validator(['name' => $this->page->name], ['name' => 'required']);
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }
        
        $this->page->url = $request->get('url', '');
        $this->page->setting = $request->get('setting', '');
        $pagegroup->pages()->save($this->page);
        
        // 增加默认版本
        $this->pageVariation->page_id = $this->page->id;
        $this->pageVariation->user_id = $this->user->id;
        $this->pageVariation->name = app('App\Http\Controllers\Editor\PageVariationController')
                                                ->getVariationName(0);
        $this->pageVariation->setting = json_encode([]);
        $this->pageVariation->html_json = json_encode([]);
        $this->pageVariation->save();
        $this->page->increment('variation_history');
        
        return $this->successCreated($this->page->toArray());
    }
    
        
    /**
     * 修改页面信息
     * @param int $id 页面ID
     * @param string $name 页面名称
     * @param string $url url地址
     * @param json $setting 页设置
     * @return json {
     *  id = 分组ID
     *  project_id = 项目ID
     *  name = 项目名称
     */
    public function update(Request $request, $page_id) {          
        $page = $this->initPGP($page_id);
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        
        $pagegroup = $this->initPG($request->get('group_id', $page->group_id));        
        if (get_class($pagegroup) == 'Illuminate\Http\JsonResponse') {
            return $pagegroup;
        }
        
        $page->name = $request->get('name', $page->name);
        $validator = validator(['name' => $page->name], ['name' => 'required']);
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }
        
        $page->url = $request->get('url', $page->url);
        $page->setting = $request->get('setting', '');        
        $pagegroup->pages()->save($page);
        
        return $this->successCreated();
    }
      
    /**
     * 删除页面
     * @param int $id 页面ID
     * @return json {
     *   result = true
     *  }
     */
    public function destroy(Request $request, int $page_id) {
              
        $page = $this->initPGP($page_id);        
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        $page->variation()->delete();
        $page->delete();
        
        return $this->successNoConnect();
    }
    
    /**
     * 复制页面
     * @param int $page_id 页面ID
     * @return json {
     *   id = 页面iD
     *   name = 项目ID
     *   url = 分组名称
     *   setting = 页面设置
     * }
     */
    public function copy(Request $request, int $page_id) {   
        $page = $this->initPGP($page_id);        
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
                 
        $pagegroup= $this->initPG($page->group_id);        
        if (get_class($pagegroup) == 'Illuminate\Http\JsonResponse') {
            return $pagegroup;
        }
        
        $new_page = new Page;
        $new_page->group_id = $page->group_id;
        $new_page->user_id = $page->user_id;
        $new_page->name = $page->name . " 副本";
        $new_page->url = '';
        $new_page->setting = $page->setting ? json_encode($page->setting) : "";
        $new_page->variation_history = $page->variation_history;
        $new_page->save();
        $pagegroup->pages()->save($new_page);
        
        $variations = $this->pageVariation->where('page_id', $page->id)                                            
                                            ->whereNull('deleted_at')
                                            ->get();
        foreach ($variations as $v) {
            $new_page_variation = new PageVariation;
            $new_page_variation->page_id = $new_page->id;
            $new_page_variation->user_id = $this->user->id;
            $new_page_variation->name = $v->name;
            $new_page_variation->setting = json_encode($v->setting);
            $new_page_variation->html_json = $v->html_json;
            $new_page_variation->save();
        }
                
        return $this->successCreated($new_page->toArray());
    }
    
    /**
     * 发布页面
     * @param int $id 页面ID
     * @return {
     *  result = true
     * }
     */
    public function publish(int $page_id) {
        $page = $this->initPGP($page_id);         
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        
        $validator = validator(['url' => $page->url], ['url' => 'required']);
        if ($validator->fails()) {
            return $this->errorValidation($validator);
        }
                
        $variations = $this->pageVariation->where('page_id', $page->id)
                ->get()->toArray();
        foreach ($variations as $k => $v) {
            $content = \App\Services\ParseHtml::decode($v);
            if (!$content){
                $html = '';
            } else {
                $html = view('preview.variation', ['content' => $content])->render();
            }
            $this->pageVariation->where('id', $v['id'])->update([
                'html' => $html
            ]);
        }
        
        return $this->successOK();
    }
    
    /**
     * 用户提交表单数据
     * @param int $page_id 页面ID
     * @param int $page 页码
     * @param int $page_size 每页条数
     * @return {
     *   current_page : 1,
     *   total_pages : 18,
     *   total_pageforms : 600,
     *   page_size : 30 ，
     *   pageforms: {
     *     [
     *       id               表单ID
     *       page_id          页面ID
     *       variation_id     版本ID
     *       variation_name   版本名称
     *       fields: {        字段
     *         *: *
     *       }
     *       created_at       提交时间
     *     ]
     *   }
     * }
     */
    public function leads(int $page_id) {
        $page = $this->initPGP($page_id);         
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        
        $curpage = request('page', 1);
        $page_size = request('page_size', 30);
        
        $pageForm = new PageForm;
        $pageforms = $pageForm->where('page_id', $page->id)->skip(($curpage - 1) * $page_size)->take($page_size)
                ->select('id', 'page_id', 'variation_id', 'variation_name', 'fields', 'created_at')
                ->get()->toArray();
        foreach ($pageforms as $k => $v) {
            $pageforms[$k]['fields'] = json_decode($v['fields'], true);
            $pageforms[$k]['created_at'] = date('Y-m-d H:i', $v['created_at']);
        }
        $total = $pageForm->where('page_id', $page->id)->count();
        $result = [
            'current_page' => $curpage,
            'total_pages' => ceil($total / $page_size),
            'total_pageforms' => $total,
            'page_size' => $page_size,
            'pageforms' => $pageforms
        ];                
        
        return $this->successOK($result);
    }
    
    /**
     * 下载用户提交表单数据 cvs
     * @param int $page_id 页面ID
     * @return 
     *       variation_name   版本名称
     *       created_at       提交时间
     *       fields 
     */
    public function leadscvs(int $page_id) {
        $page = $this->initPGP($page_id);         
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        
        $pageForm = new PageForm;
        $pageforms = $pageForm->where('page_id', $page->id)
                ->select('variation_name', 'fields', 'created_at')
                ->get()->toArray();
        
        $fields = [];
        foreach ($pageforms as $k => $v) {
            $pageforms[$k]['fields'] = json_decode($v['fields'], true);
            $pageforms[$k]['created_at'] = date('Y-m-d H:i', $v['created_at']);
            
            foreach ($pageforms[$k]['fields'] as $kk => $vv) {
                if (!isset($fields[$kk])) {
                    $fields[$kk] = 0;
                }
                if ($kk == '名称') {
                    $fields[$kk]++;
                }
                $fields[$kk]++;
            }
        }
        arsort($fields);
        $fields_val = ['版本名', '提交时间'];
        foreach ($fields as $k => $v) {
            $fields_val[] = $k;
        }
         $fields_val = array_flip($fields_val);
        // dd($fields, $fields_val);
        $fields_count = count($fields_val);
        $values = [];
        foreach ($pageforms as $k => $v) {
            $str = $v['variation_name'] . ',' . $v['created_at'];
            $order = [];
            
            foreach ($v['fields'] as $kk => $vv) {
                $order[$fields_val[$kk]] = $vv;
            }
            ksort($order);
            // dd(implode(',', $order));
            $pre_index = 1;
            foreach ($order as $k => $v) {
                $pad = $k - $pre_index;
                $str .= str_repeat(',', $pad) . $v;
                $pre_index = $k;
            }
            $values[] = $str;
        }        
        
        header("Content-type:text/csv");
        header("Content-Disposition:attachment;filename=商机".date('YmdHis') . '.csv');
        header('Cache-Control:must-revalidate,post-check=0,pre-check=0');
        header('Expires:0'); 
        header('Pragma:public');
        echo iconv('utf-8', 'gb2312', implode(",", array_flip($fields_val))) . "\n";
        echo iconv('utf-8', 'gb2312', implode("\n" ,$values));exit;
    }
}