<div class="element swiper-wrapper" id="element-{{$element_id}}">
  <div class="swiper">
    <ul>
    @foreach($element['data']['images'] as $image)
      <li>
        <img src="{{$image['url']}}">
      </li>
    @endforeach
    </ul>
  </div>
</div>

<script>
  function makeSlider (config) {
    var el = $(config.domId)
    el.css('width', config.style.width).css('height', config.style.height)
    el.find('img').each(function() {
      $(this).css('width', config.style.width).css('height', config.style.height)
      $(this).on('mousedown', function(e) { e.preventDefault() })
    })
    el.children('.swiper').unslider(config.options)
  }
  makeSlider({
    domId: '#element-{{$element_id}}',
    style: {
      width: '320px',
      height: '200px'
    },
    options: {
      animation: 'horizontal', // 动画效果：horizontal, vertical, fade 
      speed: 500,  // 速度
      delay: 3000, // 间隔
      autoplay: false, // 自动播放
      arrows: true, // 是否显示翻页按钮
      nav: true,    // 翻页页码
      infinite: true,
      fluid: true
    }
  })
  </script>