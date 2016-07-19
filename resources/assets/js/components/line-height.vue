<script>
import dropdown from './dropdown.vue'

export default {
  components: {
    dropdown
  },
  props: {
    lineHeight: {
      // type: String,
      required: true,
      twoWay: true
    }
  },
  data (){
    return {
      show: false,
      lineHeights: [1.0, 1.2, 1.4, 1.6, 1.8, 2.0]
    }
  },
  methods:{
    setLineHeight: function(line){
      this.lineHeight = line;
      this.show = false;
    }
  }
}
</script>

<template>
  <dropdown :show.sync="show">
    <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="行高"><span class="glyphicon glyphicon-text-height"></span> <span class="caret"></span></div>
    <ul slot="dropdown-menu" class="dropdown-menu dropdown-menu-narrow">
      <li v-for="line in lineHeights" @click="setLineHeight(line)" :class="{'selected':lineHeight == line}">{{line}}</li>
    </ul>
  </dropdown>
</template>

<style>

</style>