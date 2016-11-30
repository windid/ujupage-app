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

const MOVE_THRESHOLD = 9
const HUGE_MOVE_THRESHOLD = 40
const TIME_THRESHOLD = 1000 * 0.12 // 毫秒

function movable (x, y, timeStart) {
  const now = Date.now()
  const condTime = (now - timeStart) > TIME_THRESHOLD
  const condMove = Math.abs(x) > MOVE_THRESHOLD || Math.abs(y) > MOVE_THRESHOLD
  const condHugeMove = Math.abs(x) > HUGE_MOVE_THRESHOLD || Math.abs(y) > HUGE_MOVE_THRESHOLD
  return (condTime && condMove) || condHugeMove
}

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
      dragStartY: 0,
      dragStartTime: 0
    }
  },
  methods: {
    onDragBegin (e) {
      if (!this.draggable) return
      this.dragStartTime = Date.now()
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
      if (movable(x, y, this.dragStartTime)) {
        this.dragMove({ x, y })
      }
    },
    onDragEnd (e) {
      document.body.style.cursor = this.windowOldCursor
      const x = e.clientX - this.dragStartX
      const y = e.clientY - this.dragStartY
      this.dragging = false
      if (movable(x, y, this.dragStartTime)) {
        this.dragEnd({ x, y })
      }
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
