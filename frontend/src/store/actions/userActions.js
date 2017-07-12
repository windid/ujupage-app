import * as types from '../mutation-types'
import API from '../../API'

export const loadUser = ({ commit }, user) => {
  commit(types.LOG_IN, { user })
}

export const requireLogin = ({ commit }, { onPass, onFail }) => {
  commit(types.SET_AUTH_DIALOG, {
    show: true,
    onPass,
    onFail
  })
}

export const login = ({ commit }, form) => {
  return API.auth.save({}, form).then(response => {
    const user = response.data
    commit(types.LOG_IN, { user })
    return response
  })
}

export const logout = ({ commit }, success) => {
  API.auth.delete().then(response => {
    commit(types.LOG_OUT)
    success()
  })
}

export const register = ({ commit }, form) => {
  return API.user.save({}, form).then(response => {
    const user = response.data
    commit(types.LOG_IN, { user })
    return response
  })
}

export const forgetPassword = ({ commit }, email) => {
  return API.user.forgetPassword({}, { email })
}

export const resetPassword = ({ commit }, [token, password]) => {
  return API.user.resetPassword({}, {
    token,
    password,
    password_confirmation: password
  })
}

export const activeEmail = ({ commit }) => {

}

export const editUser = ({ commit }, userInfo) => {
  commit(types.EDIT_USER, { userInfo })
}
