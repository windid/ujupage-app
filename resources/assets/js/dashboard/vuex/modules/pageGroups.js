import * as types from '../mutation-types'


const state = {
  all: [],
  currentPageGroup: {}
}

const mutations = {
  [types.LOAD_PAGEGROUPS] (state, { pageGroups }){
  	state.all = pageGroups;
  },
  [types.SET_CURRENT_PAGEGROUP] (state, { pageGroup }){
    state.currentPageGroup = pageGroup;
  },
}

export default {
  state,
  mutations
}