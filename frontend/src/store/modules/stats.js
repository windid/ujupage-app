import * as types from '../mutation-types'

const state = {
  page: {}
}

const mutations = {
  [types.LOAD_STATS_VARIATIONS] (state, { page }) {
    state.page = page
  }
}

export default {
  state,
  mutations
}
