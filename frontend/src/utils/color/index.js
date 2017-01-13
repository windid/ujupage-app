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

function bound01 (n, max) {
  n = minN(max, maxN(0, parseFloat(n)))
  if ((Math.abs(n - max) < 0.000001)) {
    return 1
  }
  return (n % max) / parseFloat(max)
}

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

export function rgb2hex (r, g, b) {
  var hex = [
    pad2(roundN(r).toString(16)),
    pad2(roundN(g).toString(16)),
    pad2(roundN(b).toString(16))
  ]
  return hex.join('')
}

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
    result.rgb = { r: 0, g: 0, b: 0, a: 0 }
  }
  let match
  if ((match = matchers.rgb.exec(color))) {
    result.rgb = { r: match[1], g: match[2], b: match[3] }
  }
  if ((match = matchers.rgba.exec(color))) {
    result.rgb = { r: match[1], g: match[2], b: match[3], a: match[4] }
  }
  if ((match = matchers.hsl.exec(color))) {
    result.hsl = { h: match[1], s: match[2], l: match[3] }
  }
  if ((match = matchers.hsla.exec(color))) {
    result.hsl = { h: match[1], s: match[2], l: match[3], a: match[4] }
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

export function getValidColor (c) {
  const { r, g, b } = c.rgb
  if (c.a !== 1) {
    return `rgba(${r}, ${g}, ${b}, ${c.a})`
  } else {
    return '#' + rgb2hex(r, g, b)
  }
}

function Color (color, old = {}) {
  if (typeof color === 'string') {
    color = getColor(color)
  }
  color.a = color.a || old.a || 1
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
