import * as types from '../mutation-types'
import imageAPI from '../../api/imageAPI'

export const closeMessageBox = ({ commit }) => {
  commit(types.CLOSE_MESSAGE_BOX)
}

export const warning = ({ commit }, msg) => {
  commit(types.WARNING, { msg })
}

export const confirm = ({ commit }, msg) => {
  commit(types.CONFIRM, { msg })
}

export const getInput = ({ commit }, msg) => {
  commit(types.GET_INPUT, { msg })
}

export const loadImages = ({ commit }, [projectId, folder]) => {
  imageAPI.list(projectId, folder, data => {
    const images = data.images
    commit(types.LOAD_IMAGES, { images })
  })
}

export const getImage = ({ commit }, onSelect) => {
  commit(types.GET_IMAGE, { onSelect })
}

export const colseImageLibrary = ({ commit }) => {
  commit(types.CLOSE_IMAGE_LIBRARY)
}

export const loading = ({ commit }) => {
  commit(types.LOADING)
}

export const loadingDone = ({ commit }) => {
  commit(types.LOAD_DONE)
}
