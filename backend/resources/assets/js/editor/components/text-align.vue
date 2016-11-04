<script>
import dropdown from './dropdown.vue'

export default {
  components: {
    dropdown
  },
  props: {
    textAlign: {
      type: String,
      required: true,
      twoWay: true
    }
  },
  data (){
    return {
      show: false,
      textPositions: ['left','center','right']
    }
  },
  methods:{
    setTextAlign: function(position){
      this.textAlign = position;
      this.show = false;
    }
  }
}
</script>

<template>
  <dropdown :show.sync="show">
    <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="对齐">
      <span class="glyphicon glyphicon-align-{{textAlign}}"></span> <span class="caret"></span>
    </div>
    <ul slot="dropdown-menu" class="dropdown-menu dropdown-menu-narrow">
      <li v-for="position in textPositions" @click="setTextAlign(position)" :class="{'selected':textAlign == position}">
        <span class="glyphicon glyphicon-align-{{position}}"></span>
      </li>
    </ul>
  </dropdown>
</template>

<style>

</style>