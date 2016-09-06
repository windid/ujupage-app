import * as types from '../mutation-types'

const state = {
  all: []
}

const mutations = {
  [types.LOAD_PAGES] (state, { pages }) {
    state.all = pages
  },

  [types.CREATE_PAGE] (state, { page }) {
    state.all.push(page)
  },

  [types.REMOVE_PAGE] (state, { page }) {
    state.all.splice(state.all.indexOf(page), 1)
  },

  [types.RENAME_PAGE] (state, { page, newName }) {
    page.name = newName
  },

  [types.EMPTY_PAGES] (state) {
    state.all = []
  }
}

export default {
  state,
  mutations
}
