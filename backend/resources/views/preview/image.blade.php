<div class="element" id="element-{{$element_id}}">
@if( isset($element['link']['url']) && $element['link']['url'])
  <a href="{{$element['link']['url']}}" @if($element['link']['isNewTab']) target="_blank" @endif @if(isset($element['link']['goal'])) data-goal="1" @endif>
    <img src="{{$element['src']}}" class="element-image" alt="{{$element['alt'] or ''}}">
  </a>
@else
  <img src="{{$element['src']}}" class="element-image" alt="{{$element['alt'] or ''}}">
@endif
</div>