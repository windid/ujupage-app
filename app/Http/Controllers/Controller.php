<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    public function err(string $msg = '错误') {
        return response()->json(array_merge(['err' => $msg], ['result' => 'false']), 500);
    }
    
    public function dump(array $merge = []) {
        return response()->json(array_merge($merge, ['result' => 'true']));
    }
}
