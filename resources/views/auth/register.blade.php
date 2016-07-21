<html>
    <head>
        <title>注册</title>
    </head>
    <body>
        
        <form action="{{route('oauth.register.post')}}" method="post">
            {{csrf_field()}}
            
            <input type="text" name="name" value="{{old('name')}}" placeholder="名称"/>
            <input type="text" name="email" value="{{old('email')}}" placeholder="邮箱"/>
            <input type="password" name="password" value="{{old('password')}}" placeholder="密码"/>
            <input type="password" name="password_confirmation" value="{{old('password_confirmation')}}" placeholder="确认密码"/>
            <input type="hidden" name="grant_type" value="password" />
            <input type="hidden" name="client_id" value="1" />
            <input type="hidden" name="client_secret" value="a16a85d0e7593b970f53e3de6bdd960f" />
            
            <br />
            <font style="color:red;">
            @if (isset($errors))
            @foreach ($errors->all() as $v)            
            {{$v}} <br/>
            @endforeach
            @endif
            </font>
            <input type="submit" value="注册"/>            
        </form>
    </body>
</html>