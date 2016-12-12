<div class="swiper-wrapper">
<div class="element element-swiper swiper" id="element-{{$element_id}}">
  <ul>
  @foreach($element['data']['images'] as $image)
    <li>
      <img src="{{$image}}">
    </li>
  @endforeach
  </ul>
</div>
</div>