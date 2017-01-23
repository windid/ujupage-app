import Color, {
  isValidColor,
  getValidColor
} from 'src/utils/color'

describe('Color utils', () => {
  describe('#isValidColor()', () => {
    it('should return true if a color string is valid', () => {
      expect(isValidColor('#233')).to.true
      expect(isValidColor('rgba(0, 0, 23, .3)')).to.true
      expect(isValidColor('#fefefe')).to.true
      expect(isValidColor('333')).to.true
      expect(isValidColor('rgb(0, 0, 0)')).to.true
    })
    it('should return false if a color string is invalid', () => {
      expect(isValidColor('#22')).to.false
      expect(isValidColor('#fefe')).to.false
      expect(isValidColor('whatever')).to.false
      expect(isValidColor('rgb(0, 0)')).to.false
    })
  })

  describe('#Color()', () => {
    it('should return an object', () => {
      expect(Color('#fff')).to.be.an('object')
    })
    it('should return a object contains some color properties', () => {
      expect(Color('#000')).to.deep.equal({
        rgb: { r: 0, g: 0, b: 0 },
        hsl: { h: 0, s: 0, l: 0 },
        hsv: { h: 0, s: 0, v: 0 },
        a: 1
      })
      expect(Color('rgba(150, 100, 50, .5)')).to.deep.equal({
        rgb: { r: 150, g: 100, b: 50 },
        hsl: { h: 30, s: 50, l: 39 },
        hsv: { h: 30, s: 67, v: 59 },
        a: 0.5
      })
    })
  })

  describe('#getValidColor()', () => {
    it('should return a string', () => {
      expect(getValidColor('red')).to.be.a('string')
      expect(getValidColor('transparent')).to.be.a('string')
      expect(getValidColor('anything')).to.be.a('string')
    })
    it('should return valid formatted color or "Invalid"', () => {
      expect(getValidColor('red')).to.equal('#f00')
      expect(getValidColor('transparent')).to.equal('rgba(255,255,255,0)')
      expect(getValidColor('fe3456')).to.equal('#fe3456')
      expect(getValidColor('rgba(155, 100, 50, .3)')).to.equal('rgba(155,100,50,0.3)')
      expect(getValidColor('anything')).to.equal('Invalid')
    })
  })
})
