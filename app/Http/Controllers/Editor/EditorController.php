<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EditorController extends Controller {
    
    public $user;
    
    public function __construct() {
        $this->user = auth()->user();
    }
    
    public function v1() {
        return view('editor');
    }
}
