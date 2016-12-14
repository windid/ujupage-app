import Chartist from 'chartist'
import {
  $,
  on,
  addClass,
  removeClass,
  hasClass,
  getOffset
} from './util'

const defaultOptions = {
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

const ctTip = function (options) {
  options = Chartist.extend({}, defaultOptions, options)

  function createDataItem (name, className) {
    const $item = document.createElement('li')
    $item.className = options.classNames.dataItem + ' data-' + className
    $item.innerHTML = name + ': <span class="item-data"></span>'
    return $item
  }

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
    let seriesIndex = 0
    let pointIndex = 0

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
    // 鼠标移到图表的point上时，显示tooltip
    on($container, 'mouseover', pointSelector, e => {
      const $point = e.target
      const index = $points.indexOf($point)
      if (index > -1) {
        seriesIndex = Math.floor(index / labelsLen)
        pointIndex = index % labelsLen
        changeTooltip()
      }
    })

    // 鼠标在图表上移动时，根据x坐标切换tooltip
    on($container, 'mousemove', false, e => {
      if (hasClass($tooltip, options.classNames.show)) {
        searchIndex(e)
      }
    })

    // 鼠标移开图表时，隐藏tooltip
    on($container, 'mouseleave', false, e => {
      removeClass($tooltip, options.classNames.show)
    })

    // 切换tooltip数据
    function changeTooltip () {
      const data = {
        conversionRate: tooltipData.conversionRate[seriesIndex].data[pointIndex],
        conversions: tooltipData.conversions[seriesIndex].data[pointIndex],
        visitors: tooltipData.visitors[seriesIndex].data[pointIndex]
      }
      renderTooltip(data)
    }

    // 渲染tooltip数据
    function renderTooltip (data) {
      $('.data-conversionRate .item-data', $tooltip).innerHTML = data.conversionRate + '%'
      $('.data-conversions .item-data', $tooltip).innerHTML = data.conversions
      $('.data-visitors .item-data', $tooltip).innerHTML = data.visitors
      const $title = $('.' + options.classNames.title, $tooltip)
      $title.innerHTML = chart.data.series[seriesIndex].name
      $title.className = options.classNames.title + ' ct-legend-' + Chartist.alphaNumerate(seriesIndex)
      $('.' + options.classNames.xLabel, $tooltip).innerHTML = chart.data.labels[pointIndex]
      addClass($tooltip, options.classNames.show)
      const height = $tooltip.offsetHeight
      const width = $tooltip.offsetWidth
      const offsetX = -width / 2 + options.offset.x
      const offsetY = -height + options.offset.y - 10
      const index = seriesIndex * labelsLen + pointIndex
      $tooltip.style.left = positions[index].x + offsetX + 'px'
      $tooltip.style.top = positions[index].y + offsetY + 'px'
    }

    // 检测是否切换tooltip
    function searchIndex (e) {
      if (positions.length >= 2) {
        const width = positions[1].x - positions[0].x
        const padding = chart.options.chartPadding
        const axisYOffset = chart.options.axisY.offset
        const box = getOffset($container)
        const offsetX = e.pageX - box.left - window.pageXOffset
        const dx = Math.max(0, offsetX - axisYOffset - padding.left)
        const index = Math.round(dx / width)
        if (index !== pointIndex) {
          pointIndex = index
          changeTooltip()
        }
      }
    }
  }
}

Chartist.plugins = Chartist.plugins || {}
Chartist.plugins.ctTip = ctTip

export default ctTip