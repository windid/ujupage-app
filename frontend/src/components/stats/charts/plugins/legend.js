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
  seriesClasses: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'],
  containerClass: 'ct-legend-list',
  legendClass: 'ct-legend',
  disableClass: 'is-disable',
  filter: Chartist.noop,
  onClick: Chartist.noop
}

const Legend = function (options) {
  options = Chartist.extend({}, defaultOptions, options)

  return function legend (chart) {
    chart.on('created', function (data) {
      const series = [].concat(chart.data.series)
      const legends = series.map(s => s.name)
      const $element = chart.container

      let $container = $('.' + options.containerClass, $element.parentNode)
      if (!$container) {
        $container = document.createElement('div')
        $container.className = options.containerClass
      }

      if ($container.childNodes.length === 0) {
        legends.forEach((legend, index) => {
          const $legend = document.createElement('label')
          const legendText = options.filter(legend)
          const state = index < options.seriesClasses.length ? options.seriesClasses[index] : '' + index
          $legend.className = options.legendClass + ' ct-legend-' + state
          $legend.innerHTML = '<i class="ct-mark"></i><span class="ct-label" data-legend="' + legend + '">' + legendText + '</span>'
          $legend.addEventListener('click', e => {
            if (hasClass($legend, options.disableClass)) {
              show($('.ct-series-' + state, $element))
              removeClass($legend, options.disableClass)
            } else {
              hide($('.ct-series-' + state, $element))
              addClass($legend, options.disableClass)
            }
            options.onClick(index, e)
          })
          $container.appendChild($legend)
        })
      } else {
        legends.forEach((legend, index) => {
          const state = index < options.seriesClasses.length ? options.seriesClasses[index] : '' + index
          if (hasClass($('.ct-legend-' + state, $container), options.disableClass)) {
            hide($('.ct-series-' + state, $element))
          }
        })
      }
      $element.parentNode.insertBefore($container, $element)
    })
  }
}

Chartist.plugins = Chartist.plugins || {}
Chartist.plugins.Legend = Legend

export default Legend
