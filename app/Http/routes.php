<?php
// --------------------------------测试表单-------------------------------------
// 
Route::get('/', function(){
   return view('welcome'); 
});
$zone = 'auth';
Route::group(['prefix' => $zone, 'as' => $zone , 'namespace' => ucwords($zone), 'middleware' => 'web'] ,function() {
    // 注册
    Route::get('register', ['as' => '.register', 'uses' => 'AuthController@getRegister']);
    // 登录 
    Route::get('login', ['as' => '.login', 'uses' => 'AuthController@getLogin']);
    // 忘记密码
    Route::get('forget', ['as' => '.forget', 'uses' => 'PasswordController@getEmail']);
    // 登出
    Route::get('logout', ['as' => '.logout', 'uses' => 'AuthController@getLogout']);
    // 重设密码
    Route::get('password/reset/{token}', ['as' => '.password.reset', 'uses' => 'PasswordController@getReset']);     
});
// --------------------------------测试表单-------------------------------------

$zone = 'oauth';
Route::group(['prefix'=> $zone, 'as' => $zone], function(){   
    // 获取csrf
    Route::get('csrf_token', function(){
       return response()->json(['csrf_token' => csrf_token()]); 
    });
    // 登录 
    Route::post('login', ['as' => '.login.post', 'uses' => 'Auth\AuthController@postLogin']);
    // 注册
    Route::post('register', ['as' => '.register.post', 'uses' => 'Auth\AuthController@postRegister']);
    // 激活
    Route::get('active/{token}', ['as' => '.active', 'uses' => 'Auth\AuthController@getActive']);
    // 忘记密码
    Route::post('forget', ['as' => '.forget.post', 'uses' => 'Auth\PasswordController@postEmail']);
    // 重设密码
    Route::post('password/reset', ['as' => '.password.reset.post', 'uses' => 'Auth\PasswordController@postReset']);  
    // 获取access_token
    /*
    Route::post('access_token', ['as' => '.access_token', 'uses' => function() {
        return response()->json(Authorizer::issueAccessToken());
    }]);
     */
});

$zone = 'editor';
Route::group(['prefix'=> $zone, 'as' => $zone, 'namespace' => ucwords($zone), 'middleware' => 'auth'], function(){   
    
    Route::get('v1', ['as' => '.v1', 'uses' => 'EditorController@v1']);
    Route::any('api', ['as' => '.api', 'uses' => 'ApiController@dispatch']);
    
    Route::group(['prefix'=>'image', 'as' => '.image'], function(){        
        // 图片列表        
        Route::get('list/{dirname?}/{page?}/{page_size?}', ['as' => '.list', 'uses' => 'ImageController@getIndex']);
        // 创建文件夹
        Route::get('dir', ['as' => '.dir', 'uses' => 'ImageController@dir']);
        // 创建文件夹
        Route::get('mkdir/{dirname}', ['as' => '.mkdir', 'uses' => 'ImageController@mkdir']);
        // 修改文件夹
        Route::get('moddir/{dirname}/{mod_dirname}', ['as' => '.moddir', 'uses' => 'ImageController@moddir']);
        // 删除文件夹
        Route::get('deldir/{dirname}', ['as' => '.deldir', 'uses' => 'ImageController@deldir']);
        // 上传图片
        Route::post('upload', ['as' => '.upload', 'uses' => 'ImageController@upload']);
        // 修改图片信息
        Route::post('modimage', ['as' => '.modimage', 'uses' => 'ImageController@modimage']);
        // 删除图片
        Route::get('delimage/{id}', ['as' => '.delimage', 'uses' => 'ImageController@delimage']);
    });
});


Blade::setContentTags('[[', ']]');        // for variables and all things Blade
Blade::setEscapedContentTags('[!!', '!!]');   // for escaped data