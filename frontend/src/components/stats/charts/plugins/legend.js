import Chartist from 'chartist'

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
      const $previous = $element.parentNode.querySelector('.' + options.containerClass)
      if ($previous) {
        $element.parentNode.removeChild($previous)
      }
      const $container = document.createElement('div')
      $container.className = options.containerClass
      if ($container.childNodes.length === 0) {
        legends.forEach((legend, index) => {
          const $legend = document.createElement('label')
          const legendText = options.filter(legend)
          const state = index < options.seriesClasses.length ? options.seriesClasses[index] : '' + index
          $legend.className = options.legendClass + ' ct-legend-' + state
          $legend.innerHTML = '<i class="ct-mark"></i><span class="ct-label" data-legend="' + legend + '">' + legendText + '</span>'
          $legend.addEventListener('click', e => {
            if (hasClass($legend, options.disableClass)) {
              show($element.querySelector('.ct-series-' + state))
              removeClass($legend, options.disableClass)
            } else {
              hide($element.querySelector('.ct-series-' + state))
              addClass($legend, options.disableClass)
            }
            options.onClick(index, e)
          })
          $container.appendChild($legend)
        })
      }
      $element.parentNode.insertBefore($container, $element)
    })
  }
}

function hasClass ($el, className) {
  return (' ' + $el.getAttribute('class') + ' ').indexOf(' ' + className + ' ') > -1
}

function addClass ($el, className) {
  if (!hasClass($el, className)) {
    $el.className = $el.className + ' ' + className
  }
}

function removeClass ($el, className) {
  var regex = new RegExp(className + '\\s*', 'gi')
  $el.className = $el.className.replace(regex, '').trim()
}

function show ($el) {
  if (!$el) {
    return
  }
  $el.style.display = ''
}

function hide ($el) {
  if (!$el) {
    return
  }
  $el.style.display = 'none'
}

Chartist.plugins = Chartist.plugins || {}
Chartist.plugins.Legend = Legend

export default Legend
