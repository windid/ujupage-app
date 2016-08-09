@extends('auth.master')

@section('title', '注册')

@section('content')
<form action="{{route('oauth.register.post')}}" method="post">
    {{csrf_field()}}
    <input type="hidden" name="i" value="{{$i}}" />
    <div class="form-group">
        <input class="form-control input-lg" type="text" name="name" value="{{old('name')}}" placeholder="姓名"/>        
    </div>
    <div class="form-group">
        <input class="form-control input-lg" type="text" name="email" value="{{old('email')}}" placeholder="电子邮箱"/>        
    </div>
    <div class="form-group">
        <input class="form-control input-lg" type="password" name="password" value="{{old('password')}}" placeholder="密码"/>
    </div> 
    <div class="form-group">
        <input class="form-control input-lg" type="password" name="password_confirmation" value="{{old('password_confirmation')}}" placeholder="确认密码"/>
    </div>
    
    @foreach ($errors->all() as $v)            
     <p class="text-danger">{{$v}}</p>
    @endforeach
    <div class="form-group">
        <input type="submit" value="注册" class="btn btn-primary btn-lg form-control input-lg" />  
    </div>
</form>
<div>
    <p>*内测期间仅接受来自邮箱为@ujumedia.com的注册</p>
</div>
@endsection

@section('extra')
    <p>已经有聚页账户？<a href="./login">登陆</a></p>
@endsection
