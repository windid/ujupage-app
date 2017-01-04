import Vue from 'vue'
import * as types from '../mutation-types'
import { merge, findIndex } from 'lodash'
import randomChar from '../../utils/randomChar'

const state = {
  workspace: {
    // 页面宽度，桌面960，移动360
    width: 360,
    // pc为桌面版，mobile为移动版
    version: 'mobile',
    // 编辑状态中的板块id
    activeSectionId: null,
    // 被选中的元素id
    activeElementId: '',
    // 编辑状态中的AB测试版本
    activeVariation: null,
    // 保存状态
    saveStatus: 'saved'
  },

  page: {},

  // 编辑的页面内容
  content: {},

  // 元素的尺寸数据，主要用于缩放及移动过程中的对齐、多个元素选择操作等
  assist: {
    activeIds: [],
    elements: [],
    align: {
      lines: [],
      status: {
        x: false,
        y: false
      }
    },
    selection: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      visible: false
    }
  },

  // 历史记录，用于撤销重做
  history: {
    states: [],
    index: 0,
    saved: {}
  }
}

const mutations = {
  [types.LOAD_PAGE] (state, { page }) {
    state.page = merge({}, page)
  },

  [types.LOAD_VARIATION] (state, { variation, content }) {
    const defaultContent = {
      settings: {
        seo: {
          pageTitle: '',
          keywords: '',
          description: ''
        },
        goals: [],
        code: {
          header: '',
          bodyIn: '',
          bodyOut: ''
        },
        style: {
          width: {
            pc: 960,
            mobile: 360
          }
        }
      },
      colorSet: ['#FCFFF5', '#D1DBBD', '#91AA9D', '#3E606F', '#193441'],
      sections: [],
      elements: {}
    }
    state.workspace.activeVariation = variation
    state.content = merge({}, defaultContent, content)
    state.history.states = [merge({}, state.content)]
    state.history.index = 0
    state.history.saved = merge({}, state.content)
  },

  // 保存
  [types.SAVE_VARIATION] (state) {
    state.history.saved = merge({}, state.content)
  },

  // 创建新的AB测试版本
  [types.CREATE_VARIATION] (state, { variation }) {
    if (state.page.variations) {
      state.page.variations.push(variation)
    }
  },

  // 删除AB测试版本
  [types.REMOVE_VARIATION] (state, { variation }) {
    state.page.variations.splice(state.page.variations.indexOf(variation), 1)
  },

  // 重命名AB测试版本
  [types.RENAME_VARIATION] (state, { variation, newName }) {
    variation.name = newName
    state.workspace.activeVariation.id === variation.id && (state.workspace.activeVariation = variation)
  },

  // 流量分配
  [types.TRAFIC_SPLIT] (state, { traficWeights }) {
    state.page.variations.forEach(variation => {
      variation.quota = traficWeights[variation.id]
    })
  },

  // 保存设置
  [types.SAVE_SETTINGS] (state, { settings }) {
    state.content.settings = settings
  },

  // 保存历史记录
  [types.SAVE_CONTENT_STATE] (state) {
    state.history.index++
    state.history.states = state.history.states.slice(0, state.history.index)
    state.history.states.push(merge({}, state.content))
    state.workspace.undo = true
    state.workspace.redo = false
  },

  // 撤销
  [types.UNDO] (state) {
    if (state.history.index >= 1) {
      state.history.index--
      state.content = merge({}, state.history.states[state.history.index])
      // 控制按钮是否可点击
      state.workspace.redo = true
      if (state.history.index < 1) {
        state.workspace.undo = false
      }
    }
  },

  // 重做
  [types.REDO] (state) {
    if (state.history.states.length > state.history.index + 1) {
      state.history.index++
      state.content = merge({}, state.history.states[state.history.index])
      // 控制按钮是否可点击
      state.workspace.undo = true
      if (state.history.states.length === state.history.index + 1) {
        state.workspace.redo = false
      }
    }
  },

  // 在移动版和桌面版之间切换
  [types.SWITCH_VERSION] (state, { version }) {
    state.workspace.version = version
    state.workspace.width = state.workspace.version === 'pc' ? 960 : 360
  },

  // 设置配色方案
  [types.SET_COLOR_SET] (state, { colorSet }) {
    state.content.colorSet = colorSet
  },

  // 添加板块
  [types.ADD_SECTION] (state, { section }) {
    state.content.sections.push(section)
  },

  // 移动板块
  [types.MOVE_SECTION] (state, { sourceId, targetId }) {
    state.content.sections[sourceId] = state.content.sections.splice(targetId, 1, state.content.sections[sourceId])[0]
  },

  // 删除板块
  [types.REMOVE_SECTION] (state, { sectionId }) {
    state.content.sections.splice(sectionId, 1)
  },

  // 修改板块
  [types.MODIFY_SECTION] (state, { sectionId, style }) {
    state.content.sections[sectionId].style = merge({}, state.content.sections[sectionId].style, style)
  },

  // 设置在编辑状态中的板块
  [types.SET_ACTIVE_SECTION_ID] (state, { sectionId }) {
    state.workspace.activeSectionId = sectionId
  },

  // 设置选中的元素
  [types.SET_ACTIVE_ELEMENT_ID] (state, { elementId }) {
    state.workspace.activeElementId = elementId
  },

  // 修改元素
  [types.MODIFY_ELEMENT] (state, { elementId, newElement }) {
    Vue.set(state.content.elements, elementId, merge({}, newElement))
  },

  // 添加元素
  [types.ADD_ELEMENT] (state, { sectionId, element }) {
    const elementId = randomChar(8)
    Vue.set(state.content.elements, elementId, element)

    state.content.sections[sectionId]['elements']['pc'].push(elementId)
    state.content.sections[sectionId]['elements']['mobile'].push(elementId)
    state.workspace.activeElementId = elementId
  },

  // 复制元素
  [types.DUPULICATE_ELEMENT] (state, { newElement, sectionIds }) {
    const elementId = randomChar(8)
    Vue.set(state.content.elements, elementId, newElement)

    if (sectionIds['pc'] !== null) {
      state.content.sections[sectionIds['pc']]['elements']['pc'].push(elementId)
    }
    if (sectionIds['mobile'] !== null) {
      state.content.sections[sectionIds['mobile']]['elements']['mobile'].push(elementId)
    }
    state.workspace.activeElementId = elementId
  },

  [types.MOVE_ELEMENT] (state, { elementId, newElement, sectionId, newSectionId }) {
    Vue.set(state.content.elements, elementId, merge({}, newElement))
    if (sectionId !== newSectionId) {
      state.content.sections[sectionId]['elements'][state.workspace.version].splice(state.content.sections[sectionId]['elements'][state.workspace.version].indexOf(elementId), 1)
      state.content.sections[newSectionId]['elements'][state.workspace.version].push(elementId)
    }
  },

  [types.REMOVE_ELEMENT] (state, { elementId, sectionIds }) {
    if (sectionIds['pc'] !== null) {
      state.content.sections[sectionIds['pc']].elements.pc.splice(state.content.sections[sectionIds['pc']].elements.pc.indexOf(elementId), 1)
    }
    if (sectionIds['mobile'] !== null) {
      state.content.sections[sectionIds['mobile']].elements.mobile.splice(state.content.sections[sectionIds['mobile']].elements.mobile.indexOf(elementId), 1)
    }
    Vue.delete(state.content.elements, elementId)
  },

  // 对齐辅助功能的数据的操作
  [types.ALIGN_ADD_ELEMENT] (state, element) {
    state.assist.elements.push(element)
  },

  [types.ALIGN_MODIFY_ELEMENT] (state, element) {
    const index = findIndex(state.assist.elements, (e) => e.mid === element.mid)
    if (index >= 0) {
      state.assist.elements[index] = element
    } else {
      state.assist.elements.push(element)
    }
  },

  [types.ALIGN_REMOVE_ELEMENT] (state, mid) {
    state.assist.elements = state.assist.elements.filter(e => mid !== e.mid)
  },

  [types.ALIGN_UPDATE] (state, element) {
    // 更新对齐的线和元素
    const ALIGNMENT_SIDES = [
      {
        sides: ['left', 'right', 'hcenter'],
        value: 'vcenter'
      },
      {
        sides: ['top', 'bottom', 'vcenter'],
        value: 'hcenter'
      }]
    const alignments = {
      left: [],
      right: [],
      top: [],
      bottom: [],
      vcenter: [],
      hcenter: []
    }
    // clear
    state.assist.align.lines = []
    state.assist.activeIds = []
    // find alignments
    state.assist.elements.forEach((e) => {
      if (e.id !== element.id) {
        ALIGNMENT_SIDES.forEach((group, index) => {
          const sides = group.sides
          sides.forEach((key) => {
            sides.forEach((subKey) => {
              const distance = element.rect[key] - e.rect[subKey]
              if (distance === 0) {
                if (state.assist.activeIds.indexOf(e.id) < 0) {
                  state.assist.activeIds.push(e.id)
                }
                alignments[key].push(e.rect[group.value])
              }
            })
          })
        })
      }
    })

    let alignX = false
    let alignY = false
    const lines = []
    ALIGNMENT_SIDES.forEach((group, i) => {
      const sides = group.sides
      sides.forEach((key) => {
        const sizes = alignments[key]
        if (sizes.length <= 0) return
        const value = element.rect[group.value]
        const min = Math.min(...sizes, value)
        const max = Math.max(...sizes, value)
        const vertical = (i === 0)
        if (vertical) {
          alignY = true
        } else {
          alignX = true
        }
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
    state.assist.align.lines = lines
    state.assist.align.status = {
      x: alignX,
      y: alignY
    }
  },

  [types.ALIGN_CLEAR] (state) {
    state.assist.align.lines = []
    state.assist.activeIds = []
    state.assist.align.status = {
      x: false,
      y: false
    }
  },

  [types.MULTI_SELECT_UPDATE] (state, selection) {
    state.assist.activeIds = []
    const rect = selection.rect
    const computedRect = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height
    }
    const origin = selection.origin
    computedRect.left -= origin.left
    state.assist.elements.forEach(e => {
      if (isOverlap(e.rect, computedRect)) {
        const sl = state.assist.selection
        if (state.assist.activeIds.length <= 0) {
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
        state.assist.activeIds.push(e.id)
      }
    })
  },

  [types.MULTI_SELECT_DONE] (state) {
    const ids = state.assist.activeIds
    const hasSelection = ids.length > 0
    state.assist.selection.visible = hasSelection
  },

  [types.MULTI_SELECT_CLEAR] (state) {
    state.assist.activeIds = []
    state.assist.selection.visible = false
  }

}

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

export default {
  state,
  mutations
}
