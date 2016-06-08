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

$zone = 'auth';
Route::group(['prefix' => $zone, 'as' => $zone , 'namespace' => ucwords($zone)] ,function() {
   
    // 登录 
    Route::get('login', ['as' => '.login', 'uses' => 'AuthController@getLogin']);
    Route::post('login', ['as' => '.login.post', 'uses' => 'AuthController@postLogin']);
    
    // 注册
    Route::get('register', ['as' => '.register', 'uses' => 'AuthController@getRegister']);
    Route::post('register', ['as' => '.register.post', 'uses' => 'AuthController@postRegister']);
    // 激活
    Route::get('active/{token}', ['as' => '.active', 'uses' => 'AuthController@getActive']);
    
    // 退出
    Route::get('logout', ['as' => '.logout', 'uses' => 'AuthController@getLogout']);
    
    // 忘记密码
    Route::get('forget', ['as' => '.forget', 'uses' => 'PasswordController@getEmail']);
    Route::post('forget', ['as' => '.forget.post', 'uses' => 'PasswordController@postEmail']);
    
    // 重设密码
    Route::get('password/reset/{token}', ['as' => '.password.reset', 'uses' => 'PasswordController@getReset']);
    Route::post('password/reset', ['as' => '.password.reset.post', 'uses' => 'PasswordController@postReset']);      
});

Route::get('/', function () {
    return view('welcome');
});

Route::get('editor', function () {
    return view('editor');
});

Blade::setContentTags('[[', ']]');        // for variables and all things Blade
Blade::setEscapedContentTags('[!!', '!!]');   // for escaped data