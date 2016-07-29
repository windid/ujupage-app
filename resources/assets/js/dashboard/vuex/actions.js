import page from '../../api/page'
import pageGroup from '../../api/pageGroup'
import project from '../../api/project'

export const init = ({ commit }) => {
  project.list( data => {
    const projects = data.projects;
    // commit(LOAD_PROJECTS);
    let project = projects.find( p => p.is_default == 1 );
    if (!project){
      project = projects[0];
    }




  },data => {
    errorHandler('INIT_FAILED', data.err);
  });
}


const errorHandler = (error) => {
  console.log(error)
}