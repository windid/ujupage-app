@extends('auth.emails.email')

@section('content')
  <p>「<strong>{{$user}}</strong>」在聚页上邀请您参与「{{$project['name']}}」的协作，点击下面的按钮加入该项目：</p>
  <div style="display:inline-block; border-radius: 4px; background-color: #3E606F; padding: 6px 21px;">
    <a href="{{ url('register/?token='.$i.'&email='.$email) }}" style="color: #fff; font-size:16px; text-decoration: none;">
      注册聚页帐号并加入项目
    </a>
  </div>
  <p style="color:#999">聚页是一个专业的营销落地页制作工具。通过它，您可以快速设计制作并发布您基于HTML5的营销落地页。</p>
@endsection
