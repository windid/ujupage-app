@extends('auth.master')

@section('content')
  <p>正在为您的聚页账户验证邮箱地址，请点击下面的链接：</p>
  <div style="border-radius: 4px; background-color: #3E606F; color:#fff; font-size:18px; padding: 6px">
    <a href="{{ url('/api/auth/active/'.$token) }}">验证我的邮箱地址</a>
  </div>
@endsection
