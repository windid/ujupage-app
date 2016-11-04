export default {

  list (pageId, success, error){
    const url = 'page/variation/list/' + pageId;
    Vue.http.get(url).then(response => success(response.json().variations), response => error(response.json()));
  },

}