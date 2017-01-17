import Color, {
  isValidColor
} from 'src/utils/color'

describe('Color utils', () => {
  it('should return if a color is valid', () => {
    expect(isValidColor('#233')).to.true
    expect(isValidColor('rgba(0, 0, 23, .3)')).to.true
    expect(isValidColor('#fefefe')).to.true
    expect(isValidColor('333')).to.true
    expect(isValidColor('rgb(0, 0, 0)')).to.true

    expect(isValidColor('#22')).to.false
    expect(isValidColor('#fefe')).to.false
    expect(isValidColor('rgb(0, 0)')).to.false
  })

  it('should return a color object', () => {
    expect(Color('#fff')).to.be.a('object')
  })
})