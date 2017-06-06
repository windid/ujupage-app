import * as types from '../mutation-types'
import Vue from 'vue'
import { find } from 'lodash'

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

  [types.LOG_OUT] (state) {
    state.projects = []
    state.pageGroups = []
    state.pages = []
  },

  [types.SET_CURRENT_PROJECT] (state, { project }) {
    state.currentProject = project
  },

  [types.LOAD_MEMBERS] (state, { members, invited }) {
    state.projectMembers = members
    state.projectMembersInvited = invited
  },

  [types.REMOVE_MEMBER] (state, { member }) {
    state.projectMembers.splice(state.projectMembers.indexOf(member), 1)
  },

  [types.CANCEL_INVITE] (state, { inviteId }) {
    Vue.delete(state.projectMembersInvited, inviteId)
  },

  [types.CREATE_PROJECT] (state, { project }) {
    state.projects.push(project)
  },

  [types.LOAD_PAGEGROUPS] (state, { pageGroups }) {
    state.pageGroups = pageGroups
    state.defaultPageGroup = find(pageGroups, p => p.is_default === 1)
  },

  [types.SET_CURRENT_PAGEGROUP] (state, { pageGroup }) {
    state.currentPageGroup = pageGroup
    state.pages = []
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
