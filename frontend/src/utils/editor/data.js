import { findIndex } from 'lodash'

// 所有元素的位置及尺寸
class DimensManager {
  constructor () {
    this.data = []
  }

  /** 增加元素 */
  add (element) {
    this.data.push(element)
  }

  /** 更新元素 */
  update (element) {
    const index = findIndex(this.data, e => e.id === element.id)
    if (index >= 0) {
      this.data[index] = element
    } else {
      this.data.push(element)
    }
  }

  moveElement (elemenetId, move) {
    this.loop(e => {
      if (e.id === elemenetId) {
        e.rect.left += move.x
        e.rect.right += move.x
        e.rect.hcenter += move.x
        e.rect.top += move.y
        e.rect.bottom += move.y
        e.rect.vcenter += move.y
        e.positionInPage.left += move.x
        e.positionInPage.top += move.y
      }
    })
  }

  moveElements (elements, move) {
    for (let i = 0; i < elements.length; i++) {
      const id = elements[i].id
      this.moveElement(id, move)
    }
  }

  updateResize (elements, move) {}

  /** 移除元素 */
  remove (mid) {
    this.data = this.data.filter(e => mid !== e.mid)
  }

  /** 查找元素 */
  indexOf (elementId) {
    const index = findIndex(this.data, e => e.id === elementId)
    return index
  }

  get (id) {
    return this.data[id]
  }

  /** 遍历所有元素 */
  loop (callback) {
    for (let i = 0; i < this.data.length; i++) {
      callback(this.data[i])
    }
  }

  loopAll (element, callback) {
    for (let i = 0; i < this.data.length; i++) {
      const e = this.data[i]
      if (element.id === e.id) continue
      callback(e)
    }
  }

}

export default DimensManager
