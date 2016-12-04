<div class="element element-button" id="element-{{$element_id}}"
  @if( isset($element['fixedScrollPx']) &&  $element['fixedScrollPx'] ) fixed="{{$element['fixedScrollPx']}}" @endif
>
@if( isset($element['link']['url']) &&  $element['link']['url'] )
  <a href="{{$element['link']['url']}}" @if($element['link']['isNewTab']) target="_blank" @endif @if(isset($element['link']['goal'])) data-goal="1" @endif></a>
  <span>{{$element['text']}}</span>
@else
  <span>{{$element['text']}}</span>
@endif
</div>