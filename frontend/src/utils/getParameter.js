const getParameter = function (val) {
  var re = new RegExp(val + '=([^&#]*)', 'i')
  var a = re.exec(window.location.href)
  if (a == null) {
    return null
  }
  return decodeURI(a[1])
}

export default getParameter
