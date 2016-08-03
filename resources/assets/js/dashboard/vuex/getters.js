export const allPages = state => state.pages.all
export const allProjects = state => state.projects.all
export const currentProject = state => state.projects.current
export const projectMembers = state => state.projects.members
export const allPageGroups = state => {
  if (state.pageGroups.current.is_default !== 1){
    return {};
  } else {
    return state.pageGroups.all.filter(p => p.is_default !== 1)
  }
}
export const currentPageGroup = state => state.pageGroups.current
export const defaultPageGroup = state => state.pageGroups.default
export const editingPageGroup = state => state.pageGroups.editing
export const workspace = state => state.workspace
export const messageBox = state => state.ui.messageBox