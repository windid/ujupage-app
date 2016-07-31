import pageAPI from '../../api/page'
import pageGroupAPI from '../../api/pageGroup'
import projectAPI from '../../api/project'
import getParameter from '../../utils/getParameter'
import * as types from './mutation-types'


export const init = ({ commit }) => {
  projectAPI.list( projects => {
    commit(types.LOAD_PROJECTS, { projects });
    const getProjectId = getParameter('id');
    let currentProject = projects.find( p => p.id == getProjectId ) || projects.find( p => p.is_default == 1 ) || projects[0];
    switchProject({ commit }, currentProject );
  }, data => commit(types.LOAD_FAILED, { source:'projects', err:data.err }) );
}

export const switchProject = ({ commit }, project) => {
  commit(types.SET_CURRENT_PROJECT, { project });
  projectAPI.members( project.id, members => {
    commit(types.LOAD_MEMBERS, { members });
  }, data => commit(types.LOAD_FAILED, { source:'members', err:data.err }) );

  pageGroupAPI.list( project.id, pageGroups => {
    commit(types.LOAD_PAGEGROUPS, { pageGroups });
    let currentPageGroup = pageGroups.find( g => g.is_default == 1) || pageGroups[0];
    switchPageGroup({ commit }, currentPageGroup);
  }, data => commit(types.LOAD_FAILED, { source:'pageGroups', err:data.err }) );
}

export const switchPageGroup = ({ commit }, pageGroup) => {
  commit(types.SET_CURRENT_PAGEGROUP, {pageGroup});
  pageAPI.list(pageGroup.id, pages => {
    commit(types.LOAD_PAGES, { pages });
  }, data => commit(types.LOAD_FAILED, { source:'pages', err:data.err }) );
}

export const createProject = ({ commit }, project) => {

}

export const removeProject = ({ commit }, project) => {
  
}

export const renameProject = ({ commit }, project, newName) => {
  
}

export const inviteMember = ({ commit }, member, project) => {
  
}

export const removeMember = ({ commit }, member, project) => {
  
}

export const quitProject = ({ commit }, project) => {
  
}

export const createPageGroup = ({ commit }, pageGroup) => {

}

export const removePageGroup = ({ commit }, pageGroup) => {

}

export const renamePageGroup = ({ commit }, pageGroup, newName) => {

}

export const createPage = ({ commit }, page) => {

}

export const removePage = ({ commit }, page) => {

}

export const renamePage = ({ commit }, page) => {

}

