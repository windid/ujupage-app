<script>
export default {
  data () {
    return {
      arr: ['a', 'b', 'c'],
      obj: {
        a: 'a',
        b: 'b',
        c: 'c'
      },
      arr2: [
        { v: 'a' },
        { v: 'b' },
        { v: 'c' },
        { v: 'c' }
      ]
    }
  }
}
</script>

<template>
  <div>
    <div v-for="(item, index) in arr" :key="index"><input type="text" v-model="item"></div>
    <div>{{arr}}</div>
    <div v-for="(item, index) in obj"><input type="text" v-model="item"></div>
    <div>{{obj}}</div>
    <div v-for="(item, index) in arr2"><input type="text" v-model="item.v"></div>
    <div>{{arr2}}</div>
  </div>
</template>