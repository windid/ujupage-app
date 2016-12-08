<template>
  <div class="chart-container">
    <chart-legend :labels="labels" v-if="legend"></chart-legend>
    <div class="ct-chart ct-major-twelfth" ref="chart"></div>
  </div>
</template>

<script>
import chartMixin from '../../../mixins/chartMixin'
import ChartLegend from './Legend'

export default {
  name: 'chart-line',
  mixins: [chartMixin],
  components: {
    ChartLegend
  }
}
</script>

<style lang="scss">
@import '../../../assets/styles/chartist_setting.scss';
@import '~chartist/dist/scss/chartist';
.ct-chart {
  max-width: 100%;
}
.ct-label.ct-horizontal {
  min-width: 100px;
}
</style>