import * as types from '../mutation-types'
import { noop, isPlainObject } from 'utils/index'

const state = {
  current: null,
  authDialog: {
    show: false,
    onPass: noop,
    onFail: noop
  }
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
  [types.SET_AUTH_DIALOG] (state, dialog) {
    const authDialog = state.authDialog
    if (isPlainObject(dialog)) {
      for (const key in authDialog) {
        if (dialog[key]) {
          authDialog[key] = dialog[key]
        }
      }
    } else {
      authDialog.show = dialog
    }
  }
}

export default {
  state,
  mutations
}
