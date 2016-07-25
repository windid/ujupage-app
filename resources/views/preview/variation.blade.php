<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=360,minimum-scale=0.5, maximum-scale=5, user-scalable=no">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Editor</title>
  <link href="{{asset('css/bootstrap.css')}}" rel="stylesheet">
<style>

  @foreach($content['style']['common'] as $class => $styles)
    #{{$class}}{
      @foreach($styles as $key => $value)
      {{$key}}:{{$value}};
      @endforeach
    }
  @endforeach


  body{
    min-width: 960px;
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
  @foreach($section['elements'] as $element_id => $element)
    @include('preview.'.$element['type'])
  @endforeach
  </div>
</div>
@endforeach

@if ( Config::get('app.debug') )
  <script src="{{asset('js/libs/vue.js')}}"></script>
@else
  <script src="{{asset('js/libs/vue.min.js')}}"></script>
@endif
  <script src="{{asset('js/libs/jquery-1.12.3.min.js')}}"></script>
</body>
</html>