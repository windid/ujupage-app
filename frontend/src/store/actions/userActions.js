import * as types from '../mutation-types'
import API from '../../API'

export const loadUser = ({ commit }, user) => {
  commit(types.LOAD_USER, { user })
}

export const requireLogin = ({ commit }) => {

}

export const login = ({ commit }, [email, password, success, error]) => {
  API.auth.save({}, {
    email: email,
    password: password
  }).then(response => {
    // const user = response.data
    const user = {
      userId: 2,
      email: 'xiewendong@ujumedia.com'
    }
    commit(types.LOAD_USER, { user })
    success()
  }, response => error(response.data.error))
}
