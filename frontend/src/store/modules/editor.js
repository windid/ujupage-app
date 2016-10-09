import Vue from 'vue'
import * as types from '../mutation-types'
import { merge } from 'lodash'
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
        goals: {
          first: ''
        },
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
    state.page.variations.push(variation)
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
  }

}

export default {
  state,
  mutations
}
