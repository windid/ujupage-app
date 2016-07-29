Vue.http.options.root = '/dashboard/page/project/';

export default {

  list (success, error){
    const url = 'list';
    Vue.http.get(url).then((response)=>{success(response.json())}, (response)=>{error(response.json())});
  },

  create (name, success, error){
    const url = 'create'
    const body = {
      name: name
    }
    Vue.http.post(url, body).then((response)=>{success(response.json())}, (response)=>{error(response.json())});
  },

  remove (projectId, success, error){
    const url = 'remove?id=' + projectId;
    Vue.http.get(url).then((response)=>{success(response.json())}, (response)=>{error(response.json())});
  },

  rename (projectId, name, success, error){
    const url = 'rename?id=' + projectId + '&name=' + name;
    Vue.http.get(url).then((response)=>{success(response.json())}, (response)=>{error(response.json())});
  }

}