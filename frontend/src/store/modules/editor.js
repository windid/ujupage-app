import Vue from 'vue'
import * as types from '../mutation-types'
import { merge, clone } from 'lodash'
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
      lines: { vertical: [], horizontal: [] }
    },
    multi: {
      move: null
    },
    selection: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      visible: false
    },
    updatedSection: null
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
    // 清理
    state.assist.activeIds = []
    state.assist.selection.visible = false
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
    // 清理
    state.assist.activeIds = []
    state.assist.selection.visible = false
  },

  // 在移动版和桌面版之间切换
  [types.SWITCH_VERSION] (state, { version }) {
    if (version !== state.workspace.version) {
      state.workspace.version = version
      state.workspace.width = state.workspace.version === 'pc' ? 960 : 360
      state.assist.activeIds = []
      state.assist.selection = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        visible: false
      }
    }
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
    state.assist.updatedSection = {
      id: sectionId
    }
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
      const oldElements = state.content.sections[sectionId]['elements'][state.workspace.version]
      const index = oldElements.indexOf(elementId)
      oldElements.splice(index, 1)
      const newElements = state.content.sections[newSectionId]['elements'][state.workspace.version]

      newElements.push(elementId)
    }
  },

  [types.UPDATE_MULTI_MOVE] (state, payload) {
    state.assist.multi.move = payload
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

  [types.ALIGN_UPDATE] (state, data) {
    const neq = (lhs, rhs) => lhs.length !== 0 || rhs.length !== 0
    if (neq(state.assist.activeIds, data.ids)) {
      state.assist.activeIds = data.ids
    }
    if (neq(state.assist.align.lines.vertical, data.lines.vertical)) {
      state.assist.align.lines.vertical = data.lines.vertical
    }
    if (neq(state.assist.align.lines.horizontal, data.lines.horizontal)) {
      state.assist.align.lines.horizontal = data.lines.horizontal
    }
  },

  [types.ALIGN_CLEAR] (state) {
    state.assist.align.lines = { vertical: [], horizontal: [] }
    state.assist.activeIds = []
  },

  [types.MULTI_SELECT_UPDATE] (state, result) {
    state.assist.activeIds = result.ids
    state.assist.selection = result.selection
  },

  [types.MULTI_SELECT_DONE] (state) {
    const ids = state.assist.activeIds
    const hasSelection = ids.length > 0
    state.assist.selection.visible = hasSelection
  },

  [types.MULTI_SELECT_CLEAR] (state) {
    state.assist.activeIds = []
    const newState = clone(state.assist.selection)
    state.assist.selection = newState
    state.assist.selection.visible = false
  }

}

export default {
  state,
  mutations
}
