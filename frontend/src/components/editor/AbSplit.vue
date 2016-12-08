<script>
  import Modal from '../ui/Modal'
  import { mapGetters } from 'vuex'
  // import { merge } from 'lodash'

  export default {
    name: 'AbSplit',
    props: {
      show: {
        type: Boolean,
        require: true
      }
    },
    components: {
      Modal
    },
    data () {
      return {
        variations: [],
        weights: [33, 33, 34]
      }
    },
    computed: {
      ...mapGetters({
        page: 'editingPage',
        workspace: 'editorWorkspace'
      })
      // variations () {
      //   let sumQuota = 0.0
      //   const variations = [...this.page.variations]
      //   variations.forEach((variation) => {
      //     sumQuota = sumQuota + parseFloat(variation.quota)
      //   })
      //   let sumWeight = 0
      //   variations.forEach((variation) => {
      //     variation.weight = parseInt(variation.quota / sumQuota * 100)
      //     sumWeight += variation.weight
      //   })
      //   variations[variations.length - 1].weight += (100 - sumWeight)
      //   return variations
      // }
    },
    methods: {
      submit () {
        console.log(this.weights)
      },
      decrease (index) {
        this.changeWeight(index, this.weights[index] - 1)
      },
      increase (index) {
        this.changeWeight(index, this.weights[index] + 1)
      },
      changeWeight (index, val) {
        val = (val < 0) ? 0 : val
        val = (val > 100) ? 100 : val
        const weights = this.weights
        const offset = weights[index] - val
        const anotherIndex = (index === weights.length - 1) ? index - 1 : index + 1
        weights[index] = val
        weights[anotherIndex] += offset
        if (weights[anotherIndex] < 0) {
          this.$nextTick(() => {
            this.changeWeight(anotherIndex, 0)
          })
        }
        this.weights = [...weights]
      },
      inputWeight (e) {
        this.changeWeight(parseInt(e.target.dataset['index']), parseInt(e.target.value) || 0)
      }
    },
    created () {
      let sumQuota = 0.0
      const variations = [...this.page.variations]
      const weights = []
      variations.forEach((variation) => {
        sumQuota = sumQuota + parseFloat(variation.quota)
      })
      let sumWeight = 0
      variations.forEach((variation, index) => {
        weights[index] = parseInt(variation.quota / sumQuota * 100)
        sumWeight += weights[index]
      })
      weights[weights.length - 1] += (100 - sumWeight)
      this.weights = [...weights]
    }
  }
</script>

<template>
  <modal :show="show" @close="$emit('close')" width="300px" height="500px">
    <h4 slot="header">版本流量分配</h4>
    <div slot="body">
      <div v-for="(variation, index) in page.variations" class="form-inline var-item">
        <div class="form-group var-name">
          <label>{{variation.name}}</label>
        </div>
        <div class="btn btn-default" @click="decrease(index)"> - </div>
        <div class="form-group">
          <div class="input-group var-input">
            <input type="text" class="form-control" :value="weights[index]" :data-index="index" @input="inputWeight">
            <span class="input-group-addon">%</span>
          </div>
        </div>
        <div class="btn btn-default" @click="increase(index)"> + </div>
      </div>
    </div>
    <div slot="footer">
      <div class="btn btn-primary btn-sm" @click="submit">确定</div>
    </div>
  </modal>
</template>

<style scoped>
  .var-item {
    margin-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #ddd;
  }
  .var-name {
    width: 80px;
  }
  .var-input {
    width: 90px;
  }
  .var-input > input {
    text-align: center;
  }
</style>
