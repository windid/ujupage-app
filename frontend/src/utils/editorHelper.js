import { findIndex, clone, cloneDeep } from 'lodash'

const ALIGNMENT_SIDES = [
  { sides: ['left', 'right', 'hcenter'], value: 'vcenter' },
  { sides: ['top', 'bottom', 'vcenter'], value: 'hcenter' }]

let ALIGN_NEXT = null

// 所有元素的位置及尺寸信息
let ALIGN_ELEMENTS = []

/**
 * 当存在对齐时，下一个动作的位移生效的最小变化量
 */
const ALIGN_BREAK_THRESHOLD = 3

const OFFSET_CACHE = {
  x: 0, y: 0,
  forward: { x: 0, y: 0 },
  status: { x: false, y: false }
}

let offsetCache = cloneDeep(OFFSET_CACHE)
// let currentEl = {}

export const elementAdd = (element) => {
  ALIGN_ELEMENTS.push(element)
}

export const elementUpdate = (element) => {
  const index = findIndex(ALIGN_ELEMENTS, e => e.id === element.id)
  if (index >= 0) {
    ALIGN_ELEMENTS[index] = element
  } else {
    ALIGN_ELEMENTS.push(element)
  }
}

export const elementRemove = (mid) => {
  ALIGN_ELEMENTS = ALIGN_ELEMENTS.filter(e => mid !== e.mid)
}

/**
 * 计算当前元素有哪些可能的对齐情况
 */
export const alignBegin = (path) => {
  const forward = path.forward
  return {
    x: {
      positive: forward.x >= ALIGN_NEXT.x.positive,
      negative: forward.x <= ALIGN_NEXT.x.negative
    },
    y: {
      positive: forward.y >= ALIGN_NEXT.y.positive,
      negative: forward.y >= ALIGN_NEXT.y.negative
    }
  }
}

export const alignNext = (path) => {
  const move = path.movement
  const forward = path.forward
  const alignStatus = offsetCache.status
  let offsetX = move.x
  let offsetY = move.y
  const xBreak = Math.abs(offsetCache.forward.x) >= ALIGN_BREAK_THRESHOLD
  if (alignStatus.y) {
    offsetCache.forward.x += forward.x
    if (!xBreak) {
      offsetX = offsetCache.x
    }
  } else {
    offsetCache.forward.x = 0
    offsetCache.x = move.x
  }
  const yBreak = Math.abs(offsetCache.forward.y) >= ALIGN_BREAK_THRESHOLD
  if (alignStatus.x) {
    offsetCache.y += forward.y
    if (!yBreak) {
      offsetY = offsetCache.y
    }
  } else {
    offsetCache.y = 0
  }
  return {
    x: offsetX,
    y: offsetY,
    forward: clone(offsetCache.forward),
    xMovable: !alignStatus.y || xBreak,
    yMovable: !alignStatus.x || yBreak
  }
}

// 更新对齐的线和元素
export const alignSearch = (element) => {
  const alignments = {
    left: [],
    right: [],
    top: [],
    bottom: [],
    vcenter: [],
    hcenter: []
  }

  const ids = []
  const next = {
    x: {
      positive: null,
      negative: null
    },
    y: {
      positive: null,
      negative: null
    }
  }
  ALIGN_ELEMENTS.forEach((e) => {
    if (e.id !== element.id) {
      ALIGNMENT_SIDES.forEach((group, index) => {
        const vertical = (index === 0)
        const field = vertical ? 'x' : 'y'
        const sides = group.sides
        sides.forEach(key => {
          sides.forEach(subKey => {
            const distance = element.rect[key] - e.rect[subKey]
            if (distance === 0) {
              if (ids.indexOf(e.id) < 0) {
                ids.push(e.id)
              }
              alignments[key].push(e.rect[group.value])
            } else {
              // 缓存最接近对齐的结果，以便下一次搜索使用
              const directtion = distance > 0 ? 'positive' : 'negative'
              const fn = distance > 0 ? Math.min : Math.max
              next[field][directtion] = next[field][directtion] === null ? distance : fn(next[field][directtion], distance)
            }
          })
        })
      })
    }
  })
  ALIGN_NEXT = next

  const status = {
    x: false,
    y: false
  }
  const lines = []
  ALIGNMENT_SIDES.forEach((group, index) => {
    // 水平方向未移动或垂直方向未移动
    const sides = group.sides
    const vertical = (index === 0)
    sides.forEach(key => {
      const sizes = alignments[key]
      if (sizes.length <= 0) return
      const value = element.rect[group.value]
      const min = Math.min(...sizes, value)
      const max = Math.max(...sizes, value)
      status[vertical ? 'y' : 'x'] = true
      const line = {
        vertical,
        length: max - min,
        min,
        max,
        vAxis: element.rect[key],
        dotSide: {
          main: vertical ? 'top' : 'left',
          sub: vertical ? 'left' : 'top'
        },
        dots: [...sizes, value]
      }
      lines.push(line)
    })
  })

  const alignStatus = offsetCache.status
  /** 有新对齐的情况下需要重新设置缓存 */
  if (!alignStatus.x && status.x && element.yUpdated) {
  }
  if (!alignStatus.y && status.y && element.xUpdated) {
  }

  offsetCache.status = clone(status)
  return {
    ids,
    lines,
    status
  }
}

export const alignEnd = () => {
  offsetCache = cloneDeep(OFFSET_CACHE)
}

// 多选
function isOverlap (lhs, rhs) {
  let x = false
  let y = false
  if (lhs.left >= rhs.left) {
    x = (lhs.left - rhs.left) <= rhs.width
  } else {
    x = (rhs.left - lhs.left) <= lhs.width
  }
  if (lhs.top >= rhs.top) {
    y = (lhs.top - rhs.top) <= rhs.height
  } else {
    y = (rhs.top - lhs.top) <= lhs.height
  }
  return x && y
}

export const multiSelect = (selection) => {
  const ids = []
  const rect = selection.rect
  const computedRect = {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  }
  const origin = selection.origin
  computedRect.left -= origin.left
  const sl = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
  ALIGN_ELEMENTS.forEach(e => {
    if (isOverlap(e.rect, computedRect)) {
      if (ids.length <= 0) {
        sl.left = e.rect.left
        sl.right = e.rect.right
        sl.top = e.rect.top
        sl.bottom = e.rect.bottom
      } else {
        sl.left = Math.min(sl.left, e.rect.left)
        sl.top = Math.min(sl.top, e.rect.top)
        sl.right = Math.max(sl.right, e.rect.right)
        sl.bottom = Math.max(sl.bottom, e.rect.bottom)
      }
      ids.push(e.id)
    }
  })
  return ids
}
