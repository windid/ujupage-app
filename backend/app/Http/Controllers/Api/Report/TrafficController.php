<?php

namespace App\Http\Controllers\Api\Report;

use App\Http\Controllers\Api\Controller;

use App\Models\Page\Page;
use App\Models\Page\PageVariation;
use App\Models\Page\PageGroup;
use App\Models\Project\Project;

use App\Models\Report\ReportSource;

class TrafficController extends Controller {
    
    public $user;
    public $page;
    public $pageVariation;
    public $pageGroup;
    public $project;
    public $source;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->page = new Page;
        $this->pageVariation = new PageVariation;
        $this->pageGroup = new PageGroup;
        $this->project = new Project;
        
        $this->source = new ReportSource;
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
     * 获取流量分析
     * @param int $page_id
     * @param int $start_date
     * @param int $end_date
     * @return {
     *  utm_key: {
     *      {
     *        dimension_value 值
     *        visitors 访客量
     *        conversions 转化量
     *        conversion_percent 转化率
     *      }
     *  }
     * }
     */
    public function show(int $page_id) {
        
        $page = $this->initPGP($page_id);
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        $start_date = \Request::input('start_date', date('Y-m-d', strtotime('-7 day')));
        $end_date = \Request::input('end_date', date('Y-m-d', strtotime('-1 day')));
        
        $ver = \Request::input('ver', '');
        $variation_id = \Request::input('variation_id', 0);
        
        $traffics = [];
        
        $dimension = $this->source->groupBy('dimension')->lists('dimension');

        foreach ($dimension as $v) {
            $traffics[$v] = $this->source->where('page_id', $page_id)->whereBetween('report_date', [$start_date, $end_date])
                            ->where('dimension', $v)
                            ->where(function ($query) use ($variation_id, $ver){
                                if ($variation_id > 0) {
                                    $query = $query->where('variation_id', $variation_id);
                                }
                                if ($ver != '') {
                                    $query = $query->where('ver', $ver);
                                }
                                return $query;
                            })
                            ->groupBy('dimension_value')
                            ->select('dimension_value', 'visitors', 'conversions', \DB::raw('conversions / visitors AS conversion_percent'))
                            ->get();
        }
        
        return $this->successOK($traffics);
    }
}