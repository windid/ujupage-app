import page from '../../api/page'
import pageGroup from '../../api/pageGroup'
import project from '../../api/project'

export const init = ({ commit }) => {
  project.list( (data) => {
    console.log(data);
  },(data) => {
    errorHandler(data.err);
  });
}


const errorHandler = (error) => {

}