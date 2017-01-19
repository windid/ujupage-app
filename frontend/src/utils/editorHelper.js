import { findIndex, clone, cloneDeep, uniq } from 'lodash'

const ALIGNMENT_SIDES = [
  { sides: ['left', 'right', 'hcenter'], value: 'vcenter' },
  { sides: ['top', 'bottom', 'vcenter'], value: 'hcenter' }]

let ALIGN_NEXT = null

// 所有元素的位置及尺寸信息
let ALIGN_ELEMENTS = []

/**
 * 当存在对齐时，下一个动作的位移生效的最小变化量
 */
const ALIGN_BREAK_THRESHOLD = 5

const MOVE_CACHE = {
  x: 0, y: 0,
  offset: { x: 0, y: 0 },
  status: { x: false, y: false }
}

// 是否为某次移动中的首次
let firstMove = false
let moveCache = cloneDeep(MOVE_CACHE)
let currentElement = null

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

// 元素操作准备开始
export const alignBegin = (elementId) => {
  firstMove = true
  const index = findIndex(ALIGN_ELEMENTS, e => e.id === elementId)
  if (index >= 0) {
    currentElement = ALIGN_ELEMENTS[index]
    alignFindAll()
  }
  alignSearch({
    x: 0, y: 0
  })
}

// 检测当前的移动是否已经达到下一个对齐的范围
const hasNext = (move, offset) => {
  const hasMove = {
    x: moveCache.x !== move.x,
    y: moveCache.y !== move.y
  }
  let next = null
  if (ALIGN_NEXT === null) {
    next = true
  } else {
    ['x', 'y'].forEach(i => {
      const m = move[i]
      const n = ALIGN_NEXT[i][ m > 0 ? 'positive' : 'negative']
      const cond = n.indexOf(m) >= 0
      next = (next === null) ? cond : (next || cond)

      if (hasMove[i] || !moveCache.status[i]) {
      }
    })
  }
  return {
    state: next,
    hasMove
  }
}

const checkAlignBreak = () => {
  const xBreak = Math.abs(moveCache.offset.x) >= ALIGN_BREAK_THRESHOLD
  const yBreak = Math.abs(moveCache.offset.y) >= ALIGN_BREAK_THRESHOLD
  return {
    x: xBreak,
    y: yBreak
  }
}

export const alignNext = (path) => {
  const move = path.move
  const offset = path.offset
  const quickMove = path.options.speed >= 2
  const alignStatus = moveCache.status

  let moveX = move.x
  let moveY = move.y
  let shouldAlignUpdate = false
  let unchange = null
  if (firstMove) {
    moveCache.offset.x = 0
    moveCache.offset.y = 0
    shouldAlignUpdate = true
    firstMove = false

    moveCache.x = moveX
    moveCache.y = moveY
  } else {
    moveCache.offset.x += offset.x
    moveCache.offset.y += offset.y

    if (!quickMove) {
      // 是否已达到下一次的对齐位置
      const _hasNext = hasNext(move, offset)
      unchange = _hasNext.hasMove
      if (_hasNext.state) {
        shouldAlignUpdate = true
        moveCache.x = moveX
        moveCache.y = moveY
      } else {
        shouldAlignUpdate = false
        if (alignStatus.x || alignStatus.y) {
          const breaks = checkAlignBreak()
          if (!breaks.x && alignStatus.x) {
            moveX = moveCache.x
          } else {
            moveCache.x = moveX
          }
          if (!breaks.y && alignStatus.y) {
            moveY = moveCache.y
          } else {
            moveCache.y = moveY
          }
        }
      }
    }
  }
  let alignData = null
  if (shouldAlignUpdate && !quickMove) {
    alignData = alignSearch({
      x: moveX,
      y: moveY
    })
  } else {
    const status = {
      x: false,
      y: false
    }
    moveCache.status = status
    alignData = {
      ids: [],
      status,
      lines: { horizontal: [], vertical: [] },
      unchange
    }
  }

  return {
    x: moveX,
    y: moveY,
    alignData,
    offset: clone(moveCache.offset)
  }
}

const alignFindAll = () => {
  if (currentElement === null) return
  ALIGN_NEXT = null
  const element = cloneDeep(currentElement)
  const next = {
    x: { positive: [], negative: [] },
    y: { positive: [], negative: [] }
  }
  ALIGN_ELEMENTS.forEach((e) => {
    if (e.id !== element.id) {
      ALIGNMENT_SIDES.forEach((group, index) => {
        const vertical = (index === 0)
        const field = vertical ? 'x' : 'y'
        const sides = group.sides
        sides.forEach(key => {
          sides.forEach(subKey => {
            const distance = e.rect[subKey] - element.rect[key]
            const directtion = distance > 0 ? 'positive' : 'negative'
            next[field][directtion].push(distance)
          })
        })
      })
    }
  });

  ['x', 'y'].forEach(i => {
    ['positive', 'negative'].forEach(j => {
      next[i][j] = uniq(next[i][j])
    })
  })
  ALIGN_NEXT = next
}

// 更新对齐的线和元素
export const alignSearch = (offset) => {
  if (currentElement === null) return
  const element = cloneDeep(currentElement)
  const rect = element.rect
  if (offset) {
    ['left', 'right', 'hcenter'].forEach(v => { rect[v] += offset.x });
    ['top', 'bottom', 'vcenter'].forEach(v => { rect[v] += offset.y })
  }
  const alignments = {
    left: [], right: [], hcenter: [],
    top: [], bottom: [], vcenter: []
  }

  const ids = []
  ALIGN_ELEMENTS.forEach((e) => {
    if (e.id !== element.id) {
      ALIGNMENT_SIDES.forEach((group, index) => {
        const sides = group.sides
        sides.forEach(key => {
          sides.forEach(subKey => {
            const distance = element.rect[key] - e.rect[subKey]
            if (distance === 0) {
              if (ids.indexOf(e.id) < 0) {
                ids.push(e.id)
              }
              alignments[key].push(e.rect[group.value])
            }
          })
        })
      })
    }
  })

  const status = {
    x: false,
    y: false
  }
  const lines = { vertical: [], horizontal: [] }
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
      status[vertical ? 'x' : 'y'] = true
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
      lines[vertical ? 'vertical' : 'horizontal'].push(line)
    })
  })

  if (status.x) {
    moveCache.offset.x = 0
    moveCache.x = offset.x
  }
  if (status.y) {
    moveCache.offset.y = 0
    moveCache.y = offset.y
  }
  moveCache.status = clone(status)
  return {
    ids,
    lines,
    status
  }
}

export const alignEnd = () => {
  moveCache = cloneDeep(MOVE_CACHE)
  ALIGN_NEXT = null
  firstMove = true
  currentElement = null
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
