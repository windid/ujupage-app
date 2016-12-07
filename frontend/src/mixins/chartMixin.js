import Chartist from 'chartist'

const allChartTypes = ['line', 'bar', 'pie']

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
      type: Object,
      default () {
        return {
          fullWidth: true
        }
      }
    },
    responsiveOptions: {
      type: Array
    }
  },
  data () {
    return {
      $chart: null
    }
  },
  computed: {
    chartType () {
      return this.type[0].toUpperCase() + this.type.slice(1)
    }
  },
  mounted () {
    this.$chart = new Chartist[this.chartType](this.$el, this.stats, this.options, this.responsiveOptions)
  },
  watch: {
    stats (val) {
      this.$nextTick(() => {
        this.$chart.update(this.stats, this.options)
      })
    }
  }
}
