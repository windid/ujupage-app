<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="renderer" content="webkit">
  <meta name="force-rendering" content="webkit">
  <title>@yield('title') - 聚页</title>
  <link href="{{asset('css/bootstrap.css')}}" rel="stylesheet">
  <link href="{{asset('css/auth.css')}}" rel="stylesheet">
  <script src="{{asset('js/libs/jquery-1.12.3.min.js')}}"></script>
</head>
<body>

<div class="auth-container">
  <div class="auth-header">
    @yield('title')
  </div>
  <div class="auth-content">
    @yield('content')
  </div>
</div>
<div class="auth-extra">
  @yield('extra')
</div>

</body>
</html>