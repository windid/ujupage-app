<template>
  <div class="ct-chart ct-major-twelfth"></div>
</template>

<script>
import chartMixin from '../../../mixins/chartMixin'

export default {
  name: 'chart-line',
  mixins: [chartMixin]
}
</script>

<style lang="scss">
@import '~chartist/dist/scss/chartist';
.ct-chart {
  max-width: 100%;
}
.ct-label.ct-horizontal {
  min-width: 100px;
}
</style>