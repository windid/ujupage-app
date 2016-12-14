import Chartist from 'chartist'
import {
  $,
  on,
  addClass,
  removeClass
} from './util'

const defaultOptions = {
  contentFactory: contentFactory,
  offset: {
    x: 0,
    y: 0
  },
  classNames: {
    tooltip: 'chartist-tooltip',
    title: 'tooltip-title',
    dataList: 'tooltip-data-list',
    dataItem: 'tooltip-data-item',
    xLabel: 'tooltip-label',
    show: 'tooltip-show'
  },
  pointClass: 'ct-point'
}

function contentFactory ($tooltip, chart, options) {
}

const ctTip = function (options) {
  options = Chartist.extend({}, defaultOptions, options)
  return function ctTip (chart) {
    let pointSelector = options.pointClass
    if (chart instanceof Chartist.Bar) {
      pointSelector = 'ct-bar'
    } else if (chart instanceof Chartist.Pie) {
      pointSelector = chart.options.donut ? 'ct-slice-donut' : 'ct-slice-pie'
    }
    const $container = chart.container
    const $points = []
    const positions = []

    let $tooltip = $('.' + options.classNames.tooltip, $container)
    if (!$tooltip) {
      $tooltip = document.createElement('div')
      $tooltip.className = options.classNames.tooltip
      $container.appendChild($tooltip)
      const $title = document.createElement('div')
      $title.className = options.classNames.title
      const $dataList = document.createElement('ul')
      $dataList.className = options.classNames.dataList
      const $xLabel = document.createElement('div')
      $xLabel.className = options.classNames.xLabel
      $dataList.appendChild(createDataItem('转化率', 'conversionRate'))
      $dataList.appendChild(createDataItem('转化次数', 'conversions'))
      $dataList.appendChild(createDataItem('访客数', 'visitors'))
      $tooltip.appendChild($title)
      $tooltip.appendChild($dataList)
      $tooltip.appendChild($xLabel)
    }

    const tooltipData = chart.options.tooltipData
    const labelsLen = chart.data.labels.length

    chart.on('draw', data => {
      if (data.type === 'point') {
        $points[data.index] = data.element._node
        positions[data.index] = {
          x: data.x,
          y: data.y
        }
      }
    })

    on($container, 'mouseover', pointSelector, e => {
      const $point = e.target
      const index = $points.indexOf($point)
      if (index > -1) {
        changeTooltip(index)
      }
    })

    on($container, 'mouseout', pointSelector, e => {
      removeClass($tooltip, options.classNames.show)
    })

    on($container, 'mousemove', false, e => {
    })

    on($container, 'mouseleave', false, e => {
    })

    function changeTooltip (index) {
      const seriesIndex = Math.floor(index / labelsLen)
      const pointIndex = index % labelsLen
      const data = {
        seriesIndex: seriesIndex,
        pointIndex: pointIndex,
        conversionRate: tooltipData.conversionRate[seriesIndex].data[pointIndex],
        conversions: tooltipData.conversions[seriesIndex].data[pointIndex],
        visitors: tooltipData.visitors[seriesIndex].data[pointIndex]
      }
      renderTooltip(data, index)
    }

    function renderTooltip (data, index) {
      $('.data-conversionRate .item-data', $tooltip).innerHTML = data.conversionRate + '%'
      $('.data-conversions .item-data', $tooltip).innerHTML = data.conversions
      $('.data-visitors .item-data', $tooltip).innerHTML = data.visitors
      const $title = $('.' + options.classNames.title, $tooltip)
      $title.innerHTML = chart.data.series[data.seriesIndex].name
      $title.className = options.classNames.title + ' ct-legend-' + Chartist.alphaNumerate(data.seriesIndex)
      $('.' + options.classNames.xLabel, $tooltip).innerHTML = chart.data.labels[data.pointIndex]
      addClass($tooltip, options.classNames.show)
      const height = $tooltip.offsetHeight
      const width = $tooltip.offsetWidth
      const offsetX = -width / 2 + options.offset.x
      const offsetY = -height + options.offset.y - 10
      $tooltip.style.left = positions[index].x + offsetX + 'px'
      $tooltip.style.top = positions[index].y + offsetY + 'px'
    }

    function createDataItem (name, className) {
      const $item = document.createElement('li')
      $item.className = options.classNames.dataItem + ' data-' + className
      $item.innerHTML = name + ': <span class="item-data"></span>'
      return $item
    }
  }
}

Chartist.plugins = Chartist.plugins || {}
Chartist.plugins.ctTip = ctTip

export default ctTip
