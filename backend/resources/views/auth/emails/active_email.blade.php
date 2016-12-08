@extends('email.master')

@section('content')
  <p>正在为您的聚页账户验证邮箱地址，请点击下面的链接：</p>
  <div style="border-radius: 4px; background-color: #3E606F;">
    <a href="{{ url('/api/auth/active/'.$token) }}" style="color: #fff; font-size:18px; padding: 9px 21px; text-decoration: none;">
      验证我的邮箱地址
    </a>
  </div>
@endsection
