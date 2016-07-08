<style>
.font-size-item{
  float:left;
  width:56px;
  line-height:35px;
  text-align: center;
  vertical-align: middle;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  cursor: pointer;
}

.font-size-item:hover{
  background-color: #eee;
}

.font-size-wrapper .selected{
  background-color: #eee;
}

.font-size-wrapper{
  width:168px;
}

.font-size-wrapper div:nth-child(-n+3){
  border-top:0;
}

.font-size-wrapper div:nth-child(3n+1){
  border-left:0;
}

</style>

<template>
  <dropdown :show.sync="show">
      
    <div class="btn btn-default dropdown-toggle" data-toggle="dropdown">{{fontSizeInt}} <span class="caret"></span></div>
    <div slot="dropdown-menu" class="dropdown-menu" :class="{'dropdown-menu-right':position === 'right'}">
      <div class="font-size-wrapper">
        <div v-for="size in fontSizes" @click="setSize(size)" class="font-size-item" :class="{'selected':fontSizeInt === size}">{{size}}</div>
        <!-- <div class="font-size-item">自订</div>    -->
      </div>
    </div>
  </dropdown>
</template>

<script>
import dropdown from './dropdown.vue'

export default {
  components: {
    dropdown
  },
  props: {
    fontSize: {
      // type: String,
      required: true,
      twoWay: true
    },
    position: {
      type: String,
      default: "left"
    }
  },
  computed:{
    fontSizeInt:{
      get: function(){
        return parseInt(this.fontSize);
      },
      set: function(newValue){
        this.fontSize = newValue + 'px';
      }
    }
  },
  data (){
    return {
      show: false,
      fontSizes: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40, 44, 48, 56, 64, 72]
    }
  },
  methods:{
    setSize: function(size){
      this.fontSizeInt = size;
      this.show = false;
    }
  }
}
</script>