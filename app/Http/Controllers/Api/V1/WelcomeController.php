<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class WelcomeController extends Controller {
    
    public function getIndex() {
        return view('welcome');
    }
}