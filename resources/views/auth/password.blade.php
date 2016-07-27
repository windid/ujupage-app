@extends('auth.master')

@section('title', '密码重设')

@section('content')
<div>
    <p class="bg-info auto-info">输入您注册时使用的电子邮箱，我们将会给您发送一封重设密码的邮件。</p>
</div>
<form action="{{route('oauth.forget.post')}}" method="post">
    {{csrf_field()}}
    <div class="form-group">
        <input class="form-control input-lg" type="text" name="email" value="" placeholder="邮箱"/>        
    </div>       
    
    @foreach ($errors->all() as $v)            
     <p class="text-danger">{{$v}}</p>
    @endforeach
    <div class="form-group">
        <input type="submit" value="密码重设" class="btn btn-primary btn-lg form-control input-lg" />  
    </div>
</form>
@endsection

@section('extra')
    <p>已经有聚页账户？<a href="./login">登陆</a></p>
@endsection
