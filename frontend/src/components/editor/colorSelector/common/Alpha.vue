<template>
  <color-slider :max="1" v-model="color.a" @on-change="onChange">
    <div class="color-alpha" :style="{ background: alphaBg }">
    </div>
  </color-slider>
</template>

<script>
import ColorSlider from './ColorSlider'

export default {
  name: 'alpha',
  components: {
    ColorSlider
  },
  props: {
    color: Object
  },
  computed: {
    alphaBg () {
      var c = this.color.rgb
      var rgbStr = [c.r, c.g, c.b].join(',')
      return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'
    }
  },
  methods: {
    onChange (val) {
      this.$emit('on-change', val)
    }
  }
}
</script>

<style lang="scss">
.color-alpha {
  height: 100%;
  border-radius: inherit;
}
</style>