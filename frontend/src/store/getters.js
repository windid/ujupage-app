import { isEqual } from 'lodash'

export const isLogin = state => !!state.user.current

export const allPages = state => state.pages.all
export const allProjects = state => state.projects.all
export const currentProject = state => state.projects.current
export const projectMembers = state => state.projects.members
export const projectMembersInvited = state => state.projects.invited
export const allPageGroups = state => state.pageGroups.all.filter(p => p.is_default !== 1)
export const currentPageGroup = state => state.pageGroups.current
export const defaultPageGroup = state => state.pageGroups.default
export const editingPageGroup = state => state.pageGroups.editing

// ui
export const message = state => (state.ui.messages[0] || {})
export const showMessage = state => state.ui.messages.length > 0
export const load = state => state.ui.load
export const imageLibrary = state => state.ui.imageLibrary

// editor
export const editorWorkspace = state => state.editor.workspace
export const editorSettings = state => state.editor.content.settings
export const editorSections = state => state.editor.content.sections
export const editorElements = state => state.editor.content.elements
export const editorColorSet = state => state.editor.content.colorSet
export const editingPage = state => state.editor.page

export const editorHeight = state => {
  let height = 0
  if (state.editor.content.sections) {
    state.editor.content.sections.forEach(section => {
      height += parseInt(section.style[state.editor.workspace.version].height)
    })
  }
  return height
}

export const elementsIndex = state => {
  const zIndex = {
    'pc': { max: 50000, min: 50000 },
    'mobile': { max: 50000, min: 50000 }
  }
  const elements = state.editor.content.elements
  for (const elementId in elements) {
    zIndex.pc.max = (elements[elementId].style.pc.zIndex > zIndex.pc.max) ? elements[elementId].style.pc.zIndex : zIndex.pc.max
    zIndex.pc.min = (elements[elementId].style.pc.zIndex < zIndex.pc.min) ? elements[elementId].style.pc.zIndex : zIndex.pc.min
    zIndex.mobile.max = (elements[elementId].style.mobile.zIndex > zIndex.mobile.max) ? elements[elementId].style.mobile.zIndex : zIndex.mobile.max
    zIndex.mobile.min = (elements[elementId].style.mobile.zIndex < zIndex.mobile.min) ? elements[elementId].style.mobile.zIndex : zIndex.mobile.min
  }
  return zIndex
}

export const undoButton = state => state.editor.history.index > 0
export const redoButton = state => state.editor.history.states.length > state.editor.history.index + 1
export const saveStatus = state => isEqual(state.editor.content, state.editor.history.saved)
