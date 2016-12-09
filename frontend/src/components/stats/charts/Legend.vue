<template>
  <div class="ct-legend-list">
    <label v-for="(label, index) in labels" class="ct-legend" :class="'ct-legend-' + index" @click="onLabelClick(index)">
      <i class="ct-mark"></i>
      <span class="ct-label">{{ label.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'chart-legend',
  props: {
    labels: Array
  },
  methods: {
    onLabelClick (index) {
      this.$emit('on-switch', index)
    }
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
    margin-left: 5px;
  }
}
@for $i from 0 to length($ct-series-names) {
  .ct-legend-#{nth($ct-series-names, $i + 1))} {
    i {
      background: nth($ct-series-colors, $i + 1)
    }
  }
}
</style>