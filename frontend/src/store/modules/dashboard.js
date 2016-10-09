import * as types from '../mutation-types'

const state = {
  projects: [],
  currentProject: {},
  projectMembers: [],
  projectMembersInvited: [],
  pageGroups: [],
  currentPageGroup: {},
  defaultPageGroup: {},
  editingPageGroup: {},
  pages: []
}

const mutations = {
  [types.LOAD_PROJECTS] (state, { projects }) {
    state.projects = projects
  },

  [types.SET_CURRENT_PROJECT] (state, { project }) {
    state.currentProject = project
  },

  [types.LOAD_MEMBERS] (state, { members, invited }) {
    state.projectMembers = members
    state.projectMembersInvited = invited
  },

  [types.CREATE_PROJECT] (state, { project }) {
    state.projects.push(project)
  },

  [types.LOAD_PAGEGROUPS] (state, { pageGroups }) {
    state.pageGroups = pageGroups
    state.defaultPageGroup = pageGroups.find(p => p.is_default === 1)
  },

  [types.SET_CURRENT_PAGEGROUP] (state, { pageGroup }) {
    state.currentPageGroup = pageGroup
  },

  [types.CREATE_PAGEGROUP] (state, { pageGroup }) {
    state.pageGroups.push(pageGroup)
    state.editingPageGroup = pageGroup
  },

  [types.REMOVE_PAGEGROUP] (state, { pageGroup }) {
    state.pageGroups.splice(state.pageGroups.indexOf(pageGroup), 1)
  },

  [types.SET_EDITING_PAGEGROUP] (state, { pageGroup }) {
    state.editingPageGroup = pageGroup
  },

  [types.RENAME_PAGEGROUP] (state, { pageGroup, newName }) {
    pageGroup.name = newName
  },

  [types.EMPTY_PAGEGROUPS] (state) {
    state.pageGroups = []
  },

  [types.LOAD_PAGES] (state, { pages }) {
    state.pages = pages
  },

  [types.CREATE_PAGE] (state, { page }) {
    state.pages.push(page)
  },

  [types.REMOVE_PAGE] (state, { page }) {
    state.pages.splice(state.pages.indexOf(page), 1)
  },

  [types.RENAME_PAGE] (state, { page, newName }) {
    page.name = newName
  },

  [types.EMPTY_PAGES] (state) {
    state.pages = []
  }
}

export default {
  state,
  mutations
}
