import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = '/api'

export default {
  project: Vue.resource('project{/id}'),

  projectMember: Vue.resource('projects/{projectId}/users{/id}'),

  pageGroup: Vue.resource('projects/{projectId}/groups{/id}'),

  page: Vue.resource('page{/id}', {}, {
    duplicate: { method: 'POST', url: 'page/{id}/copy' },
    publish: { method: 'PUT', url: 'page/{id}/publish' }
  }),

  variation: Vue.resource('pages/{pageId}/variations{/id}', {}, {
    duplicate: { method: 'POST', url: 'pages/{pageId}/variations{/id}/copy' }
  }),

  image: Vue.resource('storage/image{/id}'),

  imageFolder: Vue.resource('storage/folder{/id}'),

  report: Vue.resource('report/{module}/{pageId}'),

  account: Vue.resource('account{/id}', {}, {
    current: { method: 'GET', url: 'account/current' }
  }),

  auth: {
    save (params, data) {
      const url = 'auth/login'
      return Vue.http.post(url, data)
    },
    delete (params, data) {
      const url = 'auth/logout'
      return Vue.http.get(url)
    }
  },

  user: {
    save (params, data) {
      const url = 'auth/register'
      return Vue.http.post(url, data)
    },
    getPassword (params, data) {
      const url = 'auth/password/forget'
      return Vue.http.post(url, data)
    }
  }
}
