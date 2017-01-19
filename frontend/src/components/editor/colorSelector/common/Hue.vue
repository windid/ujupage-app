<template>
  <color-slider :max="360" v-model="value" @on-change="onChange">
    <div class="color-hue"></div>
  </color-slider>
</template>

<script>
import ColorSlider from './ColorSlider'

export default {
  name: 'hue',
  components: {
    ColorSlider
  },
  props: {
    value: Number
  },
  methods: {
    onChange (val) {
      this.$emit('on-change', Math.round(val))
    }
  }
}
</script>

<style lang="scss">
.color-hue {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
</style>