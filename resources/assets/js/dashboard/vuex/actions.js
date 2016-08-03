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
  commit(types.LOADING);
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
  commit(types.LOADING);
  pageAPI.list(pageGroup.id, pages => {
    commit(types.SET_CURRENT_PAGEGROUP, { pageGroup });
    commit(types.LOAD_PAGES, { pages });
  }, data => commit(types.LOAD_FAILED, { source:'pages', err:data.err }) );
}

export const createProject = ({ commit }, project) => {
  projectAPI.create(project, project => {
    commit(types.CREATE_PROJECT, { project });
  }, data => commit(types.LOAD_FAILED, { source: 'createProject', err: data.err }));
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
  pageGroupAPI.create(pageGroup, pageGroup => {
    commit(types.CREATE_PAGEGROUP, { pageGroup });
  }, data => commit(types.LOAD_FAILED, { source: 'createPageGroup', err: data.err }));
}

export const removePageGroup = ({ commit }, pageGroup) => {
  pageGroupAPI.remove(pageGroup, data => {
    commit(types.REMOVE_PAGEGROUP, { pageGroup });
  }, data => commit(types.LOAD_FAILED, { source: 'removePageGroup', err: data.err }));
}

export const setEditingPageGroup = ({ commit }, pageGroup) => {
  commit(types.SET_EDITING_PAGEGROUP, { pageGroup });
}

export const renamePageGroup = ({ commit, state }, newName) => {
  const pageGroup = state.pageGroups.editing;
  pageGroupAPI.rename(pageGroup, newName, data => {
    commit(types.RENAME_PAGEGROUP, { pageGroup, newName });
  }, data => commit(types.LOAD_FAILED, { source: 'renamePageGroup', err: data.err }));
}

export const createPage = ({ commit }, page) => {
  pageAPI.create(page, page => {
    commit(types.CREATE_PAGE, { page });
  }, data => commit(types.LOAD_FAILED, { source: 'createPage', err: data.err }));
}

export const removePage = ({ commit }, page) => {
  pageAPI.remove(page, data => {
    commit(types.REMOVE_PAGE, { page });
  }, data => commit(types.LOAD_FAILED, { source: 'removePage', err: data.err }));
}

export const renamePage = ({ commit }, [ page, newName ]) => {
  pageAPI.rename(page, newName, data => {
    commit(types.RENAME_PAGE, { page, newName })
  }, data => commit(types.LOAD_FAILED, { source: 'renamePage', err: data.err }));
}

export const movePage = ({ commit }, [ page, ]) => {

}

export const duplicatePage = ({ commit }, page) => {
  pageAPI.duplicate(page, page => {
    commit(types.CREATE_PAGE, { page });
  }, data => commit(types.LOAD_FAILED, { source: 'duplicatePage', err: data.err }));
}

export const closeMessageBox = ({ commit }) => {
  commit(types.CLOSE_MESSAGE_BOX);
}

export const warning = ({ commit }, msg) => {
  commit(types.WARNING, { msg });
}

export const confirm = ({ commit }, msg) => {
  commit(types.CONFIRM, { msg });
}

export const getInput = ({ commit }, msg) => {
  commit(types.GET_INPUT, { msg });
}

