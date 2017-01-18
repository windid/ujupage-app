import colorNames from './colorNames'
import matchers from './matchers'

const minN = Math.min
const maxN = Math.max
const roundN = Math.round

function parseIntFromHex (val) {
  return parseInt(val, 16)
}

function pad2 (c) {
  return c.length === 1 ? '0' + c : '' + c
}

/**
 * 将n根据max转化为0到1之间的浮点数，例如bound01(50, 100) = 0.5
 * 若n > max将返回1，n < 0则返回0
 */
function bound01 (n, max) {
  n = minN(max, maxN(0, parseFloat(n)))
  if ((Math.abs(n - max) < 0.000001)) {
    return 1
  }
  return (n % max) / parseFloat(max)
}

function getN (val, max) {
  return bound01(val, max) * max
}

/**
 * 将rgb转化为hsv
 */
export function rgb2hsv ({ r, g, b }) {
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)

  const max = maxN(r, g, b)
  const min = minN(r, g, b)
  let h
  const v = max

  const d = max - min
  const s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return { h: roundN(h * 360), s: roundN(s * 100), v: roundN(v * 100) }
}

/**
 * 将hsv转化为rgb
 */
function hsv2rgb ({ h, s, v }) {
  h = bound01(h, 360) * 6
  s = bound01(s, 100)
  v = bound01(v, 100)

  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const mod = i % 6
  const r = [v, q, p, p, t, v][mod]
  const g = [t, v, v, q, p, p][mod]
  const b = [p, p, t, v, v, q][mod]

  return { r: roundN(r * 255), g: roundN(g * 255), b: roundN(b * 255) }
}

/**
 * rgb转为16进制串
 */
export function rgb2hex (r, g, b, allow3chars) {
  const hex = [
    pad2(roundN(r).toString(16)),
    pad2(roundN(g).toString(16)),
    pad2(roundN(b).toString(16))
  ].join('')
  let match
  if (allow3chars && (match = /^(\w)\1(\w)\2(\w)\3$/.exec(hex))) {
    return match.slice(1).join('')
  }
  return hex
}

/**
 * 将rgb转为hsl
 */
export function rgb2hsl ({ r, g, b }) {
  r = bound01(r, 255)
  g = bound01(g, 255)
  b = bound01(b, 255)
  const max = maxN(r, g, b)
  const min = minN(r, g, b)
  let h
  let s
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    var d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return { h: roundN(h * 360), s: roundN(s * 100), l: roundN(l * 100) }
}

/**
 * 将hsl转为rgb
 */
export function hsl2rgb ({ h, s, l }) {
  let r
  let g
  let b

  h = bound01(h, 360)
  s = bound01(s, 100)
  l = bound01(l, 100)

  function hue2rgb (p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return { r: roundN(r * 255), g: roundN(g * 255), b: roundN(b * 255) }
}

/**
 * 根据传入的表示颜色值的字符串，返回颜色对象
 * @param  {string} color 颜色值
 * @return {object}       { rgb, hsl, hsv, a}
 */
function getColor (color) {
  const result = {
    rgb: null,
    hsl: null,
    hsv: null,
    a: 1
  }
  color = color.trim()
  if (colorNames[color]) {
    color = colorNames[color]
  } else if (color === 'transparent') {
    result.rgb = { r: 0, g: 0, b: 0 }
    result.a = 0
  }
  let match
  if ((match = matchers.rgb.exec(color))) {
    result.rgb = { r: getN(match[1], 255), g: getN(match[2], 255), b: getN(match[3], 255) }
  }
  if ((match = matchers.rgba.exec(color))) {
    result.rgb = { r: getN(match[1], 255), g: getN(match[2], 255), b: getN(match[3], 255) }
    result.a = getN(match[4], 1)
  }
  if ((match = matchers.hsl.exec(color))) {
    result.hsl = { h: getN(match[1], 360), s: getN(match[2], 100), l: getN(match[3], 100) }
  }
  if ((match = matchers.hsla.exec(color))) {
    result.hsl = { h: getN(match[1], 360), s: getN(match[2], 100), l: getN(match[3], 100) }
    result.a = getN(match[4], 1)
  }

  if ((match = matchers.hex6.exec(color))) {
    result.rgb = {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3])
    }
  }
  if ((match = matchers.hex3.exec(color))) {
    result.rgb = {
      r: parseIntFromHex(match[1] + '' + match[1]),
      g: parseIntFromHex(match[2] + '' + match[2]),
      b: parseIntFromHex(match[3] + '' + match[3])
    }
  }
  return result
}

/**
 * 根据传入的颜色对象，返回一个可用的css颜色取值
 * 若透明度a为1，返回以#开头的16进制，否则返回rgba()
 * @param  {object} c { rgb, hsl, hsv, a}
 * @return {string}   #xxxxxx|rgba(x,x,x,x)
 */
export function getValidColor (c) {
  if (!(typeof c.rgb === 'object')) {
    c = Color(c)
  }
  const { r, g, b } = c.rgb
  if (c.a !== 1) {
    return `rgba(${r}, ${g}, ${b}, ${c.a.toFixed(2)})`
  } else {
    return '#' + rgb2hex(r, g, b, true)
  }
}

/**
 * 判断color是否能表示一个有效的颜色值
 * @param  {string}  color
 * @return {Boolean}
 */
export function isValidColor (color) {
  return [
    matchers.rgb,
    matchers.rgba,
    matchers.hsl,
    matchers.hsla,
    matchers.hex3,
    matchers.hex6
  ].some(re => re.test(color)) || color === 'transparent' || colorNames[color]
}

function Color (color, old = {}) {
  if (typeof color === 'string') {
    color = getColor(color)
  }
  color.a = typeof color.a !== 'number' ? typeof old.a === 'number' ? old.a : 1 : color.a
  if (color.rgb) {
    color.hsl = rgb2hsl(color.rgb)
    color.hsv = rgb2hsv(color.rgb)
  } else if (color.hsl) {
    color.rgb = hsl2rgb(color.hsl)
    color.hsv = rgb2hsv(color.rgb)
  } else if (color.hsv) {
    color.rgb = hsv2rgb(color.hsv)
    color.hsl = rgb2hsl(color.rgb)
  }
  return color
}

export default Color
