<script>
  import Modal from '../ui/Modal'
  import API from '../../API'
  import { mapActions } from 'vuex'

  export default {
    name: 'AbSplit',
    props: {
      show: {
        type: Boolean,
        required: true
      },
      variations: {
        type: Array,
        required: true
      },
      pageId: {
        type: Number,
        required: true
      }
    },
    components: {
      Modal
    },
    data () {
      return {
        weights: [],
        error: ''
      }
    },
    methods: {
      ...mapActions(['loading', 'loadingDone']),
      save () {
        const quota = {}
        this.variations.forEach((variation, index) => {
          quota[variation.id] = this.weights[index]
        })
        this.loading()
        API.page.split({ id: this.pageId }, { quota: quota }).then(response => {
          this.$emit('update-split', quota)
          this.$emit('close')
        }).catch(() => {
          this.error = '保存失败，请稍后再试！'
        }).finally(() => {
          this.loadingDone()
        })
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
        const difference = weights[index] - val
        const anotherIndex = (index === weights.length - 1) ? 0 : index + 1
        weights[index] = val
        weights[anotherIndex] += difference
        if (weights[anotherIndex] < 0) {
          this.$nextTick(() => {
            this.changeWeight(anotherIndex, 0)
          })
        }
        this.weights = [...weights]
      },
      inputWeight (e) {
        this.changeWeight(parseInt(e.target.getAttribute('data-index')), parseInt(e.target.value) || 0)
      }
    },
    created () {
      let sumQuota = 0.0
      const weights = []
      this.variations.forEach((variation) => {
        sumQuota = sumQuota + parseFloat(variation.quota)
      })
      let sumWeight = 0
      this.variations.forEach((variation, index) => {
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
      <div v-for="(variation, index) in variations" class="form-inline var-item">
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
      <p class="text-danger" style="float: left">{{error}}</p>
      <div class="btn btn-success btn-sm" @click="save">保存</div>
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
