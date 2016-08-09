import * as types from '../mutation-types'
import { extend } from 'lodash'

const state = {
  messageBox:{
    show: false,
    onCancel: false,
    onConfirm: false,
    header: '',
    content: '',
    width: '400px',
    type:'warning'
  }
}

const mutations = {
  [types.WARNING] (state, { msg }){
    state.messageBox.type = 'warning';
    state.messageBox = extend(state.messageBox, msg);
    state.messageBox.show = true;
  },
  [types.CONFIRM] (state, { msg }){
    state.messageBox.type = 'confrim';
    state.messageBox = extend(state.messageBox, msg);
    state.messageBox.show = true;
  },
  [types.GET_INPUT] (state, { msg }){
    state.messageBox.type = 'input';
    state.messageBox = extend(state.messageBox, msg);
    state.messageBox.show = true;
  },
  [types.CLOSE_MESSAGE_BOX] (state){
    state.messageBox = {
      show: false,
      onCancel: false,
      onConfirm: false,
      header: '',
      content: '',
      width: '400px',
      type:'warning'
    }
  }
}

export default {
  state,
  mutations
}