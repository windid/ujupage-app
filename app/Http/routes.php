<?php
// --------------------------------测试表单-------------------------------------
// 
Route::get('/', function(){
   return view('welcome'); 
});
// 表单测试获取 csrf_token
Route::get('csrf_token', function(){
    return csrf_token();
});

$zone = 'auth';
Route::group(['prefix' => $zone, 'as' => $zone , 'namespace' => ucwords($zone), 'middleware' => 'web'] ,function() {
    // 注册
    Route::get('register/{i?}', ['as' => '.register', 'uses' => 'AuthController@getRegister'])->where('i', '[0-9a-zA-Z]+');
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
    
    Route::get('/{id}', ['as' => '.index', 'uses' => 'EditorController@index'])->where('id', '[0-9]+');
    // 预览        
    Route::get('preview/variation/{id}', ['as' => '.previewVariation', 'uses' => 'EditorController@previewVariation'])->where('id', '[0-9]+');
    Route::get('preview/{id}/{variation_id?}', ['as' => '.preview', 'uses' => 'EditorController@preview'])->where('id', '[0-9]+');
    
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
        Route::get('list/{project_id}/{dirname?}/{page?}/{page_size?}', ['as' => '.list', 'uses' => 'ImageController@getIndex']);
        // 文件夹列表
        Route::get('dir/{project_id}', ['as' => '.dir', 'uses' => 'ImageController@dir']);
        // 创建文件夹
        Route::get('mkdir/{project_id}/{dirname}', ['as' => '.mkdir', 'uses' => 'ImageController@mkdir']);
        // 修改文件夹
        Route::get('moddir/{project_id}/{dirname}/{mod_dirname}', ['as' => '.moddir', 'uses' => 'ImageController@moddir']);
        // 删除文件夹
        Route::get('deldir/{project_id}/{dirname}', ['as' => '.deldir', 'uses' => 'ImageController@deldir']);
        // 上传图片
        Route::post('upload', ['as' => '.upload', 'uses' => 'ImageController@upload']);
        // 修改图片信息
        Route::post('modimage', ['as' => '.modimage', 'uses' => 'ImageController@modimage']);
        // 删除图片
        Route::get('delimage/{project_id}/{id}', ['as' => '.delimage', 'uses' => 'ImageController@delimage'])->where('id', '[0-9]+');
    });
    
    Route::group(['prefix'=>'page', 'as' => '.page'], function(){        
        // 保存设置        
        Route::post('savesetting', ['as' => '.savesetting', 'uses' => 'PageController@savesetting']);
        
        /*
         * PageController
         */        
        // 发布页面
        Route::get('publish/{id}', ['as' => '.issue', 'uses' => 'PageController@publish']);
        // 修改url
        Route::get('modurl/{id}/{url}', ['as' => '.modurl', 'uses' => 'PageController@modurl']);
                
        /**
         * PageVariationController
         */
        // 加载        
        Route::get('variation/{id}', ['as' => '.initpage', 'uses' => 'PageVariationController@start'])->where('id', '[0-9]+');
        // 保存版本        
        Route::post('variation/save', ['as' => '.save', 'uses' => 'PageVariationController@save']);
        // 删除版本
        Route::get('variation/remove/{id}', ['as' => '.remove', 'uses' => 'PageVariationController@remove'])->where('id', '[0-9]+');
        // 复制版本
        Route::get('variation/duplicate/{id}', ['as' => '.duplicate', 'uses' => 'PageVariationController@duplicate'])->where('id', '[0-9]+');
        // 新建版本
        Route::get('variation/create/{page_id}', ['as' => '.create', 'uses' => 'PageVariationController@create'])->where('page_id', '[0-9]+');
        // 修改版本名
        Route::post('variation/rename', ['as' => '.rename', 'uses' => 'PageVariationController@rename']);
    });
});

$zone = 'dashboard';
Route::group(['prefix'=> $zone, 'as' => $zone, 'namespace' => ucwords($zone), 'middleware' => 'auth'], function(){   
    
    Route::get('/', ['as' => '.index', 'uses' => 'DashboardController@index']);
    
    Route::group(['prefix'=>'project', 'as' => '.project'], function(){
        // 项目列表
        Route::get('get', ['as' => '.get', 'uses' => 'ProjectController@get']);
        
        // 添加项目
        Route::post('add', ['as' => '.add', 'uses' => 'ProjectController@add']);
        // 修改项目
        Route::post('mod', ['as' => '.mod', 'uses' => 'ProjectController@mod']);
        // 删除项目
        Route::get('remove/{id}', ['as' => '.remove', 'uses' => 'ProjectController@remove'])->where('id', '[0-9]+');
        
        // 协作人
        Route::group(['prefix'=>'members', 'as' => '.invite'], function(){
            // 查看该项目的协作人
            Route::get('get/{project_id}', ['as' => '.get', 'uses' => 'InviteController@get'])->where('project_id', '[0-9]+');
            // 删除指定的协作人
            Route::get('remove/{project_id}/{user_id}', ['as' => '.remove', 'uses' => 'InviteController@remove'])
                    ->where(['project_id' => '[0-9]+', 'user_id' => '[0-9]+']);
            // 退出协作
            Route::get('quit/{project_id}', ['as' => '.quit', 'uses' => 'InviteController@quit'])->where('project_id', '[0-9]+');
            // 发邮件通知邀请协作
            Route::post('join', ['as' => '.join', 'uses' => 'InviteController@join']);
        });
    });
    
    Route::group(['prefix'=>'pagegroup', 'as' => '.pagegroup'], function(){
        // 分组列表
        Route::get('get/{id}', ['as' => '.get', 'uses' => 'PageGroupController@get'])->where('id', '[0-9]+');
        
        // 添加分组
        Route::post('add', ['as' => '.add', 'uses' => 'PageGroupController@add']);
        // 修改分组
        Route::post('mod', ['as' => '.mod', 'uses' => 'PageGroupController@mod']);
        // 删除分组
        Route::get('remove/{id}', ['as' => '.remove', 'uses' => 'PageGroupController@remove'])->where('id', '[0-9]+');
    });
    
    Route::group(['prefix'=>'page', 'as' => '.page'], function(){
        // 页面列表
        Route::get('get/{id}', ['as' => '.get', 'uses' => 'PageController@get'])->where('id', '[0-9]+');
        // 单个页面
        Route::get('one/{id}', ['as' => '.one', 'uses' => 'PageController@one'])->where('id', '[0-9]+');

        // 添加页面
        Route::post('add', ['as' => '.add', 'uses' => 'PageController@add']);
        // 添加页面
        Route::get('copy/{id}', ['as' => '.copy', 'uses' => 'PageController@copy'])->where('id', '[0-9]+');
        // 修改页面
        Route::post('mod', ['as' => '.mod', 'uses' => 'PageController@mod']);
        // 删除页面
        Route::get('remove/{id}', ['as' => '.remove', 'uses' => 'PageController@remove'])->where('id', '[0-9]+');
    });
    
    
});
