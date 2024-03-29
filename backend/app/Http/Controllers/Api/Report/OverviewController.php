<?php

namespace App\Http\Controllers\Api\Report;

use App\Http\Controllers\Api\Controller;

use App\Models\Page\Page;
use App\Models\Page\PageVariation;
use App\Models\Page\PageGroup;
use App\Models\Project\Project;

use App\Models\Report\ReportOverview;

class OverviewController extends Controller {
    
    public $user;
    public $page;
    public $pageVariation;
    public $pageGroup;
    public $project;
    public $overview;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->page = new Page;
        $this->pageVariation = new PageVariation;
        $this->pageGroup = new PageGroup;
        $this->project = new Project;
        
        $this->overview = new ReportOverview;
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
     * 获取转化汇总
     * @param int $page_id
     * @param int $start_date
     * @param int $end_date
     * @return {
     *  variations: {
     *      {
     *        name 版本名称
     *        page_id
     *        variation_id
     *        total_visitors 访客总数
     *        total_conversions 转化总数
     *        cv 转化率
     *        quota 流量分配  
     *      }
     *  }
     *  gather_date: {
     *    {
     *      report_date 日期
     *      total_visitors 访客总数
     *      total_conversions 转化数
     *      cv 转化率
     *    }
     *  }
     * }
     */
    public function show(int $page_id) {
        // for ($i=0;$i<=23;$i++) {
        //  $this->overview->insert(['page_id' => 12, 'variation_id' => 19, 'ver' => 'pc', 'report_date' => date('Y-m-d'), 'report_hour' => $i, 'visitors' => rand(100,1000), 'conversions' => rand(10,100)]);
        //  $this->overview->insert(['page_id' => 12, 'variation_id' => 19, 'ver' => 'mobile', 'report_date' => date('Y-m-d'), 'report_hour' => $i, 'visitors' => rand(100,1000), 'conversions' => rand(10,100)]);
        // }
        
        $page = $this->initPGP($page_id);
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        $start_date = \Request::input('start_date', date('Y-m-d', strtotime('-7 day')));
        $end_date = \Request::input('end_date', date('Y-m-d', strtotime('-1 day')));
        $ver = \Request::input('ver', '');
        $variation_id = \Request::input('variation_id', 0);
        
        $a = $this->overview->getTable();
        $b = $this->pageVariation->getTable();
        $overviews = [];
        $variations = $this->pageVariation->where('page_id', $page_id)
                ->where(function ($query) use ($variation_id){
                    if ($variation_id > 0) {
                        return $query->where('id', $variation_id);
                    }
                })
                ->select('id', 'name', 'quota', 'page_id')
                ->get()->toArray();
        
        foreach ($variations as $k => $v) {
            $overview = $this->overview
                    ->select($a.'.page_id', $a.'.variation_id', \DB::RAW('SUM(visitors) AS total_visitors'),  \DB::RAW('SUM(conversions) AS total_conversions')
                            , \DB::RAW('(SUM(conversions) / SUM(visitors)) AS cv'))
                    ->leftJoin($b , $a . '.variation_id' , '=' , $b . '.id')
                    ->whereBetween($a.'.report_date', [$start_date, $end_date])
                    ->where($a.'.variation_id', $v['id'])
                    ->where(function ($query) use ($ver){
                        if ($ver != '') {
                            return $query->where('ver', $ver);
                        }
                    })
                    ->groupBy($a.'.variation_id')
                    ->orderBy($a.'.variation_id')->first();
            if (!$overview) {
                $variations[$k]['page_id'] = $v['page_id'];
                $variations[$k]['variation_id'] = $v['id'];
                $variations[$k]['total_visitors'] = 0;
                $variations[$k]['total_conversions'] = 0;
                $variations[$k]['cv'] = 0;
            } else {
                $variations[$k] = array_merge($variations[$k], $overview->toArray());
            }
            $overviews['variations'][] = $variations[$k];
        }
        
        foreach ($overviews['variations'] as $k => $v) {
            $overviews['variations'][$k]['dates'] = $this->overview
                ->select($a.'.report_date', \DB::RAW('SUM(visitors) AS total_visitors'),  \DB::RAW('SUM(conversions) AS total_conversions')
                        , \DB::RAW('(SUM(conversions) / SUM(visitors)) AS cv'))
                ->leftJoin($b , $a . '.variation_id' , '=' , $b . '.id')
                ->whereBetween($a.'.report_date', [$start_date, $end_date])
                ->where($a.'.page_id', $page_id)
                ->where($a.'.variation_id', $v['id'])
                ->where(function ($query) use ($ver){
                    if ($ver != '') {
                        return $query->where('ver', $ver);
                    }
                })
                ->groupBy($a.'.report_date')
                ->orderBy($a.'.report_date')->get()->toArray();
        }        
        
        $overviews['gather_date'] = $this->overview
                ->select($a.'.report_date', \DB::RAW('SUM(visitors) AS total_visitors'),  \DB::RAW('SUM(conversions) AS total_conversions')
                        , \DB::RAW('(SUM(conversions) / SUM(visitors)) AS cv'))
                ->leftJoin($b , $a . '.variation_id' , '=' , $b . '.id')
                ->whereBetween($a.'.report_date', [$start_date, $end_date])
                ->where($a.'.page_id', $page_id)
                ->where(function ($query) use ($variation_id){
                    if ($variation_id > 0) {
                        return $query->where('variation_id', $variation_id);
                    }
                })
                ->where(function ($query) use ($ver){
                    if ($ver != '') {
                        return $query->where('ver', $ver);
                    }
                })
                ->groupBy($a.'.report_date')
                ->orderBy($a.'.report_date')->get()->toArray();
                
        return $this->successOK($overviews);
    }
}