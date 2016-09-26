import Vue from 'vue'

export default {

  list (pageId, success, error) {
    const url = 'editor/page/variation/list/' + pageId
    Vue.http.get(url).then(response => success(response.json().variations), response => error(response.json()))
  },

  get (variationId, success, error) {
    const url = 'editor/page/variation/' + variationId
    Vue.http.get(url).then(response => success(response.json()), response => error(response.json()))
  },

  save (variationId, content, success, error) {
    const url = 'editor/page/variation/save?id=' + variationId
    const data = {
      htmljson: content
    }
    Vue.http.post(url, data).then(response => success(response.json()), response => error(response.json()))
  }

}
