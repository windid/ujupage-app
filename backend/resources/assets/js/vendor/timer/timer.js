/** timer maker */

(function() {
  const NAMES = ['day', 'hour', 'minute', 'second']
  const MINUTES = 60
  const HOURS = 60 * MINUTES 
  const DAYS = 24 * HOURS

  function tick (timestamp, callback) {
    var timeLeft = Math.floor((timestamp - Date.now()) / 1000)
    const _timeLeft = timeLeft

    if (timeLeft < 0) timeLeft = 0

    const day = Math.floor(timeLeft / DAYS)
    timeLeft -= day * DAYS

    const hour = Math.floor(timeLeft / HOURS)
    timeLeft -= hour * HOURS

    const minute = Math.floor(timeLeft / MINUTES)
    timeLeft -= minute * MINUTES

    const second = timeLeft
    callback({
      day: day,
      hour: hour,
      minute: minute,
      second: second
    })

    if (_timeLeft > 0) {
      setTimeout(function() {
        tick(timestamp, callback)
      }, 500)
    }
  }

  function format(num) {
    return num >= 10 ? num : '0' + num
  }

  function makeTimer(options) {
    var el = $(options.domId)
    var labels = {
      day: el.find('.timer-day'),
      hour: el.find('.timer-hour'),
      minute: el.find('.timer-minute'),
      second: el.find('.timer-second')
    }
    var time = options.time
    var cache = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    }

    tick(time, function (times) {
      for (var i = 0; i < 4; i++) {
        var name = NAMES[i]
        if (cache[name] !== times[name]) {
          labels[name].html(format(times[name]))
          cache[name] = times[name]
        }
      }
    })
  }

  window.makeTimer = makeTimer
})()