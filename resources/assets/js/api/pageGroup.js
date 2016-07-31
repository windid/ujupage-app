export default {

  list (projectId, success, error){
    const url = 'pagegroup/get/' + projectId;
    Vue.http.get(url).then(response => success(response.json().pagegroups), response => error(response.json()));
  },

  create (projectId, name, success, error){
    const url = 'create'
    const body = {
      projectId: projectId,
      name: name
    }
    Vue.http.get(url, body).then( response => success(response.json()), response => error(response.json()) );
  },

  remove (groupId, success, error){
    const url = 'remove?id=' + groupId;
    Vue.http.get(url).then( response => success(response.json()), response => error(response.json()) );
  },

  rename (groupId, name, success, error){
    const url = 'rename?id=' + groupId + '&name=' + name;
    Vue.http.get(url).then( response => success(response.json()), response => error(response.json()) );
  }

}