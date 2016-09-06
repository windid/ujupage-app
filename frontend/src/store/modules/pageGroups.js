import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  all: [],
  current: {},
  default: {},
  editing: {}
}

const mutations = {
  [types.LOAD_PAGEGROUPS] (state, { pageGroups }) {
    state.all = pageGroups
    state.default = pageGroups.find(p => p.is_default === 1)
  },
  [types.SET_CURRENT_PAGEGROUP] (state, { pageGroup }) {
    state.current = pageGroup
  },
  [types.CREATE_PAGEGROUP] (state, { pageGroup }) {
    state.all.push(pageGroup)
    Vue.nextTick(() => {
      state.editing = pageGroup
    })
  },
  [types.REMOVE_PAGEGROUP] (state, { pageGroup }) {
    state.all.splice(state.all.indexOf(pageGroup), 1)
  },
  [types.SET_EDITING_PAGEGROUP] (state, { pageGroup }) {
    state.editing = pageGroup
  },
  [types.RENAME_PAGEGROUP] (state, { pageGroup, newName }) {
    pageGroup.name = newName
  },
  [types.EMPTY_PAGEGROUPS] (state) {
    state.all = []
  }
}

export default {
  state,
  mutations
}
