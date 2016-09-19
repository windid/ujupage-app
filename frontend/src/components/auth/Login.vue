<script>
// import Vue from 'vue'

export default {
  data () {
    return {
      style: {
        borderWidth: '0',
        borderStyle: 'solid',
        borderColor: '#666'
      }
    }
  },

  mounted () {
    // Vue.set(this.style, 'borderBottomWidth', '3px')
    // this.style.borderBottomWidth = '3px'
    this.style = {
      borderWidth: '0',
      borderStyle: 'solid',
      borderColor: '#666',
      borderTopWidth: '3px',
      borderBottomWidth: '3px'
    }

    this.style = {
      borderWidth: '0',
      borderStyle: 'solid',
      borderColor: '#666'
    }
  }
}

</script>

<template>
<div>
  <div :style="style">
    123
  </div>
</div>
</template>