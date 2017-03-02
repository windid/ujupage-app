import { clone } from 'lodash'

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

const DIR_LEFT = 1
const DIR_RIGHT = 2
const DIR_CENTER = 3

// 多选操作
class MultiSelect {
  constructor (dataManger) {
    this.dm = dataManger
    this.data = []
    this.selection = null
  }

  select (selection) {
    const ids = []
    const elements = []
    const rect = selection.rect
    const computedRect = clone(rect)
    const origin = selection.origin
    computedRect.left -= origin.left
    const sl = {}
    this.dm.loop(e => {
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
        elements.push(e)
      }
    })
    this.data = elements
    this.selection = sl
    return {
      ids,
      selection: sl
    }
  }

  get () {
    return this.data
  }

  move (elements) {
    for (let i = 0; i < elements.length; i++) {
      const e = elements[i]
      for (let j = 0; j < this.data.length; j++) {
        const mE = elements[j]
        if (mE.id === e.id) {
          e.sectionId = mE.sectionId
        }
      }
    }
  }

  alignLeft () {
    return this.alignMove(DIR_LEFT)
  }
  alignCenter () {
    return this.alignMove(DIR_CENTER)
  }
  alignRight () {
    return this.alignMove(DIR_RIGHT)
  }

  alignMove (direction) {
    const s = this.selection
    if (s === null) return null
    const moves = []
    for (let i = 0; i < this.data.length; i++) {
      const e = this.data[i]
      let move = s.left - e.rect.left
      switch (direction) {
        // 左对齐
        case DIR_LEFT: break
        // 居中对齐
        case DIR_CENTER:
          move += (s.right - s.left) / 2 - e.rect.width / 2
          break
        // 右对齐
        case DIR_RIGHT:
          move += (s.right - s.left) - e.rect.width
          break
      }
      moves.push({ element: e, move })
    }
    return moves
  }
}

export default MultiSelect
