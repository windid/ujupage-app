<template>
  <div class="color-slider" @mousedown="onMouseDown">
    <slot></slot>
    <div class="pointer" :style="{left: pointerLeft}">
    </div>  
  </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    value: Number
  },
  computed: {
    pointerLeft () {
      return (this.value * 100) / (this.max - this.min) + '%'
    }
  },
  methods: {
    onChange (e) {
      const container = this.$el
      const containerWidth = container.clientWidth
      const left = e.pageX - (container.getBoundingClientRect().left + window.pageXOffset)
      let val
      let percent

      if (left < 0) {
        val = this.min
      } else if (left > containerWidth) {
        val = this.max
      } else {
        percent = left * 100 / containerWidth
        val = ((this.max - this.min) * percent / 100)
      }

      if (this.value !== val) {
        this.$emit('on-change', val)
      }
    },
    onMouseDown (e) {
      this.onChange(e)
      window.addEventListener('mousemove', this.onChange)
      window.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseUp (e) {
      this.removeListeners()
    },
    removeListeners () {
      window.removeEventListener('mousemove', this.onChange)
      window.removeEventListener('mouseup', this.onMouseUp)
    }
  }
}
</script>

<style lang="scss">
.color-slider {
  position: relative;
  height: 10px;
  border-radius: 2px;
  background: url(../../../../assets/img/alpha_bg.png);
  .pointer {
    position: absolute;
    width: 14px;
    height: 14px;
    top: -2px;
    cursor: pointer;
    margin-left: -7px;
    border-radius: 50%;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .6);
    background: #f5f5f5;
  }
}
</style>