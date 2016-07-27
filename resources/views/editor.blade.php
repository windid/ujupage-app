<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="renderer" content="webkit">
  <meta name="force-rendering" content="webkit">
  <title>{{$page['name']}} - 聚页 ujupage</title>
  <link href="{{asset('css/bootstrap.css')}}" rel="stylesheet">
  <style>
    .loading{
      width:128px;
      height:128px;
      text-align: center;
      position:absolute; 
      top:50%;
      left:50%;
      transform:translate(-50%,-50%); 
      background: url('{{asset('img/preloader.gif')}}');
    }
  </style>
</head>
<body>

<editor>
  <div class="loading"></div>
</editor>

<script>
  var _pageInfo = {
    pageId: {{$page['id']}},
    variations: [
      @foreach($page['variations'] as $variation)
      {
        id:{{$variation['id']}},
        name: "{{$variation['name']}}"
      },
      @endforeach
    ],
    url:"{{$page['url']}}"
  };
</script>

@if ( Config::get('app.debug') )
  <script src="{{asset('js/libs/vue.js')}}"></script>
@else
  <script src="{{asset('js/libs/vue.min.js')}}"></script>
@endif
  <script src="{{asset('js/libs/jquery-1.12.3.min.js')}}"></script>
  <script src="{{asset('js/editor.js')}}"></script>

</body>
</html>