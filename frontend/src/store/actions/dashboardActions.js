import pageAPI from '../../api/pageAPI'
import pageGroupAPI from '../../api/pageGroupAPI'
import projectAPI from '../../api/projectAPI'
import getParameter from '../../utils/getParameter'
import cookieHandler from '../../utils/cookieHandler'
import * as types from '../mutation-types'

export const init = ({ commit }) => {
  projectAPI.list(projects => {
    commit(types.LOAD_PROJECTS, { projects })
    // 加载默认项目，第一优先取路由传递的projectId，其次是Cookie，再次是用户默认项目，如果都没有，取项目列表的第一个。
    const projectId = getParameter('id') || cookieHandler.get('projectId')
    const currentProject = projects.find(p => p.id === projectId) || projects.find(p => p.is_default === 1) || projects[0]
    switchProject({ commit }, currentProject)
  }, data => commit(types.LOAD_FAILED, { source: 'projects', err: data.err }))
}

export const switchProject = ({ commit }, project) => {
  // commit(types.LOADING)
  commit(types.EMPTY_PAGEGROUPS)
  commit(types.EMPTY_PAGES)
  commit(types.SET_CURRENT_PROJECT, { project })
  cookieHandler.set('projectId', project.id, 365)

  loadMembers({ commit }, project)

  pageGroupAPI.list(project, pageGroups => {
    commit(types.LOAD_PAGEGROUPS, { pageGroups })
    const currentPageGroup = pageGroups.find(g => g.is_default === 1) || pageGroups[0]
    switchPageGroup({ commit }, currentPageGroup)
  }, data => commit(types.LOAD_FAILED, { source: 'pageGroups', err: data.err }))
}

export const switchPageGroup = ({ commit }, pageGroup) => {
  commit(types.LOADING)
  pageAPI.list(pageGroup.id, pages => {
    commit(types.SET_CURRENT_PAGEGROUP, { pageGroup })
    commit(types.LOAD_PAGES, { pages })
  }, data => commit(types.LOAD_FAILED, { source: 'pages', err: data.err }))
}

export const createProject = ({ commit }, project) => {
  projectAPI.create(project, project => {
    commit(types.CREATE_PROJECT, { project })
  }, data => commit(types.LOAD_FAILED, { source: 'createProject', err: data.err }))
}

export const removeProject = ({ commit }, project) => {
  projectAPI.remove(project, data => {
    commit(types.REMOVE_PROJECT, { project })
  }, data => commit(types.LOAD_FAILED, { source: 'removeProject', err: data.err }))
}

export const renameProject = ({ commit }, [project, newName]) => {
  projectAPI.rename(project, newName, data => {
    commit(types.RENAME_PROJECT, { project, newName })
  }, data => commit(types.LOAD_FAILED, { source: 'renameProject', err: data.err }))
}

export const loadMembers = ({ commit }, project) => {
  projectAPI.members(project, (members, invited) => {
    commit(types.LOAD_MEMBERS, { members, invited })
  }, data => commit(types.LOAD_FAILED, { source: 'loadMembers', err: data.err }))
}

export const inviteMember = ({ commit, state }, member) => {
  projectAPI.invite(member, state.projects.current, member => {
    loadMembers({ commit }, state.projects.current)
  }, data => commit(types.LOAD_FAILED, { source: 'inviteMember', err: data.err }))
}

export const removeMember = ({ commit }, member, project) => {

}

export const quitProject = ({ commit }, project) => {

}

export const createPageGroup = ({ commit }, pageGroup) => {
  pageGroupAPI.create(pageGroup, pageGroup => {
    commit(types.CREATE_PAGEGROUP, { pageGroup })
  }, data => commit(types.LOAD_FAILED, { source: 'createPageGroup', err: data.err }))
}

export const removePageGroup = ({ commit }, pageGroup) => {
  pageGroupAPI.remove(pageGroup, data => {
    commit(types.REMOVE_PAGEGROUP, { pageGroup })
  }, data => commit(types.LOAD_FAILED, { source: 'removePageGroup', err: data.err }))
}

export const setEditingPageGroup = ({ commit }, pageGroup) => {
  commit(types.SET_EDITING_PAGEGROUP, { pageGroup })
}

export const renamePageGroup = ({ commit, state }, newName) => {
  const pageGroup = state.pageGroups.editing
  pageGroupAPI.rename(pageGroup, newName, data => {
    commit(types.RENAME_PAGEGROUP, { pageGroup, newName })
  }, data => commit(types.LOAD_FAILED, { source: 'renamePageGroup', err: data.err }))
}

export const createPage = ({ commit }, page) => {
  pageAPI.create(page, page => {
    commit(types.CREATE_PAGE, { page })
  }, data => commit(types.LOAD_FAILED, { source: 'createPage', err: data.err }))
}

export const removePage = ({ commit }, page) => {
  pageAPI.remove(page, data => {
    commit(types.REMOVE_PAGE, { page })
  }, data => commit(types.LOAD_FAILED, { source: 'removePage', err: data.err }))
}

export const renamePage = ({ commit }, [page, newName]) => {
  pageAPI.rename(page, newName, data => {
    commit(types.RENAME_PAGE, { page, newName })
  }, data => commit(types.LOAD_FAILED, { source: 'renamePage', err: data.err }))
}

export const movePage = ({ commit }, [page, pageGroup]) => {
  pageAPI.move(page, pageGroup, data => {
    commit(types.REMOVE_PAGE, { page })
  }, data => commit(types.LOAD_FAILED, { source: 'movePage', err: data.err }))
}

export const duplicatePage = ({ commit }, page) => {
  pageAPI.duplicate(page, page => {
    commit(types.CREATE_PAGE, { page })
  }, data => commit(types.LOAD_FAILED, { source: 'duplicatePage', err: data.err }))
}
