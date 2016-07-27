@extends('auth.master')

@section('title', '登陆')

@section('content')
<form action="{{route('oauth.login.post')}}" method="post">
    {{csrf_field()}}
    <div class="form-group">
        <input class="form-control input-lg" type="text" name="email" value="" placeholder="邮箱"/>        
    </div>
    <div class="form-group">
        <input class="form-control input-lg" type="password" name="password" value="" placeholder="密码"/>
    </div> 
    <div class="form-group">
        <label><input type="checkbox" name="remember" value="1" /> 保持我的登陆状态</label>
    </div>           
    
    @foreach ($errors->all() as $v)            
     <p class="text-danger">{{$v}}</p>
    @endforeach
    <div class="form-group">
        <input type="submit" value="登陆" class="btn btn-primary btn-lg form-control input-lg" />  
    </div>
</form>
    <div><a href="./forget">忘记密码？</a></div>
@endsection

@section('extra')
    <p>还没有聚页账户？<a href="./register">注册账户</a></p>
@endsection
