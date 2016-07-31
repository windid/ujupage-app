import * as types from '../mutation-types'


const state = {
  loadStatus: 'loading',
  failedInfo: ''
}

const mutations = {
  [types.LOAD_FAILED] (state, {source, err}){
    switch(source){
      case "projects":
        state.loadStatus = 'failed';
        state.failedInfo = '加载项目列表失败';
        break;
      case "pageGroups":
        state.loadStatus = 'failed';
        state.failedInfo = '加载页面分组失败';
        break;
      case "members":
        break;
      case "pages":
        state.loadStatus = 'failed';
        state.failedInfo = '加载页面列表失败';
      default:
        break;
    }
    console.log(source, err);
  }
}

export default {
  state,
  mutations
}