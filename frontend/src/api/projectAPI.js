import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = '/api'

const project = Vue.resource('project{/id}')

export default {
  list (success) {
    project.get().then(response => success(response.data))
  },

  create (project, success, error) {
    const url = 'dashboard/project/add'
    const data = {
      name: project.name
    }
    Vue.http.post(url, data).then(response => success(response.json().project), response => error(response.json()))
  },

  remove (project, success, error) {
    const url = 'dashboard/project/remove/' + project.id
    Vue.http.get(url).then(response => success(response.json()), response => error(response.json()))
  },

  rename (project, name, success, error) {
    const url = 'dashboard/project/mod'
    const data = {
      id: project.id,
      name: name
    }
    Vue.http.post(url, data).then(response => success(response.json()), response => error(response.json()))
  },

  members (project, success, error) {
    const url = 'dashboard/project/members/get/' + project.id
    Vue.http.get(url).then(response => success(response.json().users, response.json().uninvitor), response => error(response.json()))
  },

  invite (member, project, success, error) {
    const url = 'dashboard/project/members/join/'
    const data = {
      project_id: project.id,
      email: member.email
    }
    Vue.http.post(url, data).then(response => success(response.json()), response => error(response.json()))
  }
}
