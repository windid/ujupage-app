// import projectAPI from '../../api/projectAPI'
import API from '../../API'
import getParameter from '../../utils/getParameter'
import cookieHandler from '../../utils/cookieHandler'
import * as types from '../mutation-types'

export const dashboardInit = ({ commit, state }, [route, callback = false]) => {
  if (state.dashboard.projects.length > 0) {
    if (callback) callback()
    return
  }
  API.project.get().then(response => {
    const projects = response.data
    commit(types.LOAD_PROJECTS, { projects })
    // 加载默认项目，第一优先取路由传递的projectId，其次是Cookie，再次是用户默认项目，如果都没有，取项目列表的第一个。
    const projectId = getParameter('id') || cookieHandler.get('projectId')
    const currentProject = projects.find(p => p.id === projectId) || projects.find(p => p.is_default === 1) || projects[0]
    switchProject({ commit }, [currentProject, callback])
  })
}

export const switchProject = ({ commit }, [project, callback = false]) => {
  // commit(types.LOADING)
  commit(types.EMPTY_PAGEGROUPS)
  commit(types.EMPTY_PAGES)
  commit(types.SET_CURRENT_PROJECT, { project })
  cookieHandler.set('projectId', project.id, 365)

  loadMembers({ commit }, project)

  API.pageGroup.get({ projectId: project.id }).then(response => {
    const pageGroups = response.data
    commit(types.LOAD_PAGEGROUPS, { pageGroups })
    const currentPageGroup = pageGroups.find(g => g.is_default === 1) || pageGroups[0]
    switchPageGroup({ commit }, [currentPageGroup, callback])
  })
}

export const switchPageGroup = ({ commit }, [pageGroup, callback = false]) => {
  commit(types.SET_CURRENT_PAGEGROUP, { pageGroup })
  API.page.get({ group_id: pageGroup.id }).then(response => {
    commit(types.LOAD_PAGES, { pages: response.data })
    if (callback) callback()
  })
}

// export const createProject = ({ commit }, project) => {
//   projectAPI.create(project, project => {
//     commit(types.CREATE_PROJECT, { project })
//   }, data => commit(types.LOAD_FAILED, { source: 'createProject', err: data.err }))
// }

// export const removeProject = ({ commit }, project) => {
//   projectAPI.remove(project, data => {
//     commit(types.REMOVE_PROJECT, { project })
//   }, data => commit(types.LOAD_FAILED, { source: 'removeProject', err: data.err }))
// }

// export const renameProject = ({ commit }, [project, newName]) => {
//   projectAPI.rename(project, newName, data => {
//     commit(types.RENAME_PROJECT, { project, newName })
//   }, data => commit(types.LOAD_FAILED, { source: 'renameProject', err: data.err }))
// }

export const loadMembers = ({ commit }, project) => {
  API.projectMember.get({ projectId: project.id }).then(response => {
    const members = response.data
    commit(types.LOAD_MEMBERS, { members })
  })
}

// export const inviteMember = ({ commit, state }, member) => {
//   projectAPI.invite(member, state.dashboard.currentProject, member => {
//     loadMembers({ commit }, state.dashboard.currentProject)
//   }, data => commit(types.LOAD_FAILED, { source: 'inviteMember', err: data.err }))
// }

export const removeMember = ({ commit }, member, project) => {

}

export const quitProject = ({ commit }, project) => {

}

export const createPageGroup = ({ commit }, pageGroup) => {
  API.pageGroup.save({ projectId: pageGroup.projectId }, pageGroup).then(response => {
    const pageGroup = response.data
    commit(types.CREATE_PAGEGROUP, { pageGroup })
  })
}

export const removePageGroup = ({ commit, state }, pageGroup) => {
  API.pageGroup.delete({ projectId: state.dashboard.currentPageGroup.id, id: pageGroup.id }).then(response => {
    commit(types.REMOVE_PAGEGROUP, { pageGroup })
  })
}

export const setEditingPageGroup = ({ commit }, pageGroup) => {
  commit(types.SET_EDITING_PAGEGROUP, { pageGroup })
}

export const renamePageGroup = ({ commit, state }, newName) => {
  const pageGroup = state.pageGroups.editing
  API.pageGroup.update({ projectId: state.dashboard.currentProject.id, id: pageGroup.id }, { name: newName }).then(response => {
    commit(types.RENAME_PAGEGROUP, { pageGroup, newName })
  })
}

export const createPage = ({ commit }, page) => {
  API.page.save({}, page).then(response => {
    commit(types.CREATE_PAGE, { page: response.data })
  })
}

export const removePage = ({ commit }, page) => {
  API.page.delete({ id: page.id }).then(response => {
    commit(types.REMOVE_PAGE, { page })
  })
}

export const renamePage = ({ commit }, [page, newName]) => {
  API.page.update({ id: page.id }, { name: newName }).then(response => {
    commit(types.RENAME_PAGE, { page, newName })
  })
}

export const movePage = ({ commit }, [page, pageGroup]) => {
  API.page.update({ id: page.id }, { name: page.name, group_id: pageGroup.id }).then(response => {
    console.log(response)
    commit(types.REMOVE_PAGE, { page })
  })
}

export const duplicatePage = ({ commit }, page) => {
  API.page.duplicate({ id: page.id }, {}).then(response => {
    commit(types.CREATE_PAGE, { page: response.data })
  })
}
