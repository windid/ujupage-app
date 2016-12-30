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
const HUGE_TIME_THRESHOLD = 1000

function movable (x, y, timeStart) {
  const timeLapse = Date.now() - timeStart
  const condTime = timeLapse > TIME_THRESHOLD
  const condHugeTime = timeLapse > HUGE_TIME_THRESHOLD
  const condMove = Math.abs(x) > MOVE_THRESHOLD || Math.abs(y) > MOVE_THRESHOLD
  const condHugeMove = Math.abs(x) > HUGE_MOVE_THRESHOLD || Math.abs(y) > HUGE_MOVE_THRESHOLD
  return (condTime && condMove) || condHugeMove || condHugeTime
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
      dragStartTime: 0,
      lastMovement: null
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
      this.dragging = true
      this.onDragCommon(e, (movement, forward) => {
        this.dragMove(movement, forward)
      })
    },
    onDragEnd (e) {
      document.body.style.cursor = this.windowOldCursor
      this.dragging = false
      this.dragRelease()
      this.onDragCommon(e, (movement, forward) => {
        this.dragEnd(movement, forward)
        this.lastMovement = null
      })
      document.removeEventListener('mousemove', this.onDragMove)
      document.removeEventListener('mouseup', this.onDragEnd)
    },
    onDragCommon (e, callback) {
      const x = e.clientX - this.dragStartX
      const y = e.clientY - this.dragStartY
      if (movable(x, y, this.dragStartTime)) {
        let forward
        if (this.lastMovement === null) {
          forward = { x, y }
        } else {
          forward = {
            x: e.clientX - this.lastMovement.x,
            y: e.clientY - this.lastMovement.y
          }
        }
        this.lastMovement = {
          x: e.clientX,
          y: e.clientY
        }
        callback({ x, y }, forward)
      }
    },
    /**
     * <h2>Virtual methods</h2>
     * These methods should be implemented in real instances.
     */
    dragBegin () {},
    dragMove (movement, forward) {},
    dragEnd (movement, forward) {},
    dragRelease () {},
    dragEnable () {},
    dragDisable () {}
  },
  watch: {
    'draggable': function (dragEnabled) {
      dragEnabled ? this.dragEnable() : this.dragDisable()
    }
  }
}
