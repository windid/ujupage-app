import * as types from '../mutation-types'
import API from '../../API'

export const loadUser = ({ commit }, user) => {
  commit(types.LOG_IN, { user })
}

export const requireLogin = ({ commit }) => {

}

export const login = ({ commit }, [email, password, remember, success, error]) => {
  API.auth.save({}, {
    email: email,
    password: password,
    remember: remember
  }).then(response => {
    const user = response.data
    commit(types.LOG_IN, { user })
    success()
  }, response => error(response))
}

export const logout = ({ commit }, success) => {
  API.auth.delete().then(response => {
    commit(types.LOG_OUT)
    success()
  })
}

export const register = ({ commit }, [user, success, error]) => {
  API.user.save({}, user).then(response => {
    const user = response.data
    commit(types.LOAD_USER, { user })
    success()
  }, response => error(response))
}

export const getPassword = ({ commit }, [email, success, error]) => {
  API.user.getPassword({}, { email: email }).then(response => {
    success()
  }, response => error(response))
}

export const resetPassword = ({ commit }) => {

}

export const activeEmail = ({ commit }) => {

}
