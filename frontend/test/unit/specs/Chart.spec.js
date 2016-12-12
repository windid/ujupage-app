import Vue from 'vue'
import Chart from 'src/components/stats/charts/Chart.vue'

describe('Chart', () => {
  it('should render a svg', () => {
    const vm = new Vue({
      template: '<chart></chart>',
      components: { Chart }
    }).$mount()
    expect(vm.$el.querySelector('svg')).not.to.be.an('undefined')
    expect(vm.$el.querySelector('svg')).to.exist
  })
})
