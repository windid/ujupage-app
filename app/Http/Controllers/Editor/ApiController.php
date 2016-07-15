<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApiController extends Controller {
    
        
    public function dispatch(Request $request) {
        
        if (!$request->has('m')) {
            $this->err('找不到相关内容');
        }
        
        $methods = explode('@', $request->get('m'));
        if (count($methods) <= 1) {
            $this->err('找不到相关内容');
        }
        
        $parameters = [];
        if ($request->has('p')) {
            $parameters = explode('@', $request->get('p'));
            if (count($methods) != count($parameters)) {
                $this->err('非法参数数量');
            }
        }
        
        
    }
}