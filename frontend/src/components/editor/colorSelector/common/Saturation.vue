<template>
  <div class="color-saturation"
    :style="{ background: bgColor }"
    @mousedown="onMouseDown">
    <div class="pointer" :style="{ left: pointerLeft, top: pointerTop }"></div>
  </div>
</template>

<script>
import { throttle } from 'lodash'

export default {
  name: 'saturation',
  props: {
    hsv: Object
  },
  computed: {
    bgColor () {
      return `hsl(${this.hsv.h}, 100%, 50%)`
    },
    pointerTop () {
      return (100 - this.hsv.v) + '%'
    },
    pointerLeft () {
      return this.hsv.s + '%'
    }
  },
  methods: {
    throttle: throttle((fn, data) => {
      fn(data)
    }, 50),
    handleChange (e) {
      const container = this.$el
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight
      let left = e.pageX - (container.getBoundingClientRect().left + window.pageXOffset)
      let top = e.pageY - (container.getBoundingClientRect().top + window.pageYOffset)
      if (left < 0) {
        left = 0
      } else if (left > containerWidth) {
        left = containerWidth
      } else if (top < 0) {
        top = 0
      } else if (top > containerHeight) {
        top = containerHeight
      }
      const saturation = left * 100 / containerWidth
      const bright = -(top * 100 / containerHeight) + 100

      this.throttle(this.onChange, {
        h: this.hsv.h,
        s: saturation,
        v: bright
      })
    },
    onChange (param) {
      this.$emit('on-change', param)
    },
    onMouseDown (e) {
      this.handleChange(e)
      window.addEventListener('mousemove', this.handleChange)
      window.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseUp (e) {
      this.removeListeners()
    },
    removeListeners () {
      window.removeEventListener('mousemove', this.handleChange)
      window.removeEventListener('mouseup', this.onMouseUp)
    }
  }
}
</script>

<style lang="scss">
.color-saturation {
  position: relative;
  height: 120px;
  cursor: default;
  &::before, &::after {
    position: absolute;
    content: '';
    display: block;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0
  }
  &::before {
    background: linear-gradient(to right, #fff, rgba(255,255,255,0));
  }
  &::after {
    background: linear-gradient(to top, #000, rgba(0,0,0,0));
  }
  .pointer {
    position: absolute;
    width: 10px;
    height: 10px;
    margin-top: -5px;
    margin-left: -5px;
    border-radius: 50%;
    border: 1px solid #fff;
    z-index: 2;
  }
}
</style>