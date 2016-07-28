<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="renderer" content="webkit">
  <meta name="force-rendering" content="webkit">
  <title>控制面板 - 聚页</title>
  <link href="{{asset('css/bootstrap.css')}}" rel="stylesheet">
  <link href="{{asset('css/global.css')}}" rel="stylesheet">

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

<div id="page">
  <common-header></common-header>
  <div id="main-wrapper">
    <div id="main">
      <sidebar></sidebar>
      <div id="content">
        <div class="page-item">
          <span class="glyphicon glyphicon-plus"></span>
        </div>
        <div class="page-item">
          <div class="page-item-header">
            <a href="./editor">这是一个测试用的页面名称啊</a>
          </div>
          <div class="page-item-body"></div>
          <div class="page-item-footer">
            <div class="btn-group fr">
              <div class="btn btn-default btn-sm">商机 <span class="glyphicon glyphicon-user"></span></div>
              <div class="btn btn-default btn-sm">分析 <span class="glyphicon glyphicon-signal"></span></div>
              <div class="btn btn-default btn-sm"><span class="glyphicon glyphicon-cog"></span> <span class="caret"></span></div>
            </div>
          </div>
        </div>
        <div class="page-item">
          <div class="page-item-header">
            <a href="./editor">这是一个测试用的页面名称啊</a>
          </div>
          <div class="page-item-body"></div>
          <div class="page-item-footer">
            <div class="btn-group fr">
              <div class="btn btn-default btn-sm">商机 <span class="glyphicon glyphicon-user"></span></div>
              <div class="btn btn-default btn-sm">分析 <span class="glyphicon glyphicon-signal"></span></div>
              <div class="btn btn-default btn-sm"><span class="glyphicon glyphicon-cog"></span> <span class="caret"></span></div>
            </div>
          </div>
        </div>
        <div class="page-item">
          <div class="page-item-header">
            <a href="./editor">test</a>
          </div>
          <div class="page-item-body"></div>
          <div class="page-item-footer">
            <div class="btn-group fr">
              <div class="btn btn-default btn-sm">商机 <span class="glyphicon glyphicon-user"></span></div>
              <div class="btn btn-default btn-sm">分析 <span class="glyphicon glyphicon-signal"></span></div>
              <div class="btn btn-default btn-sm"><span class="glyphicon glyphicon-cog"></span> <span class="caret"></span></div>
            </div>
          </div>
        </div>
        <div class="page-item">
          <div class="page-item-header">
            <a href="./editor">哈哈</a>
          </div>
          <div class="page-item-body"></div>
          <div class="page-item-footer">
            <div class="btn-group fr">
              <div class="btn btn-default btn-sm">商机 <span class="glyphicon glyphicon-user"></span></div>
              <div class="btn btn-default btn-sm">分析 <span class="glyphicon glyphicon-signal"></span></div>
              <div class="btn btn-default btn-sm"><span class="glyphicon glyphicon-cog"></span> <span class="caret"></span></div>
            </div>
          </div>
        </div>
        <div class="page-item">
          <div class="page-item-header">
            <a href="./editor">这是一个测试用的页面名称啊</a>
          </div>
          <div class="page-item-body"></div>
          <div class="page-item-footer">
            <div class="btn-group fr">
              <div class="btn btn-default btn-sm">商机 <span class="glyphicon glyphicon-user"></span></div>
              <div class="btn btn-default btn-sm">分析 <span class="glyphicon glyphicon-signal"></span></div>
              <div class="btn btn-default btn-sm"><span class="glyphicon glyphicon-cog"></span> <span class="caret"></span></div>
            </div>
          </div>
        </div>
        <div class="page-item">
          <div class="page-item-header">
            <a href="./editor">这是一个测试用的页面名称啊</a>
          </div>
          <div class="page-item-body"></div>
          <div class="page-item-footer">
            <div class="btn-group fr">
              <div class="btn btn-default btn-sm">商机 <span class="glyphicon glyphicon-user"></span></div>
              <div class="btn btn-default btn-sm">分析 <span class="glyphicon glyphicon-signal"></span></div>
              <div class="btn btn-default btn-sm"><span class="glyphicon glyphicon-cog"></span> <span class="caret"></span></div>
            </div>
          </div>
        </div>




      </div>
    </div> 
  </div>

</div>

  <script src="{{asset('js/libs/vue-2.0.js')}}"></script>
  <script src="{{asset('js/dashboard.js')}}"></script>
</body>

</html>