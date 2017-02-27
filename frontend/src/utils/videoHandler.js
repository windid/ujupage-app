/** 视频辅助工具 */

const rawFiles = ['mp4', 'webm', 'ogv', 'flv', 'mov']
const h5RawFiles = ['mp4', 'webm', 'ogv']

const reg = {
  raw: new RegExp(`.(${rawFiles.join('|')})$`),
  h5raw: new RegExp(`.(${h5RawFiles.join('|')})$`)
}

function parseXML (code) {
  const parser = new window.DOMParser()
  const doc = parser.parseFromString(code, 'text/html')
  const body = doc.documentElement.querySelector('body')
  let info = null

  if (body.children && body.children.length >= 1) {
    const main = body.children[0]
    const name = main.tagName
    if (name === 'IFRAME' || name === 'OBJECT' || name === 'EMBED') {
      info = {}
      info.type = name
      info.width = main.getAttribute('width')
      info.height = main.getAttribute('height')
      info.src = main.getAttribute('src')
      return info
    }
  }
  return info
}

// 判断所输入是否为合法的视频地址或嵌入代码
function isValid (content) {
  return isRaw(content) || isEmbed(content)
}

function clearQuery (path) {
  return path.replace(/(\?.*)$/, '')
}

function isRaw (path) {
  return reg.raw.test(clearQuery(path))
}

function isH5Raw (path) {
  return reg.h5raw.test(clearQuery(path))
}

function isEmbed (path) {
  return parseXML(path) !== null
}

export default {
  isValid,
  isRaw,
  isH5Raw,
  isEmbed,
  parseXML
}
