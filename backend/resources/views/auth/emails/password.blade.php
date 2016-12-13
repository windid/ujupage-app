@extends('auth.emails.email')

@section('content')
  <p>您在聚页上进行了重置密码的操作，如果不是您本人进行的操作，请忽略本邮件。</p>
  <div style="display:inline-block; border-radius: 4px; background-color: #3E606F; padding: 6px 21px;">
    <a href="{{ url('resetpassword/'.$token) }}" style="color: #fff; font-size:16px; text-decoration: none;">
      点击这里重设密码
    </a>
  </div>
@endsection
