import * as types from '../mutation-types'

const state = {
  page: {}
}

const mutations = {
  [types.LOAD_STATS_PAGE] (state, { page }) {
    state.page = page
  },

  // 流量分配
  [types.STATS_TRAFIC_SPLIT] (state, { traficWeights }) {
    state.page.variations.forEach(variation => {
      variation.quota = traficWeights[variation.id]
    })
  }
}

export default {
  state,
  mutations
}
