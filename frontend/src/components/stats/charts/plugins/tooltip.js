import Chartist from 'chartist'
import {
  $,
  hasClass,
  addClass,
  removeClass
} from './util'

const defaultOptions = {
  currency: undefined,
  currencyFormatCallback: undefined,
  tooltipOffset: {
    x: 0,
    y: -12
  },
  anchorToPoint: false,
  appendToBody: false,
  className: 'chartist-tooltip',
  pointClass: 'ct-point'
}

const showClass = 'tooltip-show'

const Tooltip = function (options) {
  options = Chartist.extend({}, defaultOptions, options)

  return function tooltip (chart) {
    let tooltipSelector = options.pointClass
    if (chart instanceof Chartist.Bar) {
      tooltipSelector = 'ct-bar'
    } else if (chart instanceof Chartist.Pie) {
      tooltipSelector = chart.options.donut ? 'ct-slice-donut' : 'ct-slice-pie'
    }

    const $chart = chart.container
    let $toolTip = $('.' + options.className, $chart)
    if (!$toolTip) {
      $toolTip = document.createElement('div')
      $toolTip.className = options.className
      if (options.appendToBody) {
        document.body.appendChild($toolTip)
      }
      $chart.appendChild($toolTip)
    }
    let height = $toolTip.offsetHeight
    let width = $toolTip.offsetWidth

    removeClass($toolTip, showClass)

    function on (event, selector, callback) {
      $chart.addEventListener(event, function (e) {
        if (!selector || hasClass(e.target, selector)) {
          callback(e)
        }
      })
    }

    on('mouseover', tooltipSelector, function (event) {
      const $point = event.target
      let tooltipText = ''

      const isPieChart = (chart instanceof Chartist.Pie) ? $point : $point.parentNode
      const seriesName = (isPieChart) ? $point.parentNode.getAttribute('ct:meta') || $point.parentNode.getAttribute('ct:series-name') : ''
      let meta = $point.getAttribute('ct:meta') || seriesName || ''
      const hasMeta = !!meta
      let value = $point.getAttribute('ct:value')

      if (options.transformTooltipTextFnc && typeof options.transformTooltipTextFnc === 'function') {
        value = options.transformTooltipTextFnc(value)
      }

      if (options.tooltipFnc && typeof options.tooltipFnc === 'function') {
        tooltipText = options.tooltipFnc(meta, value)
      } else {
        if (options.metaIsHTML) {
          const txt = document.createElement('textarea')
          txt.innerHTML = meta
          meta = txt.value
        }

        meta = '<span class="chartist-tooltip-meta">' + meta + '</span>'

        if (hasMeta) {
          tooltipText += meta + ' : '
        } else {
          if (chart instanceof Chartist.Pie) {
            const label = next($point, 'ct-label')
            if (label) {
              tooltipText += text(label) + '<br>'
            }
          }
        }

        if (value) {
          if (options.currency) {
            if (options.currencyFormatCallback !== undefined) {
              value = options.currencyFormatCallback(value, options)
            } else {
              value = options.currency + value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
            }
          }
          value = '<span class="chartist-tooltip-value">' + chart.options.axisY.labelInterpolationFnc(value) + '</span>'
          tooltipText += value
        }
      }

      if (tooltipText) {
        $toolTip.innerHTML = tooltipText
        setPosition(event)
        addClass($toolTip, showClass)

        height = $toolTip.offsetHeight
        width = $toolTip.offsetWidth
      }
    })

    on('mouseout', tooltipSelector, function () {
      removeClass($toolTip, showClass)
    })

    on('mousemove', null, function (event) {
      if (options.anchorToPoint === false) {
        setPosition(event)
      }
    })

    function setPosition (event) {
      height = height || $toolTip.offsetHeight
      width = width || $toolTip.offsetWidth
      const offsetX = -width / 2 + options.tooltipOffset.x
      const offsetY = -height + options.tooltipOffset.y
      let anchorX, anchorY

      if (!options.appendToBody) {
        const box = $chart.getBoundingClientRect()
        const left = event.pageX - box.left - window.pageXOffset
        const top = event.pageY - box.top - window.pageYOffset

        if (options.anchorToPoint === true && event.target.x2 && event.target.y2) {
          anchorX = parseInt(event.target.x2.baseVal.value)
          anchorY = parseInt(event.target.y2.baseVal.value)
        }

        $toolTip.style.top = (anchorY || top) + offsetY + 'px'
        $toolTip.style.left = (anchorX || left) + offsetX + 'px'
      } else {
        $toolTip.style.top = event.pageY + offsetY + 'px'
        $toolTip.style.left = event.pageX + offsetX + 'px'
      }
    }
  }
}

function next (element, className) {
  do {
    element = element.nextSibling
  } while (element && !hasClass(element, className))
  return element
}

function text (element) {
  return element.innerText || element.textContent
}

Chartist.plugins = Chartist.plugins || {}
Chartist.plugins.Tooltip = Tooltip

export default Tooltip
