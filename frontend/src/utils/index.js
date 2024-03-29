// 匹配中文的正则表达式
export const chineseRE = /^[\u4e00-\u9fa5]+$/
// 匹配简单邮箱的正则表达式
export const emailRE = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/
// 匹配页面url key的正则表达式
export const urlKeyRE = /^[a-zA-Z0-9]{3,}$/

export function addLeadingZeros (n, len) {
  let output = Math.abs(n).toString()
  while (output.length < len) {
    output = '0' + output
  }
  return output
}
