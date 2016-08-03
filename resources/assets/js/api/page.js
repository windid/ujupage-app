
export default {

  list (groupId, success, error){
    const url = 'page/get/' + groupId;
    Vue.http.get(url).then((response)=>{success(response.json().pages)}, (response)=>{error(response.json())});
  },

  create (page, success, error){
    const url = 'page/add';
    const data = {
      group_id: page.group_id,
      name: page.name
    };
    Vue.http.post(url, data).then( response => success(response.json().page), response => error(response.json()) );
  },

  remove (page, success, error){
    const url = 'page/remove/' + page.id;
    Vue.http.get(url).then( response => success(response.json()), response => error(response.json()) );
  },

  rename (page, name, success, error){
    const url = 'page/mod';
    const data = {
      id: page.id,
      name: name
    };
    Vue.http.post(url, data).then( response => success(response.json()), response => error(response.json()) );
  }

}