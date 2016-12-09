import Chartist from 'chartist'
import { merge } from 'lodash'
import '../components/stats/charts/plugins/tooltip'
import '../components/stats/charts/plugins/legend'

const allChartTypes = ['line', 'bar', 'pie']
const defaultOptions = {
  // fullWidth: true,
  axisX: {
    labelOffset: {
      x: 0,
      y: 10
    }
  },
  chartPadding: {
    top: 15,
    right: 15,
    bottom: 20,
    left: 20
  },
  plugins: [
    Chartist.plugins.Tooltip(),
    Chartist.plugins.Legend()
  ]
}

export default {
  props: {
    type: {
      type: String,
      default: 'line',
      validator (val) {
        return allChartTypes.indexOf(val.toLowerCase()) !== -1
      }
    },
    stats: Object,
    options: {
      type: Object
    },
    legend: {
      type: Boolean,
      default: true
    },
    responsiveOptions: {
      type: Array
    }
  },
  data () {
    return {
      $chart: null // 使用$开头，使其不被Vue实例代理
    }
  },
  computed: {
    chartType () {
      return this.type[0].toUpperCase() + this.type.slice(1)
    },
    labels () {
      return this.stats.series.map(s => { return { name: s.name, enabled: true } })
    }
  },
  mounted () {
    this.$data.$chart = new Chartist[this.chartType](this.$refs.chart, this.stats, merge({}, defaultOptions, this.options), this.responsiveOptions)
  },
  watch: {
    stats (val) {
      this.$nextTick(() => {
        this.$data.$chart.update(this.stats, merge({}, defaultOptions, this.options))
      })
    }
  }
}
