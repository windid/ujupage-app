<?php

namespace App\Http\Controllers\Editor;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Request;

class EditorController extends Controller {

    public $user;

    public function __construct() {
        $this->user = auth()->user();
    }

    public function v1() {
        return view('editor');
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
