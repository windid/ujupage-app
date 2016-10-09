import API from '../../API'
import * as types from '../mutation-types'

// 数据初始化，在路由中调用
export const statsInit = ({ commit, state }, [route, callback = false]) => {
  const pageId = route.params.pageId
  if (parseInt(pageId) === state.stats.page.id) {
    if (callback) callback()
    return
  }
  API.page.get({ id: pageId }).then(response => {
    const page = response.data
    API.variation.get({ pageId: page.id }).then(response => {
      page.variations = response.data
      commit(types.LOAD_STATS_PAGE, { page })
      if (callback) callback()
    })
  })
}
