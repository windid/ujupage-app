export const setActiveElementId = function ({ dispatch, state }, elementId) {
  dispatch('SET_ACTIVE_ELEMENT_ID', elementId)
}

export const removeElement = function ({ dispatch, state }, sectionId, elementId) {
  dispatch('REMOVE_ELEMENT', sectionId, elementId)
}

export const setCurrentSectionId = function ({ dispatch, state }, sectionId) {
  dispatch('SET_CURRENT_SECTION_ID', sectionId)
}

export const setActiveSectionId = function ({ dispatch, state }, sectionId) {
  dispatch('SET_ACTIVE_SECTION_ID', sectionId)
}

export const moveSection = function ({ dispatch, state }, dir, sectionId) {
  dispatch('MOVE_SECTION', dir, sectionId)
}

export const removeSection = function ({ dispatch, state }, sectionId) {
  dispatch('REMOVE_SECTION', sectionId)
}

export const modifySection = function ({ dispatch, state }, sectionId, style) {
  dispatch('MODIFY_SECTION', sectionId, style)
}

export const addSection = function ({ dispatch, state }) {
  dispatch('ADD_SECTION')
}

export const redo = function ({ dispatch, state }) {
  dispatch('REDO')
}

export const undo = function ({ dispatch, state }) {
  dispatch('UNDO')
}

export const toggleVersion = function ({ dispatch, state }) {
  dispatch('VERSION')
}

export const moveElement = function ({ dispatch, state }, sectionId, elementId, positionInPage, elementHeight) {
  dispatch('MOVE_ELEMENT', sectionId, elementId, positionInPage, elementHeight)
}
