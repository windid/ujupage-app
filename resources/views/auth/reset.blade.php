@extends('auth.master')

@section('title', '密码修改')

@section('content')
<form action="{{route('oauth.password.reset.post')}}" method="post">
    {{csrf_field()}}
    <input type="hidden" name="token" value="{{$token}}" />
    <p>帐号：{{$email}}</p>
    <input type="hidden" name="email" value="{{$email}}" placeholder="邮箱"/>
    <div class="form-group">
        <input class="form-control input-lg" type="password" name="password" value="{{old('password')}}" placeholder="新密码"/>
    </div> 
    <div class="form-group">
        <input class="form-control input-lg" type="password" name="password" value="{{old('password_confirmation')}}" placeholder="确认新密码"/>
    </div> 
    
    @foreach ($errors->all() as $v)            
    <p class="text-danger">{{$v}}</p>
    @endforeach
    
    @if (session('status'))
        <font style="color:green;">
            {{ session('status') }}
        </font>
    @endif
    <div class="form-group">
        <input type="submit" value="修改密码" class="btn btn-primary btn-lg form-control input-lg" />  
    </div>
</form>
@endsection