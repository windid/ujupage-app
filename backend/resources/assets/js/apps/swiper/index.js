import '../../vendor/swiper/jquery.event.move.js'
import '../../vendor/swiper/jquery.event.swipe.js'
import '../../vendor/swiper/unslider-min.js'
import '../../vendor/swiper/unslider.css'
import '../../vendor/swiper/swiper.css'

window.makeSlider = function (config) {
  var bw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  var ver = bw > 620 ? 'pc' : 'mobile'
  var el = $(config.domId)
  var W = config.style[ver].width
  var H = config.style[ver].height
  var maxWidth = parseInt(W)
  var maxHeight =  parseInt(H)
  el.css('width', W).css('height', H)
  el.find('li').each(function() {
    $(this).css('height', H)
    var src = $(this).attr('data-src')
    var fileExtension = src.replace(/^.*\.([a-zA-z0-9]+)$/, '$1')
    if (!fileExtension) {
      fileExtension = 'jpg'
    }
    src += '@' + maxWidth + 'w_' + maxHeight + 'h.' + fileExtension
    var img = document.createElement('img')
    img.src = src
    $(this).append(img)
    $(img).on('mousedown', function(e) { e.preventDefault() })
  })
  el.children('.swiper').unslider(config.options)
}