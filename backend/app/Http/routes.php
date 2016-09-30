<?php

Route::group(['prefix' => 'api', ['as' => 'api'], 'namespace' => 'Api'], function(){
    
    /**
     * 身份验证操作
     */
    Route::group(['prefix' => 'auth', 'as' => 'auth', 'namespace' => 'Auth', 'middleware' => 'web'], function(){    
        /**
         * POST api/auth/register 注册用户     
         * name 用户名
         * email 注册邮箱
         * password 密码
         * password_confirmation 确认密码
         * i 邀请注册码
         * @return StatusCode 201
         * @return json {
         *  id 用户ID
         *  name 用户名
         *  email 邮箱
         * }
         */
        Route::post('register', ['as' => '.register.post', 'uses' => 'AuthController@postRegister']); // 注册     
        /**
         * GET api/auth/active/{token} 激活用户     
         * token 激活码
         * @return StatusCode 201
         */
        Route::get('active/{token?}', ['as' => '.active', 'uses' => 'AuthController@getActive']); // 激活           
        /**
         * POST api/auth/password/forget 忘记密码     
         * email 邮箱
         * @return StatusCode 200
         */
        Route::post('password/forget', ['as' => '.forget.post', 'uses' => 'PasswordController@postEmail']); // 忘记密码      
        /**
         * POST api/auth/password/reset 重设密码     
         * token 重设密码Token
         * password 新密码
         * password_confirmation 确认新密码
         * @return StatusCode 201
         */
        Route::post('password/reset', ['as' => '.password.reset.post', 'uses' => 'PasswordController@postReset']); // 重设密码
        /**
         * POST api/auth/login 登录
         * email 邮箱
         * password 密码
         * @return StatusCode 201
         */
        Route::post('login', ['as' => '.login.post', 'uses' => 'AuthController@postLogin']); // 登录
        /**
         * POST api/auth/logout 退出
         * @return StatusCode 200
         */
        Route::get('logout', ['as' => '.logout', 'uses' => 'AuthController@getLogout']); //退出
    });
    
    Route::group(['middleware' => 'auth'], function(){
        
        Route::group(['namespace' => 'Project'], function(){
            /**
             * GET api/project 获取项目列表
             * @return StatusCode 200
             * @return {
             *  {
             *    id 项目ID
             *    name 项目名称
             *    is_default 是否默认项目
             *    created_at 创建时间
             *    updated_at 更新时间
             *  }
             * }
             * 
             * POST api/project 创建项目
             * name 项目名称
             * @return StatusCode 201
             * @return {
             *  id 项目ID
             *  name 项目名称
             * }
             * 
             * PUT api/project/{project_id} 修改项目
             * -- project_id 项目ID
             * name 项目名称
             * @return StatusCode 201
             * 
             * DELETE api/project/{project_id} 修改项目
             * -- project_id 项目ID
             * @return StatusCode 204
             */
            Route::resource('project', 'ProjectController');
            
            /**
             * GET api/projects/{project_id}/users 获取项目下的用户
             * -- project_id 项目ID
             * @return StatusCode 200
             * @return {
             *  {
             *    id 用户ID
             *    name 用户名
             *    email 邮箱 
             *    pivot {
             *      project_id 项目ID
             *      user_id 用户ID
             *      role 用户权限
             *    }
             *  }
             * }
             * 
             * POST api/projects/{project_id}/users 邀请用户协助项目
             * -- project_id 项目ID
             * email 邮箱
             * @return StatusCode 201
             * 
             * GET api/projects/{project_id}/users/{user_id} 查看用户
             * -- project_id 项目ID
             * -- user_id 用户ID
             * @reutrn StatusCode 200
             * @return {
             *    id 用户ID
             *    name 用户名
             *    email 邮箱 
             *    pivot {
             *      project_id 项目ID
             *      user_id 用户ID
             *      role 用户权限
             *    }
             *  }
             *              
             * DELETE api/projects/{project_id}/users/{user_id} 删除项目成员
             * -- project_id 项目ID
             * -- user_id 用户ID
             * @return StatusCode 204
             */
            Route::resource('projects.users', 'UserController');
            
            
            /**
             * GET api/projects/{project_id}/groups 获取项目下的分组
             * -- project_id 项目ID
             * @return StatusCode 200
             * @return {
             *  {
             *    id 分组ID
             *    project_id 项目ID
             *    name 分组名称
             *    is_default 是否默认
             *  }
             * }
             * 
             * POST api/projects/{project_id}/groups 创建分组
             * -- project_id 项目ID
             * name 分组名称
             * @return StatusCode 201
             * @return {
             *  id 分组ID
             *  project_id 项目ID
             *  name 分组名称
             * }
             * 
             * PUT api/projects/{project_id}/groups/{group_id} 修改分组
             * -- project_id 项目ID
             * -- group_id 分组ID
             * @reutrn StatusCode 201
             * @return {
             *    id 分组ID
             *    project_id 项目ID
             *    name 分组名称
             *    is_default 是否默认
             *  }
             *              
             * DELETE api/projects/{project_id}/groups/{group_id} 删除分组
             * -- project_id 项目ID
             * -- group_id 分组ID
             * @return StatusCode 204
             */
            Route::resource('projects.groups', 'GroupController');    
        });
        
        Route::group(['namespace' => 'Page'], function(){
            /**
             * COPY api/page/{page_id}/copy 复制页面
             * -- page_id 页面ID
             * @return {
             *   id 页面ID
             *   group_id 分组ID
             *   user_id 创建者ID
             *   name 页面名称 
             *   setting 设置
             *   url http后缀
             *   variation_history 历史版本数量
             *   created_at 创建时间
             *   updated_at 更新时间
             * }
             */
            Route::match(['copy', 'get'], 'page/{id}/copy', ['as' => '.copy', 'uses' => 'PageController@copy']);
            
            /**
             * publish api/page/{page_id}/publish 发布页面
             * -- page_id 页面ID
             * @return StatusCode 200
             */
            Route::match(['get'], 'page/{id}/publish', ['as' => '.publish', 'uses' => 'PageController@publish']);
            
            /**
             * GET api/page/ 获取所有页面
             * group_id 分组ID
             * @return StatusCode 200
             * @return {
             *  {
             *    id 页面ID
             *    group_id 分组ID
             *    user_id 创建者ID
             *    name 页面名称 
             *    setting 设置
             *    url http后缀
             *    variation_history 历史版本数量
             *    created_at 创建时间
             *    updated_at 更新时间
             *  }
             * }
             * 
             * POST api/page 创建页面
             * group_id 分组ID
             * name 页面名称
             * @return StatusCode 201
             * @return {
             *   id 页面ID
             *   group_id 分组ID
             *   user_id 创建者ID
             *   name 页面名称 
             *   setting 设置
             *   url http后缀
             *   variation_history 历史版本数量
             *   created_at 创建时间
             *   updated_at 更新时间
             * }
             * 
             * GET api/page/{page_id} 获取单个页面
             * -- page_id 页面ID
             * @return StatusCode 200
             * @return {
             *    id 页面ID
             *    project_id 项目ID
             *    group_id 分组ID
             *    user_id 创建者ID
             *    name 页面名称 
             *    setting 设置
             *    url http后缀
             *    variation_history 历史版本数量
             *    created_at 创建时间
             *    updated_at 更新时间
             * }
             * 
             * PUT api/page/{page_id} 修改页面
             * -- page_id 页面ID
             * name 页面名称
             * url http后缀
             * setting 设置
             * @reutrn StatusCode 201
             *              
             * DELETE api/page/{page_id} 删除页面
             * -- page_id 页面ID
             * @return StatusCode 204
             */
            Route::resource('page', 'PageController'); //?group_id=1
            
            /**
             * COPY api/pages/{page_id}/variations/{variation_id}/copy 复制版本
             * -- page_id 页面ID
             * -- variation_id 版本ID
             * @return {
             *   id 版本ID
             *   name 版本名称
             * }
             */
            Route::match(['copy', 'get'], 'pages/{page_id}/variations/{variation_id}/copy', ['as' => '.copy', 'uses' => 'VariationController@copy']);
            
            /**
             * GET api/pages/{page_id}/variations 获取所有版本
             * -- page_id 页面ID
             * @return StatusCode 200
             * @return {
             *  {
             *    id 页面ID
             *    name 版本名称
             *    quota 显示占比
             *  }
             * }
             * 
             * POST api/pages/{page_id}/variations 创建版本
             * -- page_id 页面ID
             * @return StatusCode 201
             * @return {
             *    id 页面ID
             *    name 版本名称
             * }
             * 
             * GET api/pages/{page_id}/variations/{variation_id} 获取单个版本
             * -- page_id 页面ID
             * -- variation_id 版本ID
             * @return StatusCode 200
             * @return {
             *    id 版本ID
             *    page_id 页面ID
             *    user_id 创建者ID
             *    name 版本名称 
             *    setting 设置
             *    html_json 页面数据
             *    html 解析后的页面代码
             *    quota 显示占比 
             *    created_at 创建时间
             *    updated_at 更新时间
             * }
             * 
             * PUT api/pages/{page_id}/variations/{variation_id} 修改版本
             * -- page_id 页面ID
             * -- variation_id 版本ID
             * name 版本名称 可选
             * htmljson 页面数据 可选
             * @reutrn StatusCode 201
             *              
             * DELETE api/pages/{page_id}/variations/{variation_id} 删除版本
             * -- page_id 页面ID
             * -- variation_id 版本ID
             * @return StatusCode 204
             */
            Route::resource('pages.variations', 'VariationController');   
        });
        
        Route::group(['namespace' => 'Report', 'prefix' => 'report'], function(){
            
            /**
            * 获取转化汇总
            * @param int $page_id
            * @param int $start_date
            * @param int $end_date
            * @return {
            *  variations: {
            *      {
            *        name 版本名称
            *        page_id
            *        variation_id
            *        total_visitors 访客总数
            *        total_conversions 转化总数
            *        cv 转化率
            *        quota 流量分配  
            *      }
            *  }
            *  gather_date: {
            *    {
            *      report_date 日期
            *      total_visitors 访客总数
            *      total_conversions 转化数
            *      cv 转化率
            *    }
            *  }
            * }
            */            
            // Route::match(['get'], 'overview/{page_id}/gather', ['as' => '.overview.gather', 'uses' => 'OverviewController@gather']);
            Route::resource('overview', 'OverviewController');
        });
        
        Route::group(['namespace' => 'Storage', 'prefix' => 'storage'], function(){
            /**
             * GET api/storage/folder 获取所有目录
             * project_id 项目ID
             * @return StatusCode 200
             * @return {
             *  {
             *    id 目录ID
             *    dirname 目录名称
             *    is_default 是否默认目录
             *    total_image 图片数量
             *  }
             * }
             * 
             * POST api/storage/folder 创建目录
             * project_id 项目ID
             * dirname 目录名称
             * @return StatusCode 201
             * @return {
             *    id 目录ID
             *    dirname 目录名称
             *    is_default 是否默认目录
             * }
             * 
             * PUT api/storage/folder/{folder_id} 修改目录
             * -- folder_id 目录ID
             * mod_dirname 目录名称
             * @reutrn StatusCode 201
             *              
             * DELETE api/storage/folder/{folder_id} 删除目录
             * -- folder_id 目录ID
             * @return StatusCode 204
             */
            Route::resource('folder', 'FolderController');
            
            /**
             * GET api/storage/image 获取所有文件
             * folder_id 目录ID
             * page 页码|1
             * page_size 每页数量|30
             * @return StatusCode 200
             * @return {
             *  current_page 当前页码
             *  total_pages 总页数
             *  total_image 总图片数量
             *  page_size 每页数量
             *  images {
             *    {
             *      id 图片ID
             *      project_id 项目ID
             *      folder_id 目录ID
             *      url 图片地址
             *      width 图片宽
             *      height 图片高
             *      name 文件名
             *      alt 文件备注
             *    }
             *  }
             * }
             * 
             * POST api/storage/image 上传文件
             * project_id 项目ID
             * dirname 目录名称
             * @return StatusCode 201
             * @return {
             *   id 图片ID
             *   project_id 项目ID
             *   folder_id 目录ID
             *   url 图片地址
             *   width 图片宽
             *   height 图片高
             *   name 文件名
             *   alt 文件备注
             * }
             * 
             * PUT api/storage/image/{image_id} 修改图片
             * -- image_id 图片ID
             * folder_id 分组ID
             * name 文件名
             * alt 图片备注
             * @reutrn StatusCode 201
             * @return {
             *   id 图片ID
             *   project_id 项目ID
             *   folder_id 目录ID
             *   url 图片地址
             *   width 图片宽
             *   height 图片高
             *   name 文件名
             *   alt 文件备注
             * }
             *              
             * DELETE api/storage/image/{image_id} 删除图片
             * -- image_id 图片ID
             * @return StatusCode 204
             */
            Route::resource('image', 'ImageController'); //?folder_id=1            
        });

        Route::group(['namespace' => 'Account'], function(){
            Route::get('account/current', 'AccountController@current');
            Route::resource('account', 'AccountController');
        });
        
        
    });
});