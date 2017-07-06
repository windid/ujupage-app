import API from '../../API'
import * as types from '../mutation-types'
import { merge, cloneDeep, find } from 'lodash'
import elementTypes from '../../config/editorElementTypes'
import defaultSection from '../../config/editorSection'
import { getScrollTop } from 'utils/ui'
import contentCache from 'utils/editor/contentCache'

// 数据初始化，在路由中调用
export const editorInit = ({ commit, state, dispatch }, [route, callback = false]) => {
  const pageId = route.params.pageId
  API.page.get({ id: pageId }).then(response => {
    const page = response.data
    API.variation.get({ pageId: page.id }).then(response => {
      page.variations = response.data
      commit(types.LOAD_PAGE, { page })
      const variationId = route.params.variationId || page.variations[0].id
      const variation = find(page.variations, v => v.id === parseInt(variationId))
      dispatch('loadVariation', [variation, callback])
    })
  })
}

// 分配版本流量
export const traficSplit = ({ commit }, traficWeights) => {
  commit(types.TRAFIC_SPLIT, { traficWeights })
}

// 加载编辑内容
export const loadVariation = ({ commit, state, dispatch }, [variation, callback = false]) => {
  API.variation.get({ pageId: state.editor.page.id, id: variation.id }).then(response => {
    const content = JSON.parse(response.data.html_json)
    commit(types.LOAD_VARIATION, { variation, content })
    callback && callback()
    dispatch('initAutoSavedContent', variation)
  })
}

// 新建版本
export const createEmptyVariation = ({ commit, state }, [pageId, callback = false]) => {
  API.variation.save({ pageId }, {}).then(response => {
    const variation = response.data
    variation.quota = 1
    commit(types.CREATE_VARIATION, { variation })
    callback && callback(variation)
    // loadVariation({ commit, state }, [variation])
  })
}

// 复制版本
export const duplicateVariation = ({ commit, state, dispatch }, variation) => {
  API.variation.duplicate({ pageId: state.editor.page.id, id: variation.id }, {}).then(response => {
    const variation = response.data
    variation.quota = 1
    commit(types.CREATE_VARIATION, { variation })
    dispatch('loadVariation', [variation])
  })
}

// 重命名版本
export const renameVariation = ({ commit, state }, [variation, newName]) => {
  API.variation.update({ pageId: state.editor.page.id, id: variation.id }, { name: newName }).then(response => {
    commit(types.RENAME_VARIATION, { variation, newName })
  })
}

// 删除版本
export const removeVariation = ({ commit, state, dispatch }, variation) => {
  API.variation.delete({ pageId: state.editor.page.id, id: variation.id }).then(response => {
    commit(types.REMOVE_VARIATION, { variation })
    if (variation.id === state.editor.workspace.activeVariation.id) {
      dispatch('loadVariation', [state.editor.page.variations[0]])
    }
  })
}

// 保存设置
export const saveSettings = ({ commit }, settings) => {
  commit(types.SAVE_SETTINGS, { settings })
}

// 在页面加载之后检测是否有缓存内容
export const initAutoSavedContent = ({ state, commit, dispatch }, variation) => {
  const json = contentCache.get(state.editor.page.id, variation.id)
  if (json) {
    dispatch('confirm', {
      header: '在缓存中检测到上次未保存的修改',
      content: '是否载入修改过的内容？',
      onConfirm: () => {
        try {
          const content = JSON.parse(json)
          commit(types.LOAD_VARIATION_CONTENT, content)
        } catch (e) {
        }
      }
    })
  }
}

// 自动保存到浏览器缓存
export const autoSave = ({ state, commit }) => {
  commit(types.SAVE_CONTENT_STATE)
  const { page, content, workspace: { activeVariation: variation }} = state.editor
  contentCache.save(page, variation, content)
}

// 保存
export const saveVariation = ({ commit, state }, callback = false) => {
  const content = JSON.stringify(state.editor.content)
  const params = { pageId: state.editor.page.id, id: state.editor.workspace.activeVariation.id }
  const data = { htmljson: content }
  API.variation.update(params, data).then(res => {
    commit(types.SAVE_VARIATION)
    callback && callback()
    contentCache.remove(state.editor.page.id, state.editor.workspace.activeVariation.id)
  })
}

// 设置URL
export const setURL = ({ commit, state }, [url, successCb, errorCb]) => {
  API.page.update({ id: state.editor.page.id }, { url: url }).then(response => {
    successCb(response.data)
  }).catch(err => {
    errorCb(err)
  })
}

// 发布
export const publishPage = ({ commit, state }, successCb) => {
  API.page.publish({ id: state.editor.page.id }, {}).then(response => {
    successCb(response.data)
  })
}

// 添加板块
export const addSection = ({ commit, dispatch }) => {
  const section = merge({}, defaultSection)
  commit(types.ADD_SECTION, { section })
  dispatch('autoSave')
  // commit(types.SAVE_CONTENT_STATE)
}

// 调整板块次序
export const moveSection = ({ commit, state, dispatch }, [dir, sectionId]) => {
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
    dispatch('autoSave')
    // commit(types.SAVE_CONTENT_STATE)
  }
}

// 修改板块
export const modifySection = ({ commit, dispatch }, [sectionId, style]) => {
  commit(types.MODIFY_SECTION, { sectionId, style })
  dispatch('autoSave')
  // commit(types.SAVE_CONTENT_STATE)
}

// 删除板块
export const removeSection = ({ commit, dispatch }, sectionId) => {
  commit(types.REMOVE_SECTION, { sectionId })
  dispatch('autoSave')
  // commit(types.SAVE_CONTENT_STATE)
}

// 设置编辑状态中的板块
export const setActiveSectionId = ({ commit }, sectionId) => {
  commit(types.SET_ACTIVE_SECTION_ID, { sectionId })
}

// 设置当前活跃的板块
export const setCurrentSectionId = ({ commit }, sectionId) => {
  commit(types.SET_CURRENT_SECTION_ID, { sectionId })
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
export const setColorSet = ({ commit, state, dispatch }, colorSet) => {
  if (colorSet !== state.editor.content.colorSet) {
    commit(types.SET_COLOR_SET, { colorSet })
    dispatch('autoSave')
    // commit(types.SAVE_CONTENT_STATE)
  }
}

// 当前选中的元素
export const setActiveElementId = ({ commit }, elementId) => {
  commit(types.SET_ACTIVE_ELEMENT_ID, { elementId })
}

// 删除元素
export const removeElement = ({ commit, state, dispatch }, [elementId, record = true]) => {
  // 取得元素所在的板块ID
  const sectionIds = getSectionIds(state, elementId)
  commit(types.REMOVE_ELEMENT, { elementId, sectionIds })
  dispatch('autoSave')
  // record && commit(types.SAVE_CONTENT_STATE)
}

export const removeElements = ({ commit, state, dispatch }, elements) => {
  const len = elements.length
  for (let i = 0; i < len; i++) {
    const elementId = elements[i].id
    const sectionIds = getSectionIds(state, elementId)
    commit(types.REMOVE_ELEMENT, {
      elementId,
      sectionIds
    })
  }
  dispatch('autoSave')
  // commit(types.SAVE_CONTENT_STATE)
  commit(types.MULTI_SELECT_CLEAR)
}

// 移动元素
export const moveElement = ({ commit, state, dispatch }, [sectionId, elementId, positionInPage, elementHeight]) => {
  moveSingleElement(commit, state, {
    sectionId,
    id: elementId,
    positionInPage,
    rect: {
      height: elementHeight
    }
  })
  dispatch('autoSave')
  // commit(types.SAVE_CONTENT_STATE)
}

export const moveElements = ({ commit, state, dispatch }, payload) => {
  const elements = payload.elements
  const count = elements.length
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const element = elements[i]
      element.positionInPage.left += payload.move.x
      element.positionInPage.top += payload.move.y
      moveSingleElement(commit, state, element)
    }
    dispatch('autoSave')
    // commit(types.SAVE_CONTENT_STATE)
  }
}

export const alignMoveElements = ({ commit, state, dispatch }, payload) => {
  // 多选时候对齐移动元素
  const data = payload.data
  let count = 0
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.move !== 0) {
      const element = cloneDeep(item.element)
      moveSingleElement(commit, state, element)
      count++
    }
  }
  if (count > 0) {
    dispatch('autoSave')
    // commit(types.SAVE_CONTENT_STATE)
  }
}

const moveSingleElement = (commit, state, payload) => {
  const sectionId = payload.sectionId
  const elementId = payload.id
  const positionInPage = payload.positionInPage
  const elementHeight = payload.rect.height

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

  if (sectionId !== newSectionId) {
    payload.sectionId = newSectionId
  }
  commit(types.MOVE_ELEMENT, { elementId, newElement, sectionId, newSectionId })
}

// 缩放元素
export const resizeElement = ({ commit, state, dispatch }, [elementId, newSize]) => {
  const newElement = merge({}, state.editor.content.elements[elementId])
  const oldHeight = newElement['style'][state.editor.workspace.version]['height']
  const height = (oldHeight && oldHeight !== 'auto') ? newSize.height + 'px' : 'auto'

  newElement.style[state.editor.workspace.version]['width'] = newSize.width + 'px'
  newElement.style[state.editor.workspace.version]['height'] = height

  commit(types.MODIFY_ELEMENT, { elementId, newElement })
  dispatch('autoSave')
  // commit(types.SAVE_CONTENT_STATE)
}

// 修改元素层叠关系
export const indexElement = ({ commit, state, getters, dispatch }, [elementId, dir]) => {
  indexOneElement({ commit, state, getters }, [elementId, dir])
  dispatch('autoSave')
  // commit(types.SAVE_CONTENT_STATE)
}

export const indexOfElements = ({ commit, state, getters, dispatch }, [elements, dir]) => {
  if (elements.length > 0) {
    elements.forEach(element => {
      indexOneElement({ commit, state, getters }, [element.id, dir])
    })
    dispatch('autoSave')
    // commit(types.SAVE_CONTENT_STATE)
  }
}

const indexOneElement = ({ commit, state, getters }, [elementId, dir]) => {
  const newElement = merge({}, state.editor.content.elements[elementId])
  if (dir === 'top') {
    newElement.style[state.editor.workspace.version]['zIndex'] = ++getters.elementsIndex[state.editor.workspace.version].max
  } else {
    newElement.style[state.editor.workspace.version]['zIndex'] = --getters.elementsIndex[state.editor.workspace.version].min
  }

  commit(types.MODIFY_ELEMENT, { elementId, newElement })
}

// 修改元素：需要删除属性的时候，只能用replace = true对元素进行整体替换
export const modifyElement = ({ commit, state, dispatch }, [elementId, newPropsObj, replace = false]) => {
  const newElement = replace ? merge({}, newPropsObj) : merge({}, state.editor.content.elements[elementId], newPropsObj)
  commit(types.MODIFY_ELEMENT, { elementId, newElement })
  dispatch('autoSave')
  // commit(types.SAVE_CONTENT_STATE)
}

// 添加元素
export const addElement = ({ commit, state, getters, dispatch }, [type, position]) => {
  // 如果还没有板块，那么新建一个板块
  if (state.editor.content.sections.length === 0) {
    addSection({ commit })
  }

  // 计算元素应该进入哪个板块，以及在板块中的高
  const scrollTop = getScrollTop()
  const element = merge({}, elementTypes[type])
  const elementTopInPage = scrollTop + 150
  let sumSectionsHeight = 0
  let sectionHeight = 0
  let sectionId = -1
  const currentVersion = state.editor.workspace.version
  const anotherVersion = state.editor.workspace.version === 'pc' ? 'mobile' : 'pc'
  let elementTop = 0
  if (position) {
    sumSectionsHeight = position.y
    let height = 0
    while (sumSectionsHeight >= 0) {
      sectionId++
      sectionHeight = parseInt(state.editor.content.sections[sectionId].style[currentVersion].height)
      height = sumSectionsHeight
      sumSectionsHeight -= sectionHeight
    }
    elementTop = height
  } else {
    while (sumSectionsHeight < elementTopInPage) {
      sectionId++
      sectionHeight = parseInt(state.editor.content.sections[sectionId].style[currentVersion].height)
      sumSectionsHeight += sectionHeight
    }
    elementTop = elementTopInPage + sectionHeight - sumSectionsHeight
  }
  element.style[currentVersion].top = elementTop + 'px'
  element.style[anotherVersion].top = '10px'

  // 设置元素的zindex
  element.style.pc.zIndex = getters.elementsIndex.pc.max
  element.style.mobile.zIndex = getters.elementsIndex.mobile.max

  commit(types.ADD_ELEMENT, { sectionId, element })
  type !== 'image' && dispatch('autoSave') // commit(types.SAVE_CONTENT_STATE)
}

// 复制元素
export const duplicateElement = ({ commit, state, getters, dispatch }, elementId) => {
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
  dispatch('autoSave')
  // commit(types.SAVE_CONTENT_STATE)
}

// 获取元素所在的板块Id
const getSectionIds = (state, elementId) => {
  let pcSectionId = null
  let mobileSectionId = null
  state.editor.content.sections.some((section, index) => {
    if (section.elements.pc.indexOf(elementId) >= 0) {
      pcSectionId = index
    }
    if (section.elements.mobile.indexOf(elementId) >= 0) {
      mobileSectionId = index
    }
    return pcSectionId && mobileSectionId
  })
  return {
    pc: pcSectionId,
    mobile: mobileSectionId
  }
}

// 对齐辅助功能
export const updateAlign = ({ commit, state }, element) => {
  commit(types.ALIGN_UPDATE, element)
}

export const clearAlign = ({ commit, state }) => {
  commit(types.ALIGN_CLEAR)
}

export const updateMultiSelect = ({ commit, state }, selection) => {
  commit(types.MULTI_SELECT_UPDATE, selection)
}

export const doneMultiSelect = ({ commit, state }) => {
  commit(types.MULTI_SELECT_DONE)
}

export const clearMultiSelect = ({ commit, state }) => {
  commit(types.MULTI_SELECT_CLEAR)
}

export const updateMultiMove = ({ commit, state }, payload) => {
  commit(types.UPDATE_MULTI_MOVE, payload)
}
