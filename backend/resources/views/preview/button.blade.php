<div class="element element-button" id="element-{{$element_id}}"
  @if( isset($element['fixedScrollPx']) &&  $element['fixedScrollPx'] ) fixed="{{$element['fixedScrollPx']}}" @endif
>
@if( isset($element['link']['url']) && $element['link']['url'] )
  <a href="{{$element['link']['url']}}" @if($element['link']['isNewTab']) target="_blank" @endif @if(isset($element['link']['goal'])) data-goal="1" @endif>
  @if (isset($element['image']) && $element['image'])
    <img class="element-button-image" src="{{$element['image']}}" alt="{{$element['text']}}">
  @else
    <span>{{$element['text']}}</span>
  </a>
  @endif
@else
  @if (isset($element['image']) && $element['image'])
    <img class="element-button-image" src="{{$element['image']}}" alt="{{$element['text']}}">
  @else
    <span>{{$element['text']}}</span>
  @endif
@endif
</div>