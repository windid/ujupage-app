<script>
import dropdown from '../../ui/dropdown.vue'
import { setColorSet }  from '../store/actions'
import { getColorSet } from '../store/getters'

export default {
  components: {
    dropdown
  },
  vuex: {
    actions: {
      setColorSet
    },
    getters: {
      colorSet: getColorSet
    }
  },
  data () {
    return {
      colorSchemes:[
        {name:"海滩",         colors:['#E6E2AF',"#A7A37E","#EFECCA","#046380","#002F2F"]},
        {name:"佛罗伦萨",      colors:['#468966',"#FFF0A5","#FFB03B","#B64926","#8E2800"]},
        {name:"淡蓝",         colors:['#FCFFF5',"#D1DBBD","#91AA9D","#3E606F","#193441"]},
        {name:"菲德拉",       colors:['#FF6138',"#FFFF9D","#BEEB9F","#79BD8F","#00A388"]},
        {name:"蜜罐",         colors:['#105B63',"#FFFAD5","#FFD34E","#DB9E36","#BD4932"]},
        {name:"阿司匹林C",    colors:['#225378',"#1695A3","#ACF0F2","#F3FFE2","#EB7F00"]},
      ],
      show: false
    }
  }
}
</script>

<template>
  <dropdown :show.sync="show">
    <div data-toggle="dropdown" class="color-schemes-button">配色 <span class="glyphicon glyphicon-th-large"></span></div>
    <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">
      <div class="color-schemes-content">
        <div v-for="colorScheme in colorSchemes" @click="setColorSet(colorScheme.colors)">
          <!-- <div>{{colorScheme.name}}</div> -->
          <ul class="list-inline color-schemes-group">
            <li v-for="color in colorScheme.colors" :style="{background:color}" title="{{color}}"></li>
          </ul>
        </div>
        <div>
          <div style="text-align:center">当前选择</div>
          <ul class="list-inline color-schemes-group">
            <li v-for="color in colorSet" :style="{background:color}" title="{{color}}"></li>
          </ul>
        </div>
      </div>
      <div class="color-schemes-footer">
        <button class="btn btn-default btn-sm fl">自定义</button>
        <button class="btn btn-success btn-sm fr" @click="show=false">&nbsp; 完成 &nbsp;</button>
      </div>
    </div>
  </dropdown>

</template>

<style>
.color-schemes-button{
  padding:0 14px;
}

.color-schemes-content{
  cursor:default;
  height:420px;
  overflow-x: auto;
  padding:12px;
}

.color-schemes-group{
  border:3px solid #eee;
  padding:0;
  width: 256px;
  height:46px;
  margin:5px;
}

.color-schemes-group:hover{
  border-color: #ccc;
}

.color-schemes-group li{
  border:0;
  padding:0;
  width:50px;
  height:40px;
}

.color-schemes-footer{
  padding:0 12px;
  text-align: right;
}

</style>