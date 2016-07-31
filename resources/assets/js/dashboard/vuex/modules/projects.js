import * as types from '../mutation-types'


const state = {
  all: [],
  currentProject: {},
  members: []
}

const mutations = {
  [types.LOAD_PROJECTS] (state, { projects }){
    state.all = projects
  },

  [types.SET_CURRENT_PROJECT] (state, {project}){
    state.currentProject = project;
  },

  [types.LOAD_MEMBERS] (state, { members }) {
    state.members = members;
  }
}

export default {
  state,
  mutations
}