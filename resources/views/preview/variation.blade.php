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
  <link href="{{asset('css/bootstrap.css')}}" rel="stylesheet">
  <script src="{{asset('js/libs/jquery-1.12.3.min.js')}}"></script>
  <script src="{{asset('js/page.js')}}"></script>
<style>

  body{
    min-width: 960px;
    font-size:16px;
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

  .section-inner{
    position: relative;
    width: 960px;
    margin:0 auto;
  }

  .element{
    position: absolute;
    word-wrap: break-word;
  }

  .element-button{
    padding:6px;
    text-align: center;
    border-width: 2px;
    width: 100%
  }

  .element-button a{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .element-image{
    width:100%;
    height:auto;
  }

  .form-group{
    position: relative;
  }

  .form-field-input{
    font-size: 16px;
    height: 40px;
    line-height: 20px;
    padding: 4px 10px;
  }

  .label-inside{
    position: absolute;
    font-weight: normal;
    top:9px;
    left:11px;
    font-size:16px;
  }

  .options-inline{
    display: inline-block;
    margin-right:10px;
  }

  @foreach($content['style']['common'] as $class => $styles)
    #{{$class}}{
      @foreach($styles as $key => $value)
      {{$key}}:{{$value}};
      @endforeach
    }
  @endforeach

  @foreach($content['style']['pc'] as $class => $styles)
    #{{$class}}{
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

</body>
</html>