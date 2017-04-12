import { uniq } from 'lodash'

export function mergeArr (l, r, shouldUniq) {
  const condL = l instanceof Array
  const condR = r instanceof Array
  if (condL && condR) {
    let combine = l.concat(r)
    if (shouldUniq) {
      combine = uniq(combine)
    }
    return combine
  } else {
    if (condL) {
      return l
    } else if (condR) {
      return r
    } else {
      return []
    }
  }
}

class BaseAlignCache {
  constructor () {
    this.init()
  }
  init () {
    this.data = {
      x: {}, y: {}
    }
  }
  reinit () { this.init() }
}

export class AlignGroup extends BaseAlignCache {
  addKey (field, key) {
    if (!this.data[field][key]) {
      const vertical = (field === 'y')
      this.data[field][key] = groupItem(vertical)
    }
  }
  addId (field, key, id) {
    this.data[field][key].ids.push(id)
  }
  addEl (field, side, key, value) {
    this.data[field][key][side].push(value)
  }

  findX (key) {
    return this.data.x[key]
  }
  findY (key) {
    return this.data.y[key]
  }
  find (val) {
    return {
      x: this.findX(val.x),
      y: this.findY(val.y)
    }
  }
}

function groupItem (vertical) {
  let data = {}
  if (vertical) {
    data = {
      top: [], bottom: [], vcenter: []
    }
  } else {
    data = {
      left: [], right: [], hcenter: []
    }
  }
  data.ids = []
  return data
}
