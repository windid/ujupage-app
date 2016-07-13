<html>
    <head>
        <title>重设密码</title>
    </head>
    <body>
        
        <form action="[[route('oauth.password.reset.post')]]" method="post">
            [[csrf_field()]]
            <input type="hidden" name="token" value="[[$token]]" />
            <input type="text" name="email" value="[[old('email')]]" placeholder="邮箱"/>
            <input type="password" name="password" value="[[old('password')]]" placeholder="密码"/>
            <input type="password" name="password_confirmation" value="[[old('password_confirmation')]]" placeholder="再一次密码"/>
            
            <br />
            <font style="color:red;">
            @foreach ($errors->all() as $v)            
            [[$v]] <br/>
            @endforeach
            </font>
            <input type="submit" value="重设密码"/>  
        </form>
    </body>
</html>