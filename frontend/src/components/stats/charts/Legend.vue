<template>
  <div class="ct-legend-list">
    <label v-for="(label, index) in labels" class="ct-legend" :class="'ct-legend-' + index">
      <i class="ct-mark"></i>
      <span class="ct-label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'chart-legend',
  props: {
    labels: Array
  }
}
</script>

<style lang="scss">
@import '../../../assets/styles/chartist_setting.scss';
$legend-mark-size: 15px;

.ct-legend-list {
  padding: 10px;
  text-align: center;
  
}
.ct-legend {
  display: inline-block;
  margin: 0 10px;
  .ct-mark {
    display: inline-block;
    width: $legend-mark-size;
    height: $legend-mark-size;
    vertical-align: middle;
  }
  .ct-label {
    display: inline-block;
    line-height: $legend-mark-size;
    font-weight: normal;
  }
}
@for $i from 0 to length($ct-series-names) {
  .ct-legend-#{$i)} {
    i {
      background: nth($ct-series-colors, $i + 1)
    }
  }
}
</style>