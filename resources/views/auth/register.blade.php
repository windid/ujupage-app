<html>
    <head>
        <title>注册</title>
    </head>
    <body>
        
        <form action="[[route('auth.register.post')]]" method="post">
            [[csrf_field()]]
            
            <input type="text" name="name" value="[[old('name')]]" placeholder="名称"/>
            <input type="text" name="email" value="[[old('email')]]" placeholder="邮箱"/>
            <input type="password" name="password" value="[[old('password')]]" placeholder="密码"/>
            <input type="password" name="password_confirmation" value="[[old('password_confirmation')]]" placeholder="确认密码"/>
            
            <br />
            <font style="color:red;">
            @foreach ($errors->all() as $v)            
            [[$v]] <br/>
            @endforeach
            </font>
            <input type="submit" value="注册"/>            
        </form>
    </body>
</html>