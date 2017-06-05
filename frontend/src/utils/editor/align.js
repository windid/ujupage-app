import { clone, cloneDeep } from 'lodash'
import { mergeArr, AlignGroup } from './alignCache'

const ALIGNMENT_SIDES = [
  { sides: ['left', 'right', 'hcenter'], value: 'vcenter' },
  { sides: ['top', 'bottom', 'vcenter'], value: 'hcenter' }]

// 当存在对齐时，下一个动作的位移生效的最小变化量
const ALIGN_BREAK_THRESHOLD = 3

const MOVE_CACHE = {
  x: 0, y: 0,
  // 从某个时间段起的累计
  offset: { x: 0, y: 0 },
  status: { x: false, y: false }
}

class AlignManager {
  constructor (dataManager) {
    this.dm = dataManager
    // 所有可能对齐的位置或尺寸信息
    this.groupCache = new AlignGroup()
    // 当下操作的元素
    this.currentElement = null
    this.firstMove = false
    // 操作的数据缓存
    this.cache = cloneDeep(MOVE_CACHE)
  }

  // 元素操作准备开始
  alignBegin (elementId) {
    this.firstMove = true
    const index = this.dm.indexOf(elementId)
    if (index < 0) return
    this.currentElement = this.dm.get(index)
    this.groupCache.reinit()
    this.alignFindAll()
  }

  alignFindAll () {
    if (this.currentElement === null) return
    const element = cloneDeep(this.currentElement)

    // 把所有对齐的情况都计算出来
    this.dm.loopAll(element, e => {
      for (let j = 0; j < 2; j++) {
        const group = ALIGNMENT_SIDES[j]
        const sides = group.sides
        const vertical = (j === 1)
        const field = vertical ? 'y' : 'x'
        for (let k = 0; k < 3; k++) {
          const key = sides[k]
          for (let l = 0; l < 3; l++) {
            const subKey = sides[l]
            // 计算距离
            const distance = e.rect[subKey] - element.rect[key]
            // 所有的都对齐情况都储存起来
            this.groupCache.addKey(field, distance)
            this.groupCache.addId(field, distance, e.id)
            this.groupCache.addEl(field, key, distance, e.rect[group.value])
          }
        }
      }
    })
  }

  // 根据当前的操作检测对齐是否会发生
  hasNext (move) {
    const hasMove = {
      x: this.cache.x !== move.x,
      y: this.cache.y !== move.y
    }
    const x = this.groupCache.findX(move.x)
    const y = this.groupCache.findY(move.y)
    return {
      state: x || y,
      hasMove
    }
  }

  checkAlignBreak () {
    const xBreak = Math.abs(this.cache.offset.x) >= ALIGN_BREAK_THRESHOLD
    const yBreak = Math.abs(this.cache.offset.y) >= ALIGN_BREAK_THRESHOLD
    return {
      x: xBreak,
      y: yBreak
    }
  }

  alignNext (path) {
    const move = path.move
    const offset = path.offset
    const quickMove = path.options.speed >= 2
    const alignStatus = this.cache.status

    let moveX = move.x
    let moveY = move.y
    let shouldUpdate = false
    let unchange = null
    if (this.firstMove) {
      shouldUpdate = true
      this.firstMove = false
      this.cache.offset.x = 0
      this.cache.offset.y = 0
      this.cache.x = moveX
      this.cache.y = moveY
    } else {
      if (this.cache.status.x) {
        this.cache.offset.x += offset.x
      }
      if (this.cache.status.y) {
        this.cache.offset.y += offset.y
      }
      if (!quickMove) {
        // 是否有移动
        if (offset.x === 0) {
        }
        if (offset.y === 0) {
        }

        // 是否已达到下一次的对齐位置
        const condX = this.groupCache.findX(move.x)
        const condY = this.groupCache.findY(move.y)
        if (condX || condY) {
          shouldUpdate = true
          this.cache.x = moveX
          this.cache.y = moveY
        } else {
          shouldUpdate = false
          if (alignStatus.x || alignStatus.y) {
            unchange = { x: false, y: false }
            const breaks = this.checkAlignBreak()
            if (!breaks.x && alignStatus.x) {
              moveX = this.cache.x
              unchange.x = true
            } else {
              this.cache.x = moveX
            }
            if (!breaks.y && alignStatus.y) {
              moveY = this.cache.y
              unchange.y = true
            } else {
              this.cache.y = moveY
            }
          }
        }
      }
    }

    let alignData = null
    if ((shouldUpdate && !quickMove) || (unchange && (unchange.x || unchange.y))) {
      alignData = this.alignSearch({
        x: moveX,
        y: moveY
      })
    } else {
      const status = this.cache.status
      const lines = { horizontal: [], vertical: [] }
      alignData = {
        ids: [],
        status,
        lines
      }
    }

    return {
      x: moveX,
      y: moveY,
      alignData,
      offset: clone(this.cache.offset)
    }
  }

  moveCurrent (offset) {
    const element = cloneDeep(this.currentElement)
    const rect = element.rect
    if (offset) {
      const h = ALIGNMENT_SIDES[0].sides
      const v = ALIGNMENT_SIDES[1].sides
      for (let i = 0; i < 3; i++) {
        rect[h[i]] += offset.x
        rect[v[i]] += offset.y
      }
    }
    return element
  }

  // 更新对齐的线和元素
  alignSearch (offset) {
    if (this.currentElement === null) return
    const element = this.moveCurrent(offset)

    const condX = this.groupCache.findX(offset.x)
    const condY = this.groupCache.findY(offset.y)
    let idX = []
    let idY = []

    const status = { x: false, y: false }
    if (condX) {
      idX = condX.ids
      status.x = true
    }
    if (condY) {
      idY = condY.ids
      status.y = true
    }
    const ids = mergeArr(idX, idY)
    // console.log(condX, condY, ids)

    const lines = { vertical: [], horizontal: [] }
    if (status.x || status.y) {
      const X = this.toLines(condX, element, true)
      const Y = this.toLines(condY, element, false)
      lines.vertical = X.lines
      lines.horizontal = Y.lines
    }

    if (status.x) {
      this.cache.offset.x = 0
      this.cache.x = offset.x
    }
    if (status.y) {
      this.cache.offset.y = 0
      this.cache.y = offset.y
    }
    this.cache.status = clone(status)
    return {
      ids,
      lines,
      status
    }
  }

  toLines (alignments, element, vertical) {
    let status = false
    const lines = []
    // 注意这里：
    if (alignments) {
      const i = vertical ? 0 : 1
      const group = ALIGNMENT_SIDES[i]
      const sides = group.sides
      sides.forEach(key => {
        const sizes = alignments[key]
        if (sizes.length <= 0) return
        const value = element.rect[group.value]
        const min = Math.min(...sizes, value)
        const max = Math.max(...sizes, value)
        status = true
        const line = {
          vertical,
          length: max - min,
          min,
          max,
          vAxis: element.rect[key],
          dots: [...sizes, value]
        }
        lines.push(line)
      })
    }
    return {
      status,
      lines
    }
  }

  convertLines (alignments, element, options) {
    const status = { x: false, y: false }
    const lines = { vertical: [], horizontal: [] }
    if (alignments !== null) {
      for (let i = 0; i < 2; i++) {
        const group = ALIGNMENT_SIDES[i]
        const sides = group.sides
        const vertical = (i === 0)
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
            dots: [...sizes, value]
          }
          lines[vertical ? 'vertical' : 'horizontal'].push(line)
        })
      }
    }
    return {
      status,
      lines
    }
  }

  alignEnd () {
    this.cache = cloneDeep(MOVE_CACHE)
    this.firstMove = true
    this.currentElement = null
  }

}

export default AlignManager
