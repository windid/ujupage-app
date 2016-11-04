<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;

// use App\Models\Page\PageVariation;
use App\Models\Page\Page;

class DashboardController extends Controller {

    public $user;
    public $page;
    public $pageVariation;

    public function __construct() {
        $this->user = auth()->user();
        
        // $this->pageVariation = new PageVariation;
        $this->page = new Page;
    }
    
    // dashboard 页面
    public function index() {
        
        return view('dashboard');
    }
    
}
