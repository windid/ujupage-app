import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = '/api'

export default {
  project: Vue.resource('project{/id}'),

  projectMember: Vue.resource('projects/{projectId}/users{/id}'),

  pageGroup: Vue.resource('projects/{projectId}/groups{/id}'),

  page: Vue.resource('page{/id}', {}, {
    duplicate: { method: 'GET', url: 'page/{id}/copy' }
  }),

  variation: Vue.resource('pages/{pageId}/variations{/id}'),

  image: Vue.resource('storage/image{/imageId}'),

  imageFolder: Vue.resource('storage/folder{/folderId}')
}
