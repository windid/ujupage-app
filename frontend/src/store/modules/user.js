import * as types from '../mutation-types'

const state = {
  current: null
}

const mutations = {
  [types.LOG_IN] (state, { user }) {
    state.current = user
  },
  [types.LOG_OUT] (state) {
    state.current = null
  }
}

export default {
  state,
  mutations
}
