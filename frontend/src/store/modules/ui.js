import * as types from '../mutation-types'
import { merge } from 'lodash'

const state = {
  messageBox: {
    onCancel: false,
    onConfirm: false,
    header: '',
    content: '',
    inputAddon: '',
    placeholder: '',
    hint: '',
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
    onCancel: false,
    images: []
  },
  messages: []
}

const mutations = {
  // ----------------------Message Box--------------------------
  [types.WARNING] (state, { msg }) {
    const message = merge({}, state.messageBox, msg)
    message.type = 'warning'
    state.messages.push(message)
  },
  [types.CONFIRM] (state, { msg }) {
    const message = merge({}, state.messageBox, msg)
    message.type = 'confrim'
    state.messages.push(message)
  },
  [types.GET_INPUT] (state, { msg }) {
    const message = merge({}, state.messageBox, msg)
    message.type = 'input'
    state.messages.push(message)
  },
  [types.NEXT_MESSAGE] (state) {
    state.messages.shift()
  },

  // --------------------Image Library------------------------
  [types.GET_IMAGE] (state, { onSelect, onCancel }) {
    state.imageLibrary.onSelect = onSelect
    state.imageLibrary.onCancel = onCancel
    state.imageLibrary.show = true
  },
  [types.CLOSE_IMAGE_LIBRARY] (state) {
    state.imageLibrary.onSelect = false
    state.imageLibrary.onCancel = false
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
