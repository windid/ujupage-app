import Vue from 'vue'
import Vuex from 'vuex'
import pages from './modules/pages'
import pageGroups from './modules/pageGroups'
import projects from './modules/projects'
import ui from './modules/ui'
import users from './modules/users'
import editor from './modules/editor'
import * as uiActions from './actions/uiActions'
import * as dashboardActions from './actions/dashboardActions'
import * as editorActions from './actions/editorActions'
import * as getters from './getters'
import { merge } from 'lodash'

Vue.use(Vuex)
// Vue.config.debug = true
const actions = merge(uiActions, dashboardActions, editorActions)

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    pages,
    pageGroups,
    projects,
    ui,
    users,
    editor
  }
})

// if (module.hot) {
//   module.hot.accept([
//     './modules/pages',
//     './modules/pageGroups',
//     './modules/projects',
//     './modules/ui',
//     './modules/users',
//     './modules/editor',
//     './actions/uiActions',
//     './actions/dashboardActions',
//     './actions/editorActions',
//     './getters'
//   ], () => {
//     const newPages = require('./modules/pages').default
//     const newPageGroups = require('./modules/pageGroups').default
//     const newProjects = require('./modules/projects').default
//     const newUi = require('./modules/ui').default
//     const newUsers = require('./modules/users').default
//     const newEditor = require('./modules/editor').default
//     const newUiActions = require('./actions/uiActions').default
//     const newDashboardActions = require('./actions/dashboardActions').default
//     const newEditorActions = require('./actions/editorActions').default
//     const newActions = merge(newUiActions, newDashboardActions, newEditorActions)
//     const newGetters = require('./getters').default
//     store.hotUpdate({
//       newActions,
//       newGetters,
//       modules: {
//         newPages,
//         newPageGroups,
//         newUi,
//         newUsers,
//         newProjects,
//         newEditor
//       }
//     })
//   })
// }

export default store
