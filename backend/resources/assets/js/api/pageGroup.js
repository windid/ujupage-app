export default {

  list (projectId, success, error){
    const url = 'dashboard/pagegroup/get/' + projectId;
    Vue.http.get(url).then(response => success(response.json().pagegroups), response => error(response.json()));
  },

  create (pageGroup, success, error){
    const url = 'dashboard/pagegroup/add'
    const data = {
      project_id: pageGroup.projectId,
      name: pageGroup.name
    }
    Vue.http.post(url, data).then( response => success(response.json().group), response => error(response.json()) );
  },

  remove (pageGroup, success, error){
    const url = 'dashboard/pagegroup/remove/' + pageGroup.id;
    Vue.http.get(url).then( response => success(response.json()), response => error(response.json()) );
  },

  rename (pageGroup, name, success, error){
    const url = 'dashboard/pagegroup/mod';
    const data = {
      id: pageGroup.id,
      name: name
    }
    Vue.http.post(url, data).then( response => success(response.json()), response => error(response.json()) );
  }

}