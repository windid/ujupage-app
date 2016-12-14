import Chartist from 'chartist'
import {
  $,
  hasClass,
  addClass,
  removeClass,
  show,
  hide
} from './util'

const defaultOptions = {
  listClass: 'ct-legend-list',
  legendClass: 'ct-legend',
  disableClass: 'is-disable',
  filter: Chartist.noop,
  onClick: Chartist.noop
}

const Legend = function (options) {
  options = Chartist.extend({}, defaultOptions, options)

  return function legend (chart) {
    chart.on('created', function (data) {
      const series = chart.data.series.map((s, index) => {
        if (typeof s !== 'object') {
          s = {
            value: s
          }
        }
        s.className = s.className || chart.options.classNames.series + '-' + Chartist.alphaNumerate(index)
        return s
      })

      const legends = series.map((s, index) => {
        return options.filter(s.name || '', index, chart)
      })

      const $container = chart.container
      let $list = $('.' + options.listClass, $container.parentNode)

      if (!$list) {
        $list = document.createElement('div')
        $list.className = options.listClass
        // 使用事件委托
        $list.addEventListener('click', e => {
          const $legend = e.target
          if (!(hasClass($legend, options.legendClass) && $legend.hasAttribute('data-legend'))) {
            return
          }

          e.preventDefault()

          const state = $legend.getAttribute('data-legend')

          if (hasClass($legend, options.disableClass)) {
            show($('.ct-series-' + state, $container))
            removeClass($legend, options.disableClass)
          } else {
            hide($('.ct-series-' + state, $container))
            addClass($legend, options.disableClass)
          }
        })
      }

      if ($list.childNodes.length === 0) {
        legends.forEach((legend, index) => {
          const $legend = document.createElement('label')
          const state = Chartist.alphaNumerate(index)
          $legend.className = options.legendClass + ' ct-legend-' + state
          $legend.textContent = legend
          $legend.setAttribute('data-legend', state)
          $list.appendChild($legend)
        })
      } else {
        // 显示状态初始化
        legends.forEach((legend, index) => {
          const state = Chartist.alphaNumerate(index)
          if (hasClass($('.ct-legend-' + state, $list), options.disableClass)) {
            hide($('.ct-series-' + state, $container))
          }
        })
      }
      $container.parentNode.insertBefore($list, $container)
    })
  }
}

Chartist.plugins = Chartist.plugins || {}
Chartist.plugins.Legend = Legend

export default Legend
