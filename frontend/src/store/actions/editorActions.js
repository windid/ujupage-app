import pageAPI from '../../api/pageAPI'
import variationAPI from '../../api/variationAPI'
import * as types from '../mutation-types'
import getParameter from '../../utils/getParameter'
import { merge } from 'lodash'

// 页面信息加载
export const pageInit = ({ commit }, pageId) => {
  pageAPI.get(pageId, page => {
    variationAPI.list(pageId, variations => {
      page.variations = variations
      commit(types.LOAD_PAGE, { page })
      const variationId = getParameter('vid') || variations[0].id
      loadVariation({ commit }, variationId)
    })
  })
}

// 加载编辑内容
export const loadVariation = ({ commit }, variationId) => {
  variationAPI.get(variationId, content => {
    commit(types.LOAD_VARIATION, { content })
  })
}

// 调整板块次序
export const moveSection = ({ commit, state }, [dir, sectionId]) => {
  let targetId = sectionId
  const sourceId = sectionId
  if (dir === 'down' && sectionId < state.editor.content.sections.length - 1) {
    targetId++
  }
  if (dir === 'up' && sectionId > 0) {
    targetId--
  }
  if (sourceId !== targetId) {
    commit(types.MOVE_SECTION, { sourceId, targetId })
    commit(types.SAVE_CONTENT_STATE)
  }
}

// 修改板块
export const modifySection = ({ commit }, [sectionId, style]) => {
  commit(types.MODIFY_SECTION, { sectionId, style })
  commit(types.SAVE_CONTENT_STATE)
}

export const removeSection = ({ commit }, sectionId) => {
  commit(types.REMOVE_SECTION, { sectionId })
  commit(types.SAVE_CONTENT_STATE)
}

// 设置编辑状态中的板块
export const setActiveSectionId = ({ commit }, sectionId) => {
  commit(types.SET_ACTIVE_SECTION_ID, { sectionId })
}

// 撤销
export const undo = ({ commit }) => {
  commit(types.UNDO)
}

// 重做
export const redo = ({ commit }) => {
  commit(types.REDO)
}

// 在移动和桌面版本间切换
export const switchVersion = ({ commit }, version) => {
  commit(types.SWITCH_VERSION, { version })
}

// 设置配色方案
export const setColorSet = ({ commit, state }, colorSet) => {
  if (colorSet !== state.editor.content.colorSet) {
    commit(types.SET_COLOR_SET, { colorSet })
    commit(types.SAVE_CONTENT_STATE)
  }
}

// 当前选中的元素
export const setActiveElementId = ({ commit }, elementId) => {
  commit(types.SET_ACTIVE_ELEMENT_ID, { elementId })
}

// 删除元素
export const removeElement = ({ commit, state }, elementId) => {
  const sectionIds = getSectionIds(state, elementId)
  commit(types.REMOVE_ELEMENT, { elementId, sectionIds })
  commit(types.SAVE_CONTENT_STATE)
}

// 移动元素
export const moveElement = ({ commit, state }, [sectionId, elementId, positionInPage, elementHeight]) => {
  let sumSectionsHeight = 0
  let sectionHeight = 0

  // 从元素中间到页头的高度
  const elementLine = positionInPage.top + elementHeight / 2

  // 计算移动后该元素落入哪个section
  let newSectionId = -1
  while (elementLine >= sumSectionsHeight) {
    newSectionId++
    sectionHeight = parseInt(state.editor.content.sections[newSectionId].style[state.editor.workspace.version].height)
    sumSectionsHeight += sectionHeight
  }

  const newElement = merge({}, state.editor.content.elements[elementId])

  newElement.style[state.editor.workspace.version].top = positionInPage.top - (sumSectionsHeight - sectionHeight) + 'px'
  newElement.style[state.editor.workspace.version].left = positionInPage.left + 'px'

  commit(types.MOVE_ELEMENT, { elementId, newElement, sectionId, newSectionId })
  commit(types.SAVE_CONTENT_STATE)
}

// 缩放元素
export const resizeElement = ({ commit, state }, [elementId, newSize]) => {
  const newElement = merge({}, state.editor.content.elements[elementId])
  const oldHeight = newElement['style'][state.editor.workspace.version]['height']
  const height = (oldHeight && oldHeight !== 'auto') ? newSize.height + 'px' : 'auto'

  newElement.style[state.editor.workspace.version]['width'] = newSize.width + 'px'
  newElement.style[state.editor.workspace.version]['height'] = height

  commit(types.MODIFY_ELEMENT, { elementId, newElement })
  commit(types.SAVE_CONTENT_STATE)
}

// 修改元素层叠关系
export const indexElement = ({ commit, state, getters }, [elementId, dir]) => {
  const newElement = merge({}, state.editor.content.elements[elementId])
  if (dir === 'top') {
    newElement.style[state.editor.workspace.version]['zIndex'] = ++getters.elementsIndex[state.editor.workspace.version].max
  } else {
    newElement.style[state.editor.workspace.version]['zIndex'] = --getters.elementsIndex[state.editor.workspace.version].min
  }

  commit(types.MODIFY_ELEMENT, { elementId, newElement })
  commit(types.SAVE_CONTENT_STATE)
}

// 修改元素
export const modifyElement = ({ commit, state }, [elementId, newPropsObj]) => {
  const newElement = merge({}, state.editor.content.elements[elementId], newPropsObj)
  commit(types.MODIFY_ELEMENT, { elementId, newElement })
  commit(types.SAVE_CONTENT_STATE)
}

// 添加元素
export const addElement = ({ commit, state }, element) => {
  if (state.editor.content.sections.length === 0) {
    // mutations.ADD_SECTION(state)
    // const sectionId = 0
  }
}

// 复制元素
export const duplicateElement = ({ commit, state, getters }, elementId) => {
  const sectionIds = getSectionIds(state, elementId)

  const newElement = merge({}, state.editor.content.elements[elementId])
  // 把新元素置于最顶
  newElement.style.pc.zIndex = getters.elementsIndex.pc.max + 1
  newElement.style.mobile.zIndex = getters.elementsIndex.mobile.max + 1

  // 计算新元素位置
  const pcLeft = parseInt(newElement.style.pc.left)
  const pcWidth = parseInt(newElement.style.pc.width)
  if (pcLeft + pcWidth > state.editor.content.settings.style.width.pc - 20) {
    newElement.style.pc.left = ((pcLeft - 20) > 0 ? (pcLeft - 20) : 0) + 'px'
  } else {
    newElement.style.pc.left = (pcLeft + 20) + 'px'
  }

  const mobileLeft = parseInt(newElement.style.mobile.left)
  const mobileWidth = parseInt(newElement.style.mobile.width)
  if (mobileLeft + mobileWidth > state.editor.content.settings.style.width.mobile - 20) {
    newElement.style.mobile.left = ((mobileLeft - 20) > 0 ? (mobileLeft - 20) : 0) + 'px'
  } else {
    newElement.style.mobile.left = (mobileLeft + 20) + 'px'
  }

  newElement.style.pc.top = (parseInt(newElement.style.pc.top) + 20) + 'px'
  newElement.style.mobile.top = (parseInt(newElement.style.mobile.top) + 20) + 'px'

  commit(types.DUPULICATE_ELEMENT, { newElement, sectionIds })
  commit(types.SAVE_CONTENT_STATE)
}

// 获取元素所在的板块Id
const getSectionIds = (state, elementId) => {
  let sectionId = 0
  let pcSectionId = null
  let mobileSectionId = null
  state.editor.content.sections.forEach(section => {
    if (section.elements.pc.indexOf(elementId) > 0) {
      pcSectionId = sectionId
    }
    if (section.elements.mobile.indexOf(elementId) > 0) {
      mobileSectionId = sectionId
    }
    sectionId++
  })
  return {
    pc: pcSectionId,
    mobile: mobileSectionId
  }
}
