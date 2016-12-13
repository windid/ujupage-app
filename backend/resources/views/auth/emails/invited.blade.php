@extends('auth.emails.email')

@section('content')
  <p>「<strong>{{$user}}</strong>」在聚页上邀请您参与「{{$project['name']}}」的协作，点击下面的链接加入并查看该项目：</p>
  <div style="display:inline-block; border-radius: 4px; background-color: #3E606F; padding: 6px 21px;">
    <a href="{{ url('?id='.$project->id) }}" style="color: #fff; font-size:16px; text-decoration: none;">
      加入并查看项目
    </a>
  </div>
@endsection
