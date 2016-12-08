import Chartist from 'chartist'
import { assign } from 'lodash'

const allChartTypes = ['line', 'bar', 'pie']
const defaultOptions = {
  // fullWidth: true,
  axisX: {
    labelOffset: {
      x: -30,
      y: 10
    }
  },
  chartPadding: {
    top: 15,
    right: 15,
    bottom: 20,
    left: 20
  }
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
    }
  },
  mounted () {
    this.$data.$chart = new Chartist[this.chartType](this.$el, this.stats, assign({}, defaultOptions, this.options), this.responsiveOptions)
  },
  watch: {
    stats (val) {
      this.$nextTick(() => {
        this.$data.$chart.update(this.stats, assign({}, defaultOptions, this.options))
      })
    }
  }
}
