import * as types from '../mutation-types'

const state = {
  current: null
}

const mutations = {
  [types.LOAD_USER] (state, { user }) {
    state.current = user
  }
}

export default {
  state,
  mutations
}
