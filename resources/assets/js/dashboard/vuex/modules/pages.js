const state = {
  pages: []
}

const mutations = {
  LOAD_PAGE_LIST(state, pageList){
  	state.pages = pageList;
  }
}

export default {
  state,
  mutations
}