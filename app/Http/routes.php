<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
App::setLocale('zh-CN');
$zone = "testauth";
// 测试页面
Route::group(['prefix' => $zone, 'as' => $zone] ,function() {
    // 注册
    Route::get('register', ['as' => '.register', 'uses' => 'Auth\AuthController@getRegister']);
    // 登录 
    Route::get('login', ['as' => '.login', 'uses' => 'Auth\AuthController@getLogin']);
    // 忘记密码
    Route::get('forget', ['as' => '.forget', 'uses' => 'Auth\PasswordController@getEmail']);
    // 重设密码
    Route::get('password/reset/{token}', ['as' => '.password.reset', 'uses' => 'Auth\PasswordController@getReset']);     
});


$zone = "auth";
Route::group(['prefix'=> $zone, 'as' => $zone, 'namespace' => ucwords($zone)], function(){   
    // 获取csrf
    Route::get('csrf_token', function(){
       return response()->json(['csrf_token' => csrf_token()]); 
    });
    // 注册
    Route::post('register', ['as' => '.register.post', 'uses' => 'AuthController@postRegister']);
    // 激活
    Route::get('active/{token}', ['as' => '.active', 'uses' => 'AuthController@getActive']);
    // 忘记密码
    Route::post('forget', ['as' => '.forget.post', 'uses' => 'PasswordController@postEmail']);
    // 重设密码
    Route::post('password/reset', ['as' => '.password.reset.post', 'uses' => 'PasswordController@postReset']);  
    // 获取access_token
    Route::post('access_token', ['as' => '.access_token', 'uses' => function() {
        return response()->json(Authorizer::issueAccessToken());
    }]);
});

Route::get('/', function () {    
    return view('welcome');
});

Blade::setContentTags('[[', ']]');        // for variables and all things Blade
Blade::setEscapedContentTags('[!!', '!!]');   // for escaped data