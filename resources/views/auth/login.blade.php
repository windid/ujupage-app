<html>
    <head>
        <title>登录</title>
    </head>
    <body>
        
        <form action="[[route('auth.login.post')]]" method="post">
            [[csrf_field()]]
            
            <input type="text" name="email" value="" placeholder="邮箱"/>
            <input type="password" name="password" value="" placeholder="密码"/>
            
            <br />
            <font style="color:red;">
            @foreach ($errors->all() as $v)            
            [[$v]] <br/>
            @endforeach
            </font>
            <input type="submit" value="登录"/>  
        </form>
    </body>
</html>