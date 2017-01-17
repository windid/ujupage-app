import Vue from 'vue'
import colorMixin from 'src/mixins/colorMixin'

describe('colorMixin.getColor', () => {
  it('should return valid color format', () => {
    const Ctor = Vue.extend(colorMixin)
    const vm = new Ctor()
    expect(vm.getColor('transparent').to.equal('transparent'))
    expect(vm.getColor('#233').to.equal('#233'))
    expect(vm.getColor('#fe2345').to.equal('#fe2345'))
    expect(vm.getColor('rgb(0,0,0)').to.equal('rgb(0,0,0)'))
    expect(vm.getColor('rgba(0, 0, 0, 1)').to.equal('rgb(0, 0, 0, 1)'))
    expect(vm.getColor('hsl(123,70%,30%)').to.equal('hsl(123,70%,30%)'))
    expect(vm.getColor('hsl(123, 70%, 30%, .5)').to.equal('hsl(123, 70%, 30%, .5)'))
  })
})
