//初始加载页面数据
export const pageInit = function ({ dispatch, state }, data) {
  dispatch('PAGE_INIT', data)
}

//更新配色方案
export const setColorSet = function ({ dispatch, state }, colorSet) {
  dispatch('SET_COLOR_SET', colorSet)
}

//设置处于编辑状态的元素
export const setActiveElementId = function ({ dispatch, state }, elementId) {
  dispatch('SET_ACTIVE_ELEMENT_ID', elementId)
}

//删除元素
export const removeElement = function ({ dispatch, state }, sectionId, elementId) {
  dispatch('REMOVE_ELEMENT', sectionId, elementId)
}

//移动元素
export const moveElement = function ({ dispatch, state }, sectionId, elementId, positionInPage, elementHeight) {
  dispatch('MOVE_ELEMENT', sectionId, elementId, positionInPage, elementHeight)
}

//修改元素style
export const modifyElement = function ({ dispatch, state }, sectionId, elementId, newPropsObj) {
  dispatch('MODIFY_ELEMENT', sectionId, elementId, newPropsObj)
}

//设置当前板块
export const setCurrentSectionId = function ({ dispatch, state }, sectionId) {
  dispatch('SET_CURRENT_SECTION_ID', sectionId)
}

//设置编辑状态中的板块
export const setActiveSectionId = function ({ dispatch, state }, sectionId) {
  dispatch('SET_ACTIVE_SECTION_ID', sectionId)
}

//移动板块
export const moveSection = function ({ dispatch, state }, dir, sectionId) {
  dispatch('MOVE_SECTION', dir, sectionId)
}

//删除板块
export const removeSection = function ({ dispatch, state }, sectionId) {
  dispatch('REMOVE_SECTION', sectionId)
}

//修改板块
export const modifySection = function ({ dispatch, state }, sectionId, style) {
  dispatch('MODIFY_SECTION', sectionId, style)
}

//添加板块
export const addSection = function ({ dispatch, state }) {
  dispatch('ADD_SECTION')
}

//重做
export const redo = function ({ dispatch, state }) {
  dispatch('REDO')
}

//撤销
export const undo = function ({ dispatch, state }) {
  dispatch('UNDO')
}

//版本切换
export const toggleVersion = function ({ dispatch, state }) {
  dispatch('VERSION')
}
