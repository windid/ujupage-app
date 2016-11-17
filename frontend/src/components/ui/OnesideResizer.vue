<script>
function hasScrollToBottom (e) {
  if (e.toElement) {
    return e.toElement === document.querySelector('html')
  } else if (e.target) {
    /* firefox */
    return e.target === document
  } else {
    return false
  }
}

export default {
  name: 'oneside-resizer',
  props: {
    'offset': {
      type: Number,
      'default': 0
    },
    'extent': {
      type: Number,
      'default': 10
    },
    'minSize': {
      type: Number,
      'default': 0
    },
    'defaultSize': {
      type: Number,
      'default': -1
    },
    'maxSize': {
      type: Number,
      'default': Number.MAX_VALUE
    },
    'side': {
      type: String,
      'default': 'right'
    },
    'size': {
      type: Number,
      required: false
    },
    'autoStyle': {
      type: Boolean,
      default: true
    }
  },
  computed: {
    horizontal: function () {
      return this.side === 'left' || this.side === 'right'
    },
    plus: function () {
      return this.side === 'right' || this.side === 'bottom'
    },
    style: function () {
      if (!this.autoStyle) return ({})
      var style
      if (this.horizontal) {
        style = {
          width: this.extent + 'px',
          height: '100%',
          top: '0',
          cursor: 'ew-resize'
        }
      } else {
        style = {
          width: '100%',
          height: this.extent + 'px',
          left: '0',
          cursor: 'ns-resize'
        }
      }
      style[this.side] = -this.offset + 'px'
      return style
    }
  },
  data () {
    return {
      extraOffset: 0,
      prevPosition: null
    }
  },
  methods: {
    getSize () {
      if (this.size == null) {
        const style = window.getComputedStyle(this.$parent.$el)
        return parseInt(this.horizontal ? style.width : style.height)
      }
      return this.size
    },
    dragStart: function (e) {
      if (!e.defaultPrevented) {
        e.preventDefault()
        this.startSize = this.getSize()
        if (this.horizontal) {
          this.startPos = e.clientX
        } else {
          this.startPos = e.clientY
        }
        if (document.body.style.cursor != null) {
          this.oldCursor = document.body.style.cursor
        } else {
          this.oldCursor = null
        }
        document.body.style.cursor = this.style.cursor
        document.addEventListener('mousemove', this.drag)
        document.addEventListener('mouseup', this.dragEnd)
        this.$emit('resize-start', this.side)
      }
    },
    drag: function (e) {
      var moved, newSize, pos
      e.preventDefault()
      if (this.horizontal) {
        pos = e.clientX
      } else {
        pos = e.clientY
      }
      // 离始点的移动距离
      moved = pos - this.startPos
      const outOfWindow = hasScrollToBottom(e)
      if (outOfWindow) {
        this.extraOffset += 2
      }
      moved += this.extraOffset
      if (!this.plus) {
        moved = -moved
      }
      let offset = moved - this.prevPosition
      this.prevPosition = moved

      if (outOfWindow) {
        offset += 2
      } else {
        offset = null
      }
      newSize = this.startSize + moved
      if (newSize < this.minSize) {
        newSize = this.minSize
      } else if (newSize > this.maxSize) {
        newSize = this.maxSize
      }
      this.$emit('resizing', this.side, false, newSize, offset)
    },
    dragEnd: function (e) {
      e.preventDefault()
      var moved, newSize, pos
      pos = this.horizontal ? e.clientX : e.clientY
      moved = pos - this.startPos
      moved += this.extraOffset
      if (!this.plus) {
        moved = -moved
      }
      newSize = this.startSize + moved
      if (newSize < this.minSize) {
        newSize = this.minSize
      } else if (newSize > this.maxSize) {
        newSize = this.maxSize
      }
      this.prevPosition = null
      this.extraOffset = 0
      document.body.style.cursor = this.oldCursor
      document.removeEventListener('mousemove', this.drag)
      document.removeEventListener('mouseup', this.dragEnd)
      this.$emit('resize-end', this.side, true, newSize)
      return true
    }
  },
  watch: {
    'minSize': function (val) {
      if (this.getSize() < val) {
        this.size = val
      }
    },
    'maxSize': function (val) {
      if (this.getSize() > val) {
        this.size = val
      }
    }
  }
}
</script>

<template>
<div class='resize-handle'
  v-bind:style='style'
  style='stle'
  @click.stop
  @mousedown.stop='dragStart'
  v-bind:class='"resize-handle-"+side'>
</div>
</template>

<style>
  .resize-handle {
    position: absolute;
  }
  .resize-handle-left,
  .resize-handle-right {
    cursor: ew-resize;
  }
  .resize-handle-top,
  .resize-handle-bottom {
    cursor: ns-resize;
  }
  /* stles copy from jquery-ui */
  .ui-resizable {
	  position: relative;
  }
  .ui-resizable-handle {
    position: absolute;
    font-size: 0.1px;
    display: block;
    -ms-touch-action: none;
    touch-action: none;
  }
  .ui-resizable-disabled .ui-resizable-handle,
  .ui-resizable-autohide .ui-resizable-handle {
    display: none;
  }
  .ui-resizable-n {
    cursor: n-resize;
    height: 7px;
    width: 100%;
    top: -5px;
    left: 0;
  }
  .ui-resizable-s {
    cursor: s-resize;
    height: 7px;
    width: 100%;
    bottom: -5px;
    left: 0;
  }
  .ui-resizable-e {
    cursor: e-resize;
    width: 7px;
    right: -5px;
    top: 0;
    height: 100%;
  }
  .ui-resizable-w {
    cursor: w-resize;
    width: 7px;
    left: -5px;
    top: 0;
    height: 100%;
  }
  .ui-resizable-se {
    cursor: se-resize;
    width: 12px;
    height: 12px;
    right: 1px;
    bottom: 1px;
  }
  .ui-resizable-sw {
    cursor: sw-resize;
    width: 9px;
    height: 9px;
    left: -5px;
    bottom: -5px;
  }
  .ui-resizable-nw {
    cursor: nw-resize;
    width: 9px;
    height: 9px;
    left: -5px;
    top: -5px;
  }
  .ui-resizable-ne {
    cursor: ne-resize;
    width: 9px;
    height: 9px;
    right: -5px;
    top: -5px;
  }
</style>
