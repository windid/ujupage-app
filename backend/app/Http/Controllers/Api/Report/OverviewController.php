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
     *  {
     *      name 版本名称
     *      page_id
     *      variation_id
     *      total_visitors 访客总数
     *      total_conversions 转化总数
     *      cv 转化率
     *      quota 流量分配
     *  }
     * }
     */
    public function gather(int $page_id, string $start_date = '', string $end_date = '') {
        $page = $this->initPGP($page_id);        
        if (get_class($page) == 'Illuminate\Http\JsonResponse') {
            return $page;
        }
        if ($end_date == '') {
           $end_date = date('Y-m-d', strtotime('-1 day'));
        }
        if ($start_date == '') {
           $start_date = date('Y-m-d', strtotime('-8 day'));
        }
        
        $a = $this->overview->getTable();
        $b = $this->pageVariation->getTable();
        $overviews = $this->overview
                ->select($b.'.name', $a.'.page_id', $a.'.variation_id', \DB::RAW('SUM('.$a.'.visitors) AS total_visitors'),  \DB::RAW('SUM('.$a.'.conversions) AS total_conversions')
                        , \DB::RAW('(SUM('.$a.'.conversions) / SUM('.$a.'.visitors)) AS cv'), $b.'.quota')
                ->leftJoin($b , $a . '.variation_id' , '=' , $b . '.id')
                ->whereBetween($a.'.report_date', $start_date, $end_date)
                ->where($a.'.page_id', $page_id)
                ->group($a.'.variation_id')
                ->orderBy($a.'.variation_id')->get();
        dd($overviews);
    }
}