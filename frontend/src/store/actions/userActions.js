import * as types from '../mutation-types'

export const loadUser = ({ commit }, user) => {
  commit(types.LOAD_USER, { user })
}
