import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = '/api'

export default {
  project: Vue.resource('project{/id}', {}, {
    cancelInvite: { method: 'DELETE', url: 'projects/{id}/destroyinvites/{inviteId}' }
  }),

  projectMember: Vue.resource('projects/{projectId}/users{/id}'),

  pageGroup: Vue.resource('projects/{projectId}/groups{/id}'),

  page: Vue.resource('page{/id}', {}, {
    duplicate: { method: 'POST', url: 'page/{id}/copy' },
    publish: { method: 'PUT', url: 'page/{id}/publish' },
    leads: { method: 'GET', url: 'page/{id}/leads' },
    split: { method: 'POST', url: 'page/{id}/quota' }
  }),

  variation: Vue.resource('pages/{pageId}/variations{/id}', {}, {
    duplicate: { method: 'POST', url: 'pages/{pageId}/variations/{id}/copy' }
  }),

  template: Vue.resource('hub/template{/id}', {}, {
    copy: { method: 'GET', url: 'hub/template/copy/{id}' }
  }),

  image: Vue.resource('storage/image{/id}'),

  imageFolder: Vue.resource('storage/folder{/id}'),

  report: Vue.resource('report/{module}/{pageId}'),

  account: Vue.resource('account{/id}', {}, {
    current: { method: 'GET', url: 'auth/account/current' }
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
    forgetPassword (params, data) {
      const url = 'auth/password/forget'
      return Vue.http.post(url, data)
    },
    resetPassword (params, data) {
      const url = 'auth/password/reset'
      return Vue.http.post(url, data)
    },
    // 修改用户信息，头像等
    edit (data) {
      const url = 'auth/account/update'
      return Vue.http.post(url, data)
    }
  }
}
