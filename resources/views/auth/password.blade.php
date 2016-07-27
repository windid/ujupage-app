<html>
    <head>
        <title>忘记密码</title>
    </head>
    <body>
        
        <form action="{{route('oauth.forget.post')}}" method="post">
            {{csrf_field()}}
            
            <input type="text" name="email" value="" placeholder="邮箱"/>
            
            <input type="submit" value="确定"/>  
            
            <br />
            @foreach ($errors->all() as $v)            
            {{$v}} <br/>
            @endforeach
            </font>
            
            @if (session('status'))
                <font style="color:green;">
                    {{ session('status') }}
                </font>
            @endif
        </form>
    </body>
</html>