import validation from 'jquery-validation'
import validationMsgZh from 'jquery-validation/dist/localization/messages_zh'

var Site = {

  init: () => {
    Site.parseFrom();
    $('.msg-close').click(()=>{
      $('.msg-mask').hide();
    });
  },

  parseFrom: () => {
    $('form').each(function(){
      const form = $(this);
      form.validate({
        submitHandler: function() {
          $.ajax({
            url: "http://www.juyepage.com/post",
            dataType: "jsonp",
            jsonpCallback: "callback",
            data: form.serialize(),
            success: response => {
              Site.showMsg(form.attr('msg'));
            },
            error: response => {
              Site.showMsg("表单提交失败，请稍后再试。");
            }
          });
        }
      });

      const toggleThankyouMsg = function(){
        const mask = form.find('.thankyou-mask');
        mask.toggle();
      };
      
      const labels = form.find('.label-inside');
      labels.each(function(){
        const label = $(this);
        const input = $('#' + label.attr('for'));
        input.focus(function(){
          label.hide()
        });

        input.blur(function(){
          if (this.value.length === 0){
            label.show();
          }
        });
      });
    });
  },

  showMsg: (msg) => {
    const msgBox = $('.msg-mask');
    const msgBody = $('.msg-body');
    msgBody.html(msg);
    msgBox.show();
  }

}

$( document ).ready(function() {
  Site.init();
});

(function () {
  function Tracker () {
    this.expireDateTime = null
    this.trackUrl = 'http://ujupage.cn-hangzhou.sls.aliyuncs.com/logstores/stats/track.gif?APIVersion=0.6.0'
    this.commonParams = {}
  }

  Tracker.prototype = {
    init: function (pageId, variationId) {
      this.commonParams['pid'] = pageId
      this.commonParams['vid'] = variationId
      this.commonParams['cid'] = getCookie()
      this.trackPageView()
      this.trackLinks()
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

    trackLinks: function () {
      var links = document.links
      if (!links) {
        return
      }

      var params = {'type': 'link'}
      var tracker = this
      for (var i in links) {
        if (links[i].hostname) {
          addEvent(links[i], 'click', function () {
            params['goal'] = 1
            params['target'] = this.href
            tracker.sendRequest(params, 200)
          })
        }
      }
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
      this.sendRequest(params)
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
