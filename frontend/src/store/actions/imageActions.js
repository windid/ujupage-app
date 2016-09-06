import * as types from '../mutation-types'
import imageAPI from '../../api/imageAPI'

export const loadImages = ({ commit }, [folder = 'default', page = 1, pageSize = 9999, projectId = 0, userId = 0]) => {
  imageAPI.list(projectId, images => {
    commit(types.LOAD_IMAGES, { images })
  })
}
