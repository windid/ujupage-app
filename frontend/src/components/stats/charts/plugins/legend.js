import Chartist from 'chartist'
import {
  query
} from './util'

import $ from 'utils/query'

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

      const elContainer = chart.container
      let elList = query('.' + options.listClass, elContainer.parentNode)

      if (!elList) {
        elList = document.createElement('div')
        elList.className = options.listClass
        // 使用事件委托
        elList.addEventListener('click', e => {
          const $legend = $(e.target, elList)
          if (!($legend.hasClass(options.legendClass) && $legend.has('data-legend'))) {
            return
          }

          e.preventDefault()

          const state = $legend.attr('data-legend')

          if ($legend.hasClass(options.disableClass)) {
            $('.ct-series-' + state, elContainer).show()
            $legend.removeClass(options.disableClass)
          } else {
            $('.ct-series-' + state, elContainer).hide()
            $legend.addClass(options.disableClass)
          }
        })
      }

      if (elList.childNodes.length === 0) {
        legends.forEach((legend, index) => {
          const $legend = document.createElement('label')
          const state = Chartist.alphaNumerate(index)
          $legend.className = options.legendClass + ' ct-legend-' + state
          $legend.textContent = legend
          $legend.setAttribute('data-legend', state)
          elList.appendChild($legend)
        })
      } else {
        // 显示状态初始化
        legends.forEach((legend, index) => {
          const state = Chartist.alphaNumerate(index)
          if ($('.ct-legend-' + state, elList).hasClass(options.disableClass)) {
            $('.ct-series-' + state, elContainer).hide()
          }
        })
      }
      elContainer.parentNode.insertBefore(elList, elContainer)
    })
  }
}

Chartist.plugins = Chartist.plugins || {}
Chartist.plugins.Legend = Legend

export default Legend
