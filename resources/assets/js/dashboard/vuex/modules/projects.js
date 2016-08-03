import * as types from '../mutation-types'


const state = {
  all: [],
  current: {},
  members: []
}

const mutations = {
  [types.LOAD_PROJECTS] (state, { projects }){
    state.all = projects
  },

  [types.SET_CURRENT_PROJECT] (state, {project}){
    state.current = project;
  },

  [types.LOAD_MEMBERS] (state, { members }) {
    state.members = members;
  },

  [types.CREATE_PROJECT] (state, { project }){
    state.all.push(project);
  }
}

export default {
  state,
  mutations
}