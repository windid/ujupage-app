@extends('auth.master')

@section('title', '密码修改')

@section('content')

@if (session('status'))
    <p class="bg-success auth-info">密码修改成功，您现在可以使用新密码<a href="./login">登陆</a>。</p>
@endif

<form action="{{route('oauth.password.reset.post')}}" method="post">
    {{csrf_field()}}
    <input type="hidden" name="token" value="{{$token}}" />
    <p>帐号：{{$email}}</p>
    <input type="hidden" name="email" value="{{$email}}" placeholder="邮箱"/>
    <div class="form-group">
        <input class="form-control input-lg" type="password" name="password" value="{{old('password')}}" placeholder="新密码"/>
    </div> 
    <div class="form-group">
        <input class="form-control input-lg" type="password" name="password_confirmation" value="{{old('password_confirmation')}}" placeholder="确认新密码"/>
    </div> 
    
    @foreach ($errors->all() as $v)            
    <p class="text-danger">{{$v}}</p>
    @endforeach

    <div class="form-group">
        <input type="submit" value="修改密码" class="btn btn-primary btn-lg form-control input-lg" />  
    </div>
</form>
@endsection