// import Vue from 'vue'
import Vuex from '../../vendor/vuex-2.0.0'
import pages from './modules/pages'
import pageGroups from './modules/pageGroups'
import projects from './modules/projects'
import workspace from './modules/workspace'
import * as actions from './actions'
import * as getters from './getters'

// Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    pages,
    pageGroups,
    projects,
    workspace
  },
})