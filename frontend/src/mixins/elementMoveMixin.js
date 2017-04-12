
export default {
  data () {
    return {
      elPositionInPage: { left: 0, top: 0 },
      // 移动对齐相关辅助属性
      offsetCache: {
        x: 0,
        y: 0
      },
      horizontalMax: [0, 0],
      verticalMax: [0, 0],
      // key*, 方向键移动相关的属性
      bounds: null,
      mountedId: null,
      keyEventAttached: false,
      keyMoveTimer: null,
      keyMoveTimestamp: null,
      keyMove: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    actualMove (movement) {
      const getMin = (v, range) => {
        const i = v < 0 ? 0 : 1
        return [Math.max, Math.min][i](range[i], v)
      }
      return {
        x: getMin(movement.x, this.horizontalMax),
        y: getMin(movement.y, this.verticalMax)
      }
    },
    getAlignmentInfo () {
      const elRectangle = this.$el.getBoundingClientRect()
      const containerRect = document.getElementById('content-area').getBoundingClientRect()
      const left = elRectangle.left - containerRect.left
      const right = elRectangle.right - containerRect.left
      const top = elRectangle.top - containerRect.top
      const bottom = elRectangle.bottom - containerRect.top
      const hcenter = Math.round(left + elRectangle.width / 2)
      const vcenter = Math.round(top + elRectangle.height / 2)
      const rect = {
        width: elRectangle.width,
        height: elRectangle.height,
        left,
        right,
        top,
        bottom,
        hcenter,
        vcenter
      }
      return rect
    },
    movePrepare () {
      this.bounds = this.getAlignmentInfo()
      if (!this.keyEventAttached) {
        document.addEventListener('keydown', this.onKey, false)
        this.keyEventAttached = true
      }
      const style = window.getComputedStyle(this.$refs.box, null)
      const getSize = (key) => parseInt(style[key])
      this.startPosLeft = getSize('left')
      this.startPosTop = getSize('top')
      const self = this.$refs.box.getBoundingClientRect()
      const box = document.getElementById('content-area').getBoundingClientRect()
      this.horizontalMax = [box.left - self.left, box.right - self.right]
      this.verticalMax = [box.top - self.top, box.bottom - self.bottom]
      this.startTop = -50 - this.$el.offsetTop
    }
  }
}
