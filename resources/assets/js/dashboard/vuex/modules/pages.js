import * as types from '../mutation-types'


const state = {
  all: []
}

const mutations = {
  [types.LOAD_PAGES] (state, { pages }){
  	state.all = pages;
  }
}

export default {
  state,
  mutations
}