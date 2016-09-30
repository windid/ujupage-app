import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = '/api'

export default {
  project: Vue.resource('project{/id}'),

  projectMember: Vue.resource('projects/{projectId}/users{/id}'),

  pageGroup: Vue.resource('projects/{projectId}/groups{/id}'),

  page: Vue.resource('page{/id}', {}, {
    duplicate: { method: 'GET', url: 'page/{id}/copy' },
    publish: { method: 'GET', url: 'page/{id}/publish' }
  }),

  variation: Vue.resource('pages/{pageId}/variations{/id}'),

  image: Vue.resource('storage/image{/id}'),

  imageFolder: Vue.resource('storage/folder{/id}'),

  report: Vue.resource('report/{module}/{pageId}'),

  account: Vue.resource('account{/id}', {}, {
    current: { method: 'GET', url: 'account/current' }
  }),

  auth: Vue.resource('auth{/id}')
}
