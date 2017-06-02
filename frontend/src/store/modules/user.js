import * as types from '../mutation-types'

const state = {
  current: null,
  showAuthDialog: false
}

const mutations = {
  [types.LOG_IN] (state, { user }) {
    state.current = user
  },
  [types.LOG_OUT] (state) {
    state.current = null
  },
  [types.EDIT_USER] (state, { userInfo }) {
    state.current = userInfo
  },
  [types.SHOW_AUTH_DIALOG] (state, show) {
    state.showAuthDialog = show
  }
}

export default {
  state,
  mutations
}
