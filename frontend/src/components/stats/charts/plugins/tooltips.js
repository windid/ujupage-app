import Chartist from 'chartist'
// import {
//   $
// } from './util'

const defaultOptions = {
  contentFactory: contentFactory
}

function contentFactory ($tooltip, data, options) {

}

const ctTip = function (options) {
  options = Chartist.extend({}, defaultOptions, options)
  return function ctTip (chart) {
    console.log(chart.options.tooltipData)
  }
}

Chartist.plugins = Chartist.plugins || {}
Chartist.plugins.ctTip = ctTip

export default ctTip
