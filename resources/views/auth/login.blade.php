<html>
    <head>
        <title>登录</title>
    </head>
    <body>
        
        <form action="[[route('auth.access_token')]]" method="post">
            [[csrf_field()]]
            
            <input type="text" name="username" value="" placeholder="邮箱"/>
            <input type="password" name="password" value="" placeholder="密码"/>
            <input type="hidden" name="grant_type" value="password" />
            <input type="hidden" name="client_id" value="1" />
            <input type="hidden" name="client_secret" value="a16a85d0e7593b970f53e3de6bdd960f" />
            
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