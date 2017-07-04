// localStorage缓存key前缀
const STORAGE_KEY_PREFIX = 'editor_content_'

export default {
  save (page, variation, content) {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${page.id}_${variation.id}`, JSON.stringify(content))
  },
  get (pageId, variationId) {
    return localStorage.getItem(`${STORAGE_KEY_PREFIX}${pageId}_${variationId}`)
  },
  remove (pageId, variationId) {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${pageId}_${variationId}`)
  }
}
