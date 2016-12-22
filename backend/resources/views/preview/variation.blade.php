<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=360,minimum-scale=0.5, maximum-scale=5, user-scalable=yes">
  <meta name="renderer" content="webkit">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{$content['settings']['seo']['pageTitle']}}</title>
  <meta name="keywords" content="{{$content['settings']['seo']['keywords']}}">
  <meta name="description" content="{{$content['settings']['seo']['description']}}">
  <link href="//app.ujupage.com/css/bootstrap.css" rel="stylesheet">
  <script src="//app.ujupage.com/js/libs/jquery-1.12.3.min.js"></script>
  <script src="//app.ujupage.com/js/page.js?20161215"></script>
  <!-- <script src="/js/page.js"></script> -->
  @if ($content['settings']['hasmap'])
  <script src="http://webapi.amap.com/maps?v=1.3&key=e3b78e84d1aedba49bc8a84c4e113e01&plugin=AMap.Scale,AMap.OverView,AMap.ToolBar"></script>
  @endif
  @if ($content['settings']['hasswiper'])
  <script src="//app.ujupage.com/js/swiper.js?20161215"></script>
  <!-- <script src="/js/swiper.js"></script> -->
  @endif
  <script>
    {!! $content['settings']['code']['header'] !!}
  </script>
<style>

  body{
    min-width: 960px;
    font-size:16px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  #container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  label{
    font-weight: normal;
  }

  label.error{
    color:#900!important;
    padding: 6px 12px 0;
  }

  #content{
    position: absolute;
    width: 960px;
    top: 0;
    left: 50%;
    margin-left: -480px;
  }

  .section-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .element {
    position: absolute;
    word-wrap: break-word;
  }

  .element p {
    margin: 0;
  }

  .element-button {
    padding: 6px;
    text-align: center;
    width: 100%;
    height: auto;
  }

  .element-button-image {
    max-width: 100%;
  }

  .element-button a {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .element-image {
    width:100%;
    height:auto;
  }

  .form-group {
    position: relative;
  }

  .form-field-input {
    font-size: 16px;
    height: 40px;
    line-height: 20px;
    padding: 4px 10px;
  }

  .label-inside {
    position: absolute;
    font-weight: normal;
    top:9px;
    left:11px;
    font-size:16px;
  }

  .options-inline {
    display: inline-block;
    margin-right: 10px;
  }

  .msg-mask {
    position: fixed;
    z-index: 100001;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
  }

  .msg-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .msg-content {
    position: relative;
    width: 300px;
    margin:0 auto;
    background-color: #fff;
    padding: 50px 0;
    text-align: center;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .msg-close {
    position: absolute;
    right:8px;
    top:5px;
  }

  @foreach($content['style']['common'] as $el => $styles)
    #{{$el}}{
      @foreach($styles as $key => $value)
        {{$key}}:{{$value}};
      @endforeach
    }
  @endforeach

  @foreach($content['style']['pc'] as $el => $styles)
    #{{$el}}{
      @foreach($styles as $key => $value)
        {{$key}}:{{$value}};
      @endforeach
    }
  @endforeach
@media
screen and (max-width: 620px),
screen and (max-width: 999px) and (-webkit-min-device-pixel-ratio: 1.5) and ( max-device-width: 1280px ) and (max-device-height: 720px),
screen and (max-width: 999px) and (-webkit-min-device-pixel-ratio: 1.5) and ( max-device-width: 1000px )
{
  body{
    min-width: 360px;
  }

  #content{
    width: 360px;
    margin-left:-180px;
  }

  .section-inner{
    width: 360px;
  }

  @foreach($content['style']['mobile'] as $class => $styles)
    #{{$class}}{
      @foreach($styles as $key => $value)
      {{$key}}:{{$value}};
      @endforeach
    }
  @endforeach

}
</style>
</head>
<body>
<div id="container">
@foreach($content['sections'] as $section_id => $section)
<div class="section" id="section-{{$section_id}}">
  <div class="section-inner">
  
  </div>
</div>
@endforeach

<div id="content">
  @foreach($content['elements'] as $element_id => $element)
    @include('preview.'.$element['type'])
  @endforeach
</div>

<div class="msg-mask" style="display:none">
  <div class="msg-wrapper">
    <div class="msg-content">
      <button type="button" class="close msg-close" aria-label="Close"><span aria-hidden="true">×</span></button>
      <div class="msg-body"></div>
    </div>
  </div>
</div>
</div>
  <script>
    JuyeTracker.init({{$content['variation']['page_id']}}, {{$content['variation']['id']}});
  </script>
  <script>
    {!! $content['settings']['code']['bodyIn'] !!}
  </script>
</body>
  <script>
    {!! $content['settings']['code']['bodyOut'] !!}
  </script>
</html>