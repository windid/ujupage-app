<script>
import dropdown from '../../ui/dropdown.vue'
import {  }  from '../store/actions'
import {  } from '../store/getters'

export default {
  components: {
    dropdown
  },
  props:{
    variations: {
      type: Array,
      required: true,
      twoWay: true
    },
    currentVariationId: {
      type: Number,
      required: true,
      twoWay: true
    },
  },
  vuex: {
    actions: {
      
    },
    getters: {
      
    }
  },
  data () {
    return {
      show: false,
      currentVariationName: '',
      editingVariationId: null
    }
  },
  methods:{
    rename: function(variationId){
      this.editingVariationId = variationId;
      
      Vue.nextTick(function(){
        var input = document.getElementById("variation-name-" + variationId);
        input.focus();
      });
    },
    renameDone: function(){
      this.editingVariationId = null;
    }
  },
  watch: {
    "show": function(val){
      if(val === true){
        this.editingVariationId = null;
      }
    }
  },
  created: function(){
    let vm = this;
    this.variations.forEach(function(variation){
      if (variation.id == vm.currentVariationId){
        vm.currentVariationName = variation.name;
      }
    });
  }
}
</script>

<template>
  <dropdown :show.sync="show">
    <div class="variations-button" data-toggle="dropdown">
      <div v-if="variations.length > 1"><span class="current-variation-name">{{currentVariationName}}</span> <span class="caret"></span></div>
      <div v-else>A/B测试</div>
    </div>
    <ul slot="dropdown-menu" class="dropdown-menu variations-menu">
      <li v-for="variation in variations">
        <span class="variation-name">{{variation.name}}</span>
        <span class="caret-right"></span>
        <div v-show="editingVariationId === variation.id" class="input-group">
          <span class="input-group-addon">重命名</span>
          <input id="variation-name-{{variation.id}}" class="form-control" type="text" v-model="variation.name" @keyup.enter="renameDone">
          <span class="input-group-btn">
            <div class="btn btn-success" @click="renameDone">保存</div>
          </span>
        </div>
        <div v-else class="btn-group">
          <div class="btn btn-default" title="重命名" @click="rename(variation.id)"><span class="glyphicon glyphicon-pencil"></span></div>
          <div class="btn btn-default" title="复制"><span class="glyphicon glyphicon-duplicate"></span></div>
          <div class="btn btn-danger" title="删除"><span class="glyphicon glyphicon-trash"></span></div>
        </div>
        
      </li>
      <li>
        <span class="glyphicon glyphicon-plus"></span> 添加
      </li>
    </ul>
  </dropdown>
</template>

<style>
.variations-button{
  padding: 0 14px;
}

.current-variation-name{
  max-width: 120px;
  float: left;
  overflow: hidden;
  white-space: nowrap;
}

.variation-name{
  white-space: nowrap;
}

.variations-menu{
  cursor: default;
}

.variations-menu > li{
  position: relative;
  line-height: 34px;
  padding: 0 14px;
  cursor: pointer;
}

.variations-menu > li:hover{
  background: #eee;
}

.variations-menu > li > .btn-group {
  position: absolute;
  right:-100px;
  top: 0;
  display: none;
}

.variations-menu > li:hover > .btn-group{
  display:block;
}

.variations-menu > li > .input-group{
  position: absolute;
  left:0;
  top:0;
  width: 260px;
}

.caret-right{
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 0;
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: solid;
  border-color: transparent transparent transparent #333;
}


</style>