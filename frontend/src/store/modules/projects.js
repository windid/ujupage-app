import * as types from '../mutation-types'

const state = {
  all: [],
  current: {},
  members: [],
  invited: []
}

const mutations = {
  [types.LOAD_PROJECTS] (state, { projects }) {
    state.all = projects
  },

  [types.SET_CURRENT_PROJECT] (state, { project }) {
    state.current = project
  },

  [types.LOAD_MEMBERS] (state, { members, invited }) {
    state.members = members
    state.invited = invited
  },

  [types.CREATE_PROJECT] (state, { project }) {
    state.all.push(project)
  }
}

export default {
  state,
  mutations
}
