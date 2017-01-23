<template>
  <div class="chart-container">
    <div class="ct-chart ct-major-twelfth" ref="chart"></div>
  </div>
</template>

<script>
import chartMixin from '../../../mixins/chartMixin'

export default {
  name: 'chart-line',
  mixins: [chartMixin]
}
</script>

<style lang="scss">
@import '../../../assets/styles/chartist_setting';
@import '~chartist/dist/scss/chartist';
.ct-chart {
  max-width: 100%;
}
.ct-label.ct-horizontal {
  min-width: 100px;
}
$chart-tooltip-bg: #37475a;
$chart-tooltip-color: #fff;
$legend-mark-size: 16px;
$legend-mark-tooltip-size: 12px;

.chartist-tooltip {
  position: absolute;
  display: inline-block;
  min-width: 5em;
  padding: 10px 15px;
  font-size: .8em;
  background: $chart-tooltip-bg;
  color: $chart-tooltip-color;
  pointer-events: none;
  opacity: 0;
  transition: all .2s ease;
  border-radius: 2px;
  z-index: 2;
  white-space: nowrap;
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
  .tooltip-title {
    text-align: center;
    color: #fff;
    margin-bottom: 5px;
    &::before {
      width: $legend-mark-tooltip-size;
      height: $legend-mark-tooltip-size;
    }
    span {
      vertical-align: middle;
    }
  }
  .tooltip-data-list {
    list-style: none;
    padding: 0;
  }
}

.ct-area, .ct-line {
  pointer-events: none;
}

.ct-legend-list {
  padding: 10px;
  text-align: center;
  
}
.ct-legend, .tooltip-title {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
  line-height: $legend-mark-size;
  font-weight: normal;
  margin-left: 5px;
  color: #999;
  font-size: $ct-text-size;
  &::before {
    display: inline-block;
    content: '';
    width: $legend-mark-size;
    height: $legend-mark-size;
    vertical-align: middle;
    margin-right: 5px;
  }
  &.is-disable {
    text-decoration: line-through;
    &::before {
      background: rgba(0,0,0,0.1);
    }
  }
}
.#{$ct-class-chart-line} {
  overflow: visible !important;
}
@for $i from 0 to length($ct-series-names) {
  .ct-legend-#{nth($ct-series-names, $i + 1))} {
    &::before {
      background: nth($ct-series-colors, $i + 1)
    }
  }
}
</style>