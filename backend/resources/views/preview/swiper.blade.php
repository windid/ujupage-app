<div class="element swiper-wrapper" id="element-{{$element_id}}">
  <div class="swiper">
    <ul>
    @foreach($element['data']['images'] as $image)
      <li data-src="{{$image}}">
      </li>
    @endforeach
    </ul>
  </div>
</div>

<script>
  makeSlider({
    domId: '#element-{{$element_id}}',
    style: {
      pc: {
        width: '{{$element['style']['pc']['width']}}',
        height: '{{$element['style']['pc']['height']}}'
      },
      mobile: {
        width: '{{$element['style']['mobile']['width']}}',
        height: '{{$element['style']['mobile']['height']}}'
      }
    },
    options: {
      animation: 'horizontal', // 动画效果：horizontal, vertical, fade 
      speed: 500,  // 速度
      delay: 3000, // 间隔
      autoplay: {{$element['data']['auto'] ? 'true' : 'false'}}, // 自动播放
      arrows: {{$element['data']['button'] ? 'true' : 'false'}}, // 是否显示翻页按钮
      nav: true,    // 翻页页码
      infinite: true,
      fluid: true
    }
  })
  </script>