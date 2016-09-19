import Vue from 'vue'

export default {

  list (groupId, success, error) {
    const url = 'dashboard/page/get/' + groupId
    Vue.http.get(url).then(response => success(response.json().pages), response => error(response.json()))
  },

  get (pageId, success, error) {
    const page = {
      id: 19,
      url: '',
      projectId: 9
    }
    success(page)
  },

  create (page, success, error) {
    const url = 'dashboard/page/add'
    const data = {
      group_id: page.group_id,
      name: page.name
    }
    Vue.http.post(url, data).then(response => success(response.json().page), response => error(response.json()))
  },

  remove (page, success, error) {
    const url = 'dashboard/page/remove/' + page.id
    Vue.http.get(url).then(response => success(response.json()), response => error(response.json()))
  },

  rename (page, name, success, error) {
    const url = 'dashboard/page/mod'
    const data = {
      id: page.id,
      group_id: page.group_id,
      name: name
    }
    Vue.http.post(url, data).then(response => success(response.json()), response => error(response.json()))
  },

  move (page, pageGroup, success, error) {
    const url = 'dashboard/page/mod'
    const data = {
      id: page.id,
      group_id: pageGroup.id,
      name: page.name
    }
    Vue.http.post(url, data).then(response => success(response.json()), response => error(response.json()))
  },

  duplicate (page, success, error) {
    const url = 'dashboard/page/copy/' + page.id
    Vue.http.get(url).then(response => success(response.json().page), response => error(response.json()))
  },

  publish (pageId, success, error) {
    const url = 'page/publish/' + pageId
    Vue.http.get(url).then(response => success(response.json()), response => error(response.json()))
  },

  setUrl (pageId, pageUrl, success, error) {
    const url = 'page/modurl/' + pageId + '/' + pageUrl
    Vue.http.get(url).then(response => success(response.json()), response => error(response.json()))
  }
}
