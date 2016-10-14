import API from '../../API'
import * as types from '../mutation-types'
import getParameter from '../../utils/getParameter'
import { merge } from 'lodash'
import elementTypes from '../editorElementTypes'

// 数据初始化，在路由中调用
export const editorInit = ({ commit, state }, [route, callback = false]) => {
  const pageId = route.params.pageId
  API.page.get({ id: pageId }).then(response => {
    const page = response.data
    API.variation.get({ pageId: page.id }).then(response => {
      page.variations = response.data
      commit(types.LOAD_PAGE, { page })
      const variationId = getParameter('vid') || page.variations[0].id
      // const variation = page.variations.find(v => v.id === variationId)
      const variation = page.variations.filter(v => v.id === variationId)[0]
      loadVariation({ commit, state }, [variation, callback])
    })
  })
}

// 加载编辑内容
export const loadVariation = ({ commit, state }, [variation, callback = false]) => {
  API.variation.get({ pageId: state.editor.page.id, id: variation.id }).then(response => {
    const content = JSON.parse(response.data.html_json)
    commit(types.LOAD_VARIATION, { variation, content })
    if (callback) callback()
  })
}

// 新建版本
export const createVariation = ({ commit, state }) => {
  API.variation.save({ pageId: state.editor.page.id }, {}).then(response => {
    const variation = response.data
    commit(types.CREATE_VARIATION, { variation })
    loadVariation({ commit, state }, [variation])
  })
}

// 复制版本
export const duplicateVariation = ({ commit, state }, variation) => {
  API.variation.duplicate({ pageId: state.editor.page.id, id: variation.id }, {}).then(response => {
    const variation = response.data
    commit(types.CREATE_VARIATION, { variation })
    loadVariation({ commit, state }, [variation])
  })
}

// 重命名版本
export const renameVariation = ({ commit, state }, [variation, newName]) => {
  API.variation.update({ pageId: state.editor.page.id, id: variation.id }, { name: newName }).then(response => {
    commit(types.RENAME_VARIATION, { variation, newName })
  })
}

// 删除版本
export const removeVariation = ({ commit, state }, variation) => {
  API.variation.delete({ pageId: state.editor.page.id, id: variation.id }).then(response => {
    commit(types.REMOVE_VARIATION, { variation })
    if (variation.id === state.editor.workspace.activeVariation.id) {
      loadVariation({ commit, state }, [state.editor.page.variations[0]])
    }
  })
}

// 保存设置
export const saveSettings = ({ commit }, settings) => {
  commit(types.SAVE_SETTINGS, { settings })
}

// 保存
export const saveVariation = ({ commit, state }) => {
  const content = JSON.stringify(state.editor.content)
  API.variation.update({ pageId: state.editor.page.id, id: state.editor.workspace.activeVariation.id }, { htmljson: content }).then(response => {
    commit(types.SAVE_VARIATION)
  })
}

// 设置URL
export const setURL = ({ commit, state }, [url, successCb, errorCb]) => {
  API.page.update({ id: state.editor.page.id }, { url: url }).then(response => {
    successCb(response.data)
  })
}

// 发布
export const publishPage = ({ commit, state }, successCb) => {
  API.page.publish({ id: state.editor.page.id }).then(response => {
    successCb(response.data)
  })
}

// 添加板块
export const addSection = ({ commit }) => {
  const section = {
    style: {
      'pc': { 'background-color': '', height: '500px' },
      'mobile': { 'background-color': '', height: '500px' }
    },
    elements: { 'pc': [], 'mobile': [] }
  }
  commit(types.ADD_SECTION, { section })
  commit(types.SAVE_CONTENT_STATE)
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
export const undo = ({ commit }) => commit(types.UNDO)

// 重做
export const redo = ({ commit }) => commit(types.REDO)

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
export const removeElement = ({ commit, state }, [elementId, record = true]) => {
  const sectionIds = getSectionIds(state, elementId)
  commit(types.REMOVE_ELEMENT, { elementId, sectionIds })
  record && commit(types.SAVE_CONTENT_STATE)
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
export const modifyElement = ({ commit, state }, [elementId, newPropsObj, replace = false]) => {
  const newElement = replace ? merge({}, newPropsObj) : merge({}, state.editor.content.elements[elementId], newPropsObj)
  commit(types.MODIFY_ELEMENT, { elementId, newElement })
  commit(types.SAVE_CONTENT_STATE)
}

// 添加元素
export const addElement = ({ commit, state, getters }, type) => {
  if (state.editor.content.sections.length === 0) {
    addSection({ commit })
  }

  // 计算元素应该进入哪个板块，以及在板块中的高
  const workspace = document.getElementById('main-wrapper')
  const element = elementTypes[type]
  const elementTopInPage = workspace.scrollTop + 100
  let sumSectionsHeight = 0
  let sectionHeight = 0
  let sectionId = -1
  const currentVersion = state.editor.workspace.version
  const anotherVersion = state.editor.workspace.version === 'pc' ? 'mobile' : 'pc'
  while (sumSectionsHeight < elementTopInPage) {
    sectionId++
    sectionHeight = parseInt(state.editor.content.sections[sectionId].style[currentVersion].height)
    sumSectionsHeight += sectionHeight
  }
  const elementTop = elementTopInPage + sectionHeight - sumSectionsHeight
  element.style[currentVersion].top = elementTop + 'px'
  element.style[anotherVersion].top = '10px'

  // 设置元素的zindex
  element.style.pc.zIndex = getters.elementsIndex.pc.max
  element.style.mobile.zIndex = getters.elementsIndex.mobile.max

  commit(types.ADD_ELEMENT, { sectionId, element })
  type !== 'image' && commit(types.SAVE_CONTENT_STATE)
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
    if (section.elements.pc.indexOf(elementId) >= 0) {
      pcSectionId = sectionId
    }
    if (section.elements.mobile.indexOf(elementId) >= 0) {
      mobileSectionId = sectionId
    }
    sectionId++
  })
  return {
    pc: pcSectionId,
    mobile: mobileSectionId
  }
}
