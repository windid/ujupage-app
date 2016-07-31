
export default {

  list (groupId, success, error){
    const url = 'page/get/' + groupId;
    Vue.http.get(url).then((response)=>{success(response.json().pages)}, (response)=>{error(response.json())});
  },

  create (groupId, name, success, error){
    const url = 'create'
    const body = {
      groupId: groupId,
      name: name
    }
    Vue.http.post(url, body).then( response => success(response.json()), response => error(response.json()) );
  },

  remove (pageId, success, error){
    const url = 'remove?id=' + pageId;
    Vue.http.get(url).then( response => success(response.json()), response => error(response.json()) );
  },

  rename (pageId, name, success, error){
    const url = 'rename?id=' + pageId + '&name=' + name;
    Vue.http.get(url).then( response => success(response.json()), response => error(response.json()) );
  }

}