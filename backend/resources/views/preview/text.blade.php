<div class="element" id="element-{{$element_id}}"
  @if( isset($element['fixedScrollPx']) &&  $element['fixedScrollPx'] ) fixed="{{$element['fixedScrollPx']}}" @endif
>
  {!! $element['content'] !!}
</div>