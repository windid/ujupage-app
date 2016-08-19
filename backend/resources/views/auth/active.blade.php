@extends('auth.master')

@section('title', '账户激活')

@section('content')
	@if ($result)
		<p class="bg-success auth-info">激活成功，<a href="./login">立即登陆</a>开始尽情使用吧。</p>
	@else 
		<p class="bg-danger auth-info">{{$error}}</p>
	    
	@endif
	
@endsection

