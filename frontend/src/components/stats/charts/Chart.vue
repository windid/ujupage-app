<template>
  <div class="chart-container">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { merge } from 'lodash'

const globalOptions = {
  elements: {
    line: {
      fill: false
    }
  }
}

merge(Chart.defaults.global, globalOptions)

const defaultOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    labels: {
      boxWidth: 12
    }
  }
}

const defaultBgs = [
  '#ffb03b',
  '#468966',
  '#b64926',
  '#046380',
  '#beeb9f',
  '#a7a37e',
  '#dda458',
  '#d70206',
  '#f05b4f',
  '#f4c63d',
  '#d17905',
  '#453d3f',
  '#59922b',
  '#0544d3',
  '#6b0392',
  '#f05b4f'
]

export default {
  props: {
    type: {
      type: String,
      default: 'line'
    },
    width: {
      type: String,
      default: '600px'
    },
    height: {
      type: String,
      default: '300px'
    },
    labels: Array,
    datasets: {
      type: Array,
      validator (sets) {
        sets.forEach((set, index) => {
          set.backgroundColor = set.borderColor = defaultBgs[index] || 'rgba(0,0,0,0.1)'
        })
        return true
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.$chart = new Chart(this.$refs.canvas.getContext('2d'), {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: this.datasets,
        backgroundColor: defaultBgs
      },
      options: merge({}, defaultOptions, this.options)
    })
  },
  watch: {
    labels (labels) {
      const chart = this.$chart
      chart.data.labels = labels
      chart.update()
    },
    datasets (datasets) {
      const chart = this.$chart
      chart.data.datasets = datasets
      chart.update()
    }
  }
}
</script>

<style lang="scss">
.chart-container {
  margin: 10px 0;
}
</style>
