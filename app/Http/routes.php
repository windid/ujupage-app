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
    // 预览        
    Route::get('preview/{id}', ['as' => '.preview', 'uses' => 'EditorController@preview']);
    
    // API接口分配
    // m=editor_images@editor_upload
    // p=urlencode(base64_encode(param1))_urlencode(base64_encode(param2))_urlencode(base64_encode(param3))@
    /**
     * @param string $m {Editor}Json类的{images}的方法和{Editor}Json类的{upload}的方法，以“@”分隔
     * @param string $p 用“@”分隔对应“m”参数的类方法， 每个参数都以base64+url进行编码并且以“_”分隔（如无参数也可以忽略该“p”参数）
     * 
     */
    //Route::any('api', ['as' => '.api', 'uses' => 'EditorController@api']);
    
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
    
    Route::group(['prefix'=>'page', 'as' => '.page'], function(){        
        // 加载        
        Route::get('initpage/{id}', ['as' => '.initpage', 'uses' => 'PageController@initpage']);
        // 保存版本        
        Route::post('save', ['as' => '.save', 'uses' => 'PageController@save']);
        // 保存设置        
        Route::post('savesetting', ['as' => '.savesetting', 'uses' => 'PageController@savesetting']);
    });
});


Blade::setContentTags('[[', ']]');        // for variables and all things Blade
Blade::setEscapedContentTags('[!!', '!!]');   // for escaped data