<template>
  <div :is="tag" class="vscrollbar-container" ref="container" @wheel.prevent.stop="onWheel">
    <slot></slot>
    <div class="vscrollbar" ref="bar" v-show="isScrolling" :style="barStyle"></div>
  </div>
</template>

<script>
function getDeltaYFromEvent (e) {
  e = e || window.WheelEvent
  let deltaY = 0

  if (e.deltaY === undefined) {
    deltaY = e.wheelDeltaY / 6
  } else {
    deltaY = -1 * e.deltaY
  }

  if (e.deltaMode && e.deltaMode === 1) {
    deltaY *= 10
  }

  if (isNaN(deltaY)) {
    deltaY = e.wheelDelta
  }

  return deltaY
}

export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      containerHeight: null,
      contentHeight: null,
      scrollTop: 0,
      isScrolling: false
    }
  },
  mounted () {
    this.setViewData()
  },
  computed: {
    barHeight () {
      return Math.floor(this.containerHeight / this.contentHeight * this.containerHeight)
    },
    barTop () {
      const top = this.scrollTop
      return top + parseInt(top * (this.containerHeight - this.barHeight) / (this.contentHeight - this.containerHeight))
    },
    barStyle () {
      return {
        height: this.barHeight + 'px',
        top: this.barTop + 'px'
      }
    }
  },
  methods: {
    setViewData () {
      const container = this.$refs.container
      this.containerHeight = container.clientHeight
      this.contentHeight = container.scrollHeight
      this.scrollTop = container.scrollTop
    },
    updateScrollTop (value) {
      if (value < 0) {
        this.scrollTop = 0
      } else if (value > this.contentHeight - this.containerHeight) {
        this.scrollTop = this.contentHeight - this.containerHeight
      } else {
        this.scrollTop = value
      }
    },
    onWheel (e) {
      this.setViewData()
      if (this.containerHeight < this.contentHeight) {
        clearTimeout(this._timeout)
        this.isScrolling = true
        const deltaY = getDeltaYFromEvent(e)
        this.updateScrollTop(this.scrollTop - deltaY)
        this._timeout = setTimeout(() => {
          this.isScrolling = false
        }, 1000)
      }
    }
  },
  watch: {
    scrollTop (v) {
      this.$refs.container.scrollTop = v
    }
  }
}
</script>

<style lang="scss" scoped>
.vscrollbar-container {
  position: relative !important;
  overflow: hidden !important;
}
.vscrollbar {
  position: absolute;
  top: 100px;
  right: 2px;
  width: 7px;
  border-radius: 6px;
  background-color: rgba(0,0,0,.5);
}

</style>