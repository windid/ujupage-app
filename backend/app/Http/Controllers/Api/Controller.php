<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use \Illuminate\Contracts\Validation\Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    public function err(string $msg = '错误', $code = 500) {
        return response()->json(array_merge(['err' => $msg], ['result' => 'false']), $code);
    }
    
    public function dump(array $merge = []) {
        $merge = array_merge($merge, ['result' => 'true']);
        
        return response()->json($merge, 200, []);
    }
    
    public function errorValidation(Validator $validator) {
        return response()->json(['error' => $validator->errors()->getMessages()], 422);
    }
    
    public function errorGone() {
        return response()->json(['error' => 'gone'], 410);
    }
    
    public function errorInvalidRequest() {
        return response()->json(['error' => 'invalid request'], 400);
    }
    
    public function errorNotFound() {
        return response()->json(['error' => 'not found'], 404);
    }
    
    public function errorUnauthorized() {
        return response()->json(['error' => 'unauthorized'], 401);
    }
    
    public function successCreated($data = []) {
        return response()->json($data, 201);
    }    
    public function successOK($data = []) {
        return response()->json($data, 200);
    }    
    public function successNoConnect($data = []) {
        return response()->json($data, 204);
    }    
}
