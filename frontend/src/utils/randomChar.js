const randomChar = (len) => {
  var x = '0123456789abcdefghijklmnopqrstuvwxyz'
  var tmp = ''
  for (var i = 0; i < len; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
  }
  return tmp
}

export default randomChar
