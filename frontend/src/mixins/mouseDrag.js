/** @module mouseDrag
 * <h1>`mouseDrag` mixin</h1>
 * 可以被需要用鼠标拖动的组件继承
 * 组件需要实现以下接口：
 * dragBegin()
 * dragMove(movement)
 * dragEnd(movement)
 * dragEnable()
 * dragDisable()
 */

export default {
  props: {
    draggable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dragging: false,
      windowOldCursor: '',
      dragStartX: 0,
      dragStartY: 0
    }
  },
  methods: {
    onDragBegin (e) {
      if (!this.draggable) return
      this.windowOldCursor = document.body.style.cursor
      document.body.style.cursor = 'move'
      this.dragStartX = e.clientX
      this.dragStartY = e.clientY
      this.dragBegin({})
      document.addEventListener('mousemove', this.onDragMove)
      document.addEventListener('mouseup', this.onDragEnd)
    },
    onDragMove (e) {
      const x = e.clientX - this.dragStartX
      const y = e.clientY - this.dragStartY
      this.dragging = true
      this.dragMove({ x, y })
    },
    onDragEnd (e) {
      document.body.style.cursor = this.windowOldCursor
      const x = e.clientX - this.dragStartX
      const y = e.clientY - this.dragStartY
      this.dragging = false
      this.dragEnd({ x, y })
      document.removeEventListener('mousemove', this.onDragMove)
      document.removeEventListener('mouseup', this.onDragEnd)
    },
    /**
     * <h2>Virtual methods</h2>
     * These methods should be implemented in real instances.
     */
    dragBegin () {},
    dragMove (movement) {},
    dragEnd (movement) {},
    dragEnable () {},
    dragDisable () {}
  },
  watch: {
    'draggable': function (dragEnabled) {
      (dragEnabled) ? this.dragEnable() : this.dragDisable()
    }
  }
}
