<html>
    <head>
        <title>忘记密码</title>
    </head>
    <body>
        
        <form action="[[route('oauth.forget.post')]]" method="post">
            [[csrf_field()]]
            
            <input type="text" name="email" value="" placeholder="邮箱"/>
            
            <input type="submit" value="确定"/>  
        </form>
    </body>
</html>