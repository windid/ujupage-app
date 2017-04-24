// import $ from 'jquery'
import 'jquery-validation'
import 'jquery-validation/dist/localization/messages_zh'

const getParameter = function (val) {
  var re = new RegExp(val + '=([^&#]*)', 'i')
  var a = re.exec(window.location.href)
  if (a === null) {
    return ''
  }
  return decodeURI(a[1])
}

var Site = {

  init: () => {
    Site.parseForm()
    Site.parseLink()
    Site.parseFixed()
    $('.msg-close').click(()=>{
      $('.msg-mask').hide()
    })
  },

  parseFixed () {
    $("[fixed]").each(function(){
      const el = $(this)
      const fixedPx = parseInt(el.attr('fixed'))
      $( window ).scroll(function(){
        if ($( window ).scrollTop() > fixedPx) {
          el.fadeIn(400);
        } else {
          el.fadeOut(400);
        }
      })
    })
  },

  parseForm: () => {
    const utmParams = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term']
    let queryString = ''
    utmParams.map((param) => {
      queryString += param + '=' + getParameter(param) + '&'
    })
    $('form').each(function(){
      const form = $(this)
      form.validate({
        submitHandler: function() {
          $.ajax({
            url: '//www.juyepage.com/post?' + queryString,
            dataType: 'jsonp',
            jsonpCallback: 'callback',
            data: form.serialize(),
            success: response => {
              const redirect = form.attr('redirect')
              if (redirect) {
                window.location = redirect
              } else {
                Site.showMsg(form.attr('msg') || '表单提交成功')
              }
              const goal = form.attr('data-goal')
              JuyeTracker.trackEvent(['表单', '提交', '成功'], goal)
            },
            error: response => {
              JuyeTracker.trackEvent(['表单', '提交', '失败'], 0)
              Site.showMsg('表单提交失败，请稍后再试。')
            }
          })
        }
      })

      const toggleThankyouMsg = function () {
        const mask = form.find('.thankyou-mask')
        mask.toggle()
      }
      
      const labels = form.find('.label-inside')
      labels.each(function(){
        const label = $(this)
        const input = $('#' + label.attr('for'))
        input.focus(function(){
          label.hide()
        })

        input.blur(function () {
          if (this.value.length === 0){
            label.show()
          }
        })
      })
    })
  },

  parseLink: () => {
    $("a").each(function (){
      var link = $(this)
      var href = link.attr('href')
      if (!href || href.substring(0, 11) === 'javascript:') return
      $(this).click(function(e) {
        e.preventDefault()
        if(href && href[0] === '#') {
          console.log(href)
          var element = document.getElementById(href.substring(1))
          var scrollTop = element ? element.offsetTop : 0
          $('body').animate({
            scrollTop: scrollTop
          })
        } else {
          var goal = $(this).data('goal')
          JuyeTracker.trackLink(href, goal)
          var openTarget = $(this).attr('target') || '_top'
          window.open(href, openTarget)
        }
      })
    })
  },

  showMsg: (msg) => {
    const msgBox = $('.msg-mask')
    const msgBody = $('.msg-body')
    msgBody.html(msg)
    msgBox.show()
  },

  makeMap: (config) => {
    var map = new AMap.Map(config.domId, {
      resizeEnable: true,
      zoom: 16,
      center: config.coordination
    })
    var toolBar = new AMap.ToolBar({
        visible: true
    })
    toolBar.hideDirection()
    toolBar.hideRuler()
    map.addControl(toolBar)
    var marker = new AMap.Marker({
      position: config.coordination,
      title: config.name
    })
    marker.setMap(map)
  }

}

window.JuyePage = Site

$( document ).ready(function() {
  Site.init()
})

;(function () {
  function Tracker () {
    this.expireDateTime = null
    this.trackUrl = '//ujupage.cn-hangzhou.log.aliyuncs.com/logstores/stats/track.gif?APIVersion=0.6.0'
    this.commonParams = {}
  }

  Tracker.prototype = {
    init: function (pageId, variationId) {
      this.commonParams['pid'] = pageId
      this.commonParams['vid'] = variationId
      this.commonParams['cid'] = getCookie()
      this.trackPageView()
      // this.trackLinks()
      addEvent(window, 'beforeunload', this.beforeUnloadHandler)
    },

    trackPageView: function (url = '', referrer = '') {
      this.commonParams['url'] = url || window.location.href
      this.commonParams['rf'] = referrer || getReferrer()
      var pvParams = {}
      pvParams['ua'] = navigator.userAgent
      pvParams['sr'] = window.screen.width + '*' + window.screen.height // 屏幕分辨率
      pvParams['bw'] = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) // 浏览器宽度
      pvParams['bh'] = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) // 浏览器高度
      pvParams['ce'] = navigator.cookieEnabled ? 1 : 0 // 是否开启Cookie
      pvParams['type'] = 'pageview' // pv数据
      this.commonParams['ver'] = pvParams['bw'] > 620 ? 'pc' : 'mobile'
      this.sendRequest(pvParams)
    },

    trackLink: function(target = '', goal = 0) {
      var params = {
        type: 'link',
        target: target,
        goal: goal
      }
      this.sendRequest(params, 200)
    },

    trackEvent: function (eventParams, goal = 0) {
      var params = {}
      params['c'] = eventParams[0] || ''
      params['a'] = eventParams[1] || ''
      params['l'] = eventParams[2] || ''
      params['v'] = eventParams[3] || ''
      params['n'] = eventParams[4] || ''
      params['type'] = 'event'
      params['goal'] = goal
      this.sendRequest(params, 200)
    },

    sendRequest: function (params, delay = null) {
      var request = this.trackUrl
      for (var i in this.commonParams) {
        request += '&' + i + '=' + encodeURIComponent(this.commonParams[i])
      }
      for (var j in params) {
        request += '&' + j + '=' + encodeURIComponent(params[j])
      }
      request += '&r=' + String(Math.random()).slice(2, 8)

      if (delay) {
        var now = new Date()
        this.expireDateTime = now.getTime() + delay
      }

      var image = new window.Image(1, 1)
      image.onload = function () {}
      image.src = request
    },

    beforeUnloadHandler: function () {
      var now
      if (window.JuyeTracker.expireDateTime) {
        do {
          now = new Date()
        } while (now.getTime() < window.JuyeTracker.expireDateTime)
      }
    }
  }

  if (!window.JuyeTracker) {
    window.JuyeTracker = new Tracker()
  }

  // Cookie处理
  var Cookie = {
    get: function (name) {
      var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
      if (arr != null) {
        return unescape(arr[2])
      }
      return null
    },

    set: function (name, value, days) {
      var expires = ''
      if (days) {
        var date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        expires = '; expires=' + date.toGMTString()
      }
      document.cookie = name + '=' + value + expires + '; path=/'
    }
  }

  function getCookie () {
    var cid = Cookie.get('uju_cid')
    if (!cid) {
      cid = randomChar(16)
      Cookie.set('uju_cid', cid, 365)
    }
    return cid
  }

  /**
  * randomChar函数
  * 生成一段指定长度的随机码
  * len生成随机码的长度
  **/
  function randomChar (len) {
    var x = '0123456789abcdefghijklmnopqrstuvwxyz'
    var tmp = ''
    for (var i = 0; i < len; i++) {
      tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
    }
    return tmp
  }

  function addEvent (obj, type, fn) {
    if (obj.attachEvent) {
      obj['e' + type + fn] = fn
      obj[type + fn] = function () {
        obj['e' + type + fn](window.event)
      }
      obj.attachEvent('on' + type, obj[type + fn])
    } else if (obj.addEventListener) {
      obj.addEventListener(type, fn, false)
    }
  }

  function getReferrer () {
    var referrer = ''

    try {
      referrer = window.top.document.referrer
    } catch (e) {
      if (window.parent) {
        try {
          referrer = window.parent.document.referrer
        } catch (e2) {
          referrer = ''
        }
      }
    }

    if (referrer === '') {
      referrer = document.referrer
    }

    return referrer
  }
})()