// localStorage缓存key前缀
const KEY_PREFIX = {
  pageContent: 'page_content_',
  pageVersion: 'page_version_'
}

/**
 * 缓存对象工厂函数
 * @param {string} prefix 内容key前缀
 * @param {function?} serialize 序列化函数
 * @param {function?} deserialize 反序列化函数
 */
function cacheCreator (prefix, serialize, deserialize) {
  return {
    save (page, variation, content) {
      localStorage.setItem(`${prefix}${page.id}_${variation.id}`, serialize ? serialize(content) : content)
    },
    get (pageId, variationId) {
      const content = localStorage.getItem(`${prefix}${pageId}_${variationId}`)
      return deserialize ? deserialize(content) : content
    },
    remove (pageId, variationId) {
      localStorage.removeItem(`${prefix}${pageId}_${variationId}`)
    }
  }
}

export const pageContentCache = cacheCreator(KEY_PREFIX.pageContent, JSON.stringify)

export const pageVersionCache = cacheCreator(KEY_PREFIX.pageVersion)
