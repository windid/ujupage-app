import Vue from 'vue'
import Vuex from 'vuex'
import pages from './modules/pages'
import pageGroups from './modules/pageGroups'
import projects from './modules/projects'
import ui from './modules/ui'
import user from './modules/user'
import editor from './modules/editor'
import * as uiActions from './actions/uiActions'
import * as userActions from './actions/userActions'
import * as dashboardActions from './actions/dashboardActions'
import * as editorActions from './actions/editorActions'
import * as getters from './getters'
import { merge } from 'lodash'

Vue.use(Vuex)
// Vue.config.debug = true
const actions = merge(uiActions, dashboardActions, editorActions, userActions)

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    pages,
    pageGroups,
    projects,
    ui,
    user,
    editor
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
