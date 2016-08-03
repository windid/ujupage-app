import * as types from '../mutation-types'

const state = {
  all: []
}

const mutations = {
  [types.LOAD_PAGES] (state, { pages }){
    state.all = pages;
  },

  [types.CREATE_PAGE] (state, { page }){
    state.all.push(page);
  },

  [types.REMOVE_PAGE] (state, { page }){
    state.all.remove(page);
  },

  [types.RENAME_PAGE] (state, { page, newName }){
    page.name = newName;
  }
}

export default {
  state,
  mutations
}