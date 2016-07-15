<?php

namespace App\Http\Json;

class Jsons {
        
    public function err(string $msg = '错误') {
        return response()->json(['err' => $msg])->content();
    }
    
    public function dump(array $data = []) {
        return response()->json($data)->content();
    }
}