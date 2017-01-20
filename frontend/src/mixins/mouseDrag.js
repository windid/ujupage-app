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

class SpeedTest {
  constructor () {
    this.COUNT = 4
    this.distances = []
    this.index = 0
  }
  reset () {
    this.distances = []
    this.index = 0
  }
  add (move, duration) {
    this.distances[this.index] = {
      d: duration,
      m: move
    }
    this.index = (this.index + 1) % this.COUNT
  }

  speed () {
    const count = this.distances.length
    let sx = 0
    let sy = 0
    const m = { x: 0, y: 0 }
    let d = 0
    for (let i = 0; i < count; i++) {
      d += this.distances[i].d
      m.x += this.distances[i].m.x
      m.y += this.distances[i].m.y
    }
    if (d === 0) return 0
    sx = m.x / (d / 1000)
    sy = m.y / (d / 1000)
    return {
      x: sx,
      y: sy
    }
  }
}
const speedTest = new SpeedTest()

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
      lastDragX: null,
      lastDragY: null,
      lastDragTime: null,
      lastMovement: null
    }
  },
  methods: {
    onDragBegin (e) {
      if (!this.draggable) return
      const now = Date.now()
      this.dragStartTime = now
      this.lastDragTime = now
      this.windowOldCursor = document.body.style.cursor
      document.body.style.cursor = 'move'
      const x = e.clientX
      const y = e.clientY
      this.dragStartX = x
      this.dragStartY = y
      this.lastDragX = x
      this.lastDragY = y
      this.dragBegin()
      document.addEventListener('mousemove', this.onDragMove)
      document.addEventListener('mouseup', this.onDragEnd)
      speedTest.reset()
    },
    onDragMove (e) {
      this.dragging = true
      this.onDragCommon(e, (move, offset, options) => {
        this.dragMove(move, offset, options)
      })
    },
    onDragEnd (e) {
      document.body.style.cursor = this.windowOldCursor
      this.dragging = false
      this.dragRelease()
      this.onDragCommon(e, (move, offset, options) => {
        this.dragEnd(move, offset, options)
        this.lastMovement = null
      })
      document.removeEventListener('mousemove', this.onDragMove)
      document.removeEventListener('mouseup', this.onDragEnd)
    },
    onDragCommon (e, callback) {
      const X = e.clientX
      const Y = e.clientY
      // 当前位置对于初始位置的移动距离
      const x = X - this.dragStartX
      const y = Y - this.dragStartY

      const _tempX = Math.abs(X - this.lastDragX)
      const _tempY = Math.abs(Y - this.lastDragY)
      const now = Date.now()
      const dgap = now - this.lastDragTime
      speedTest.add({ x: _tempX, y: _tempY }, dgap)

      this.lastDragX = X
      this.lastDragY = Y
      if (movable(x, y, this.dragStartTime)) {
        let offset
        if (this.lastMovement === null) {
          offset = { x, y }
        } else {
          offset = {
            x: X - this.lastMovement.x,
            y: Y - this.lastMovement.y
          }
        }
        this.lastMovement = {
          x: X,
          y: Y
        }
        const options = {
          speed: speedTest.speed()
        }
        callback({ x, y }, offset, options)
      }
    },
    /**
     * <h2>Virtual methods</h2>
     * These methods should be implemented in real instances.
     */
    dragBegin () {},
    dragMove (move, offset, options) {},
    dragEnd (move, offset, options) {},
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
