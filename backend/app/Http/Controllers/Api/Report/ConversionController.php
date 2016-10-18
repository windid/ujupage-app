<?php

namespace App\Http\Controllers\Api\Report;

use App\Http\Controllers\Api\Controller;

use App\Models\Page\Page;
use App\Models\Page\PageVariation;
use App\Models\Page\PageGroup;
use App\Models\Project\Project;

use App\Models\Report\ReportConversion;
use App\Models\Report\ReportOverview;

class ConversionController extends Controller {
    
    public $user;
    public $page;
    public $pageVariation;
    public $pageGroup;
    public $project;
    public $conversion;
    
    public function __construct() {
        $this->user = auth()->user();
        
        $this->page = new Page;
        $this->pageVariation = new PageVariation;
        $this->pageGroup = new PageGroup;
        $this->project = new Project;
        
        $this->conversion = new ReportConversion;
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
     * 获取转化详情
     * @param int $page_id
     * @param int $start_date
     * @param int $end_date
     * @return {
     *  0: { 非转化事件
     *      {
     *        goal_type 转化类型
     *        goal_desc 转化目标
     *        goals 转化次数
     *        goals_percent 转化率
     *      }
     *  }
     *  1: { 转化事件
     *    {
     *        goal_type 转化类型
     *        goal_desc 转化目标
     *        goals 转化次数
     *        goals_percent 转化率
     *    }
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
        
        $conversions = [];
        $visitors = intval(($this->overview->where('page_id', $page_id)->whereBetween('report_date', [$start_date, $end_date])
                        ->where(function ($query) use ($variation_id, $ver){
                            if ($variation_id > 0) {
                                $query = $query->where('variation_id', $variation_id);
                            }
                            if ($ver != '') {
                                $query = $query->where('ver', $ver);
                            }
                            return $query;
                        })
                        ->select(\DB::raw('SUM(visitors) AS visitors'))->first())['visitors']);
        
        $conversions[] = $this->conversion->where('page_id', $page_id)->whereBetween('report_date', [$start_date, $end_date])
                        ->where('goal', '0')
                        ->where(function ($query) use ($variation_id, $ver){
                            if ($variation_id > 0) {
                                $query = $query->where('variation_id', $variation_id);
                            }
                            if ($ver != '') {
                                $query = $query->where('ver', $ver);
                            }
                            return $query;
                        })
                        ->groupBy('goal_desc')
                        ->select('goal_type', 'goal_desc', \DB::raw('SUM(goals) AS goals'), \DB::raw('SUM(goals) / ' . $visitors . ' * 100 AS goals_percent'))
                        ->get();
        $conversions[] = $this->conversion->where('page_id', $page_id)->whereBetween('report_date', [$start_date, $end_date])
                        ->where('goal', '1')
                        ->where(function ($query) use ($variation_id, $ver){
                            if ($variation_id > 0) {
                                $query = $query->where('variation_id', $variation_id);
                            }
                            if ($ver != '') {
                                $query = $query->where('ver', $ver);
                            }
                            return $query;
                        })
                        ->groupBy('goal_desc')
                        ->select('goal_type', 'goal_desc', \DB::raw('SUM(goals) AS goals'), \DB::raw('SUM(goals) / ' . $visitors . ' * 100 AS goals_percent'))
                        ->get();
                
        return $this->successOK($conversions);
    }
}