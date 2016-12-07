import Chartist from 'chartist'

export default {
  props: {
    type: {
      type: String,
      default: 'line'
    },
    stats: Object,
    options: {
      type: Object,
      default () {
        return {
          fullWidth: true
        }
      }
    }
  },
  computed: {
    chartType () {
      return this.type[0].toUpperCase() + this.type.slice(1)
    }
  },
  mounted () {
    new Chartist[this.chartType](this.$el, this.stats, this.options)
  }
}
