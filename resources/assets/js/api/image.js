export default {

  list (projectId, folder, page = 1, pageSize = 9999, success, error){
    const url = 'page/image/list/' + projectId + '/' + folder + '/' + page + '/' + pageSize;
    Vue.http.get(url).then(response => success(response.json()), response => error(response.json()));
  },

  /*
  * image = {
  *   file: Object,
  *   folder: 'String',
  *   project_id: '',
  *   url: ''
  * }
  */
  upload (projectId, image, success, error){
    const url = 'page/image/upload'
    Vue.http.post(url, image).then( response => success(response.json().image), response => error(response.json()) );
  },

  remove (projectId, imageId, success, error){
    const url = 'page/image/delimage/' + projectId + '/' + imageId;
    Vue.http.get(url).then( response => success(response.json()), response => error(response.json()) );
  },

  modify (image, success, error){
    const url = 'page/image/modimage';
    Vue.http.post(url, image).then( response => success(response.json()), response => error(response.json()) );
  }

}