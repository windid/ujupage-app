export default {

  list (success, error){
    const url = 'project/get';
    Vue.http.get(url).then(response => success(response.json().projects), response => error(response.json()));
  },

  create (project, success, error){
    const url = 'project/add'
    const data = {
      name: project.name
    }
    Vue.http.post(url, data).then( response => success(response.json().project), response => error(response.json()) );
  },

  remove (project, success, error){
    const url = 'project/remove/' + project.id;
    Vue.http.get(url).then( response => success(response.json()), response => error(response.json()) );
  },

  rename (project, name, success, error){
    const url = 'project/mod';
    const data = {
      id: project.id,
      name: name
    }
    Vue.http.post(url, data).then( response => success(response.json()), response => error(response.json()) );
  },

  members (projectId, success,error){
    const url = 'project/members/get/' + projectId;
    Vue.http.get(url).then( response => success(response.json().users), response => error(response.json()) );
  }

}