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
$chart-tooltip-bg: #37475a;
$chart-tooltip-color: #fff;
.chartist-tooltip {
  position: absolute;
  display: inline-block;
  min-width: 5rem;
  padding: .5rem;
  font-size: .8rem;
  background: $chart-tooltip-bg;
  color: $chart-tooltip-color;
  pointer-events: none;
  opacity: 0;
  transition: opacity .2s ease;
  border-radius: 2px;
  z-index: 2;
  &:before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -6px;
    border: 6px solid transparent;
    border-top-color: $chart-tooltip-bg;
  }
  &.tooltip-show {
    opacity: 1;
  }
}

.ct-area, .ct-line {
  pointer-events: none;
}
</style>