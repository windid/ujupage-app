import * as types from '../mutation-types'
import { extend } from 'lodash'

const state = {
  messageBox: {
    show: false,
    onCancel: false,
    onConfirm: false,
    header: '',
    content: '',
    width: '400px',
    type: 'warning'
  },
  load: {
    status: 'done',
    failedInfo: '',
    retry: ''
  },
  imageLibrary: {
    loading: 'loading',
    show: false,
    onSelect: false,
    images: []
  }
}

const mutations = {
  // ----------------------Message Box--------------------------
  [types.WARNING] (state, { msg }) {
    state.messageBox = extend(state.messageBox, msg)
    state.messageBox.type = 'warning'
    state.messageBox.show = true
  },
  [types.CONFIRM] (state, { msg }) {
    state.messageBox = extend(state.messageBox, msg)
    state.messageBox.type = 'confrim'
    state.messageBox.show = true
  },
  [types.GET_INPUT] (state, { msg }) {
    state.messageBox.type = 'input'
    state.messageBox = extend(state.messageBox, msg)
    state.messageBox.show = true
  },
  [types.CLOSE_MESSAGE_BOX] (state) {
    state.messageBox = {
      show: false,
      onCancel: false,
      onConfirm: false,
      header: '',
      content: '',
      width: '400px',
      type: 'warning'
    }
  },
  // --------------------Image Library------------------------
  [types.GET_IMAGE] (state, {onSelect}) {
    state.imageLibrary.onSelect = onSelect
    state.imageLibrary.show = true
  },
  [types.CLOSE_IMAGE_LIBRARY] (state) {
    state.imageLibrary.onSelect = false
    state.imageLibrary.show = false
  },
  [types.LOAD_IMAGES] (state, { images }) {
    state.imageLibrary.images = images
  },
  // --------------------Loading Status------------------------
  [types.LOADING] (state) {
    state.load.status = 'loading'
  },
  [types.LOAD_FAILED] (state, { source, err, retry = null }) {
    switch (source) {
      case 'projects':
        state.load.status = 'failed'
        state.load.failedInfo = '加载项目列表失败'
        break
      case 'pageGroups':
        state.load.status = 'failed'
        state.load.failedInfo = '加载页面分组失败'
        break
      case 'members':
        break
      case 'pages':
        state.load.status = 'failed'
        state.load.failedInfo = '加载页面列表失败'
        break
      default:
        break
    }
    state.load.retry = retry || null
    console.log(source, err)
  },
  [types.LOAD_DONE] (state) {
    state.load.status = 'done'
  }
}

export default {
  state,
  mutations
}
