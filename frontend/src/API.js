import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = '/api'

export default {
  project: Vue.resource('project{/id}'),
  projectMember: Vue.resource('projects/{projectId}/users{/id}'),
  pageGroup: Vue.resource('projects/{projectId}/groups{/id}'),
  page: Vue.resource('page{/id}?group_id={groupId}')
}
