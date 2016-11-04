import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from './modules/dashboard'
import ui from './modules/ui'
import user from './modules/user'
import editor from './modules/editor'
import stats from './modules/stats'
import * as uiActions from './actions/uiActions'
import * as userActions from './actions/userActions'
import * as dashboardActions from './actions/dashboardActions'
import * as editorActions from './actions/editorActions'
import * as statsActions from './actions/statsActions'
import * as getters from './getters'
import { merge } from 'lodash'

Vue.use(Vuex)
// Vue.config.debug = true
const actions = merge(uiActions, dashboardActions, editorActions, userActions, statsActions)

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    dashboard,
    ui,
    user,
    editor,
    stats
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
