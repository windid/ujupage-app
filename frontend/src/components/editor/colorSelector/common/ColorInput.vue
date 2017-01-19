<template>
  <div class="field">
    <input :value="shownValue" @input="onInput">
    <span>{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'color-input',
  props: {
    label: String,
    value: Number,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    filter: {
      type: Function,
      default (v) {
        return v
      }
    },
    validator: {
      type: Function,
      default (val) {
        return !Number.isNaN(val)
      }
    }
  },
  computed: {
    shownValue () {
      return this.filter(this.value)
    }
  },
  methods: {
    handleChange (val) {
      this.$emit('on-change', this.label, val)
    },
    onInput (e) {
      const val = parseFloat(e.target.value)
      if (this.validator(val)) {
        this.handleChange(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  flex: 1;
  margin: 0 2px;
  box-sizing: border-box;
  color: #999;
  text-align: center;
}
.input-wrap {
  position: relative;
}
span {
  display: block;
  font-size: 13px;
  margin-top: 5px;
  text-transform: uppercase;
}
input {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  line-height: 1.5;
  font-size: 12px;
  color: #111;
}
</style>