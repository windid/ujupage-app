<script>
import dropdown from './dropdown.vue'

export default {
  components: {
    dropdown
  },
  props:{
    pageInfo: {
      type: Object,
      required: true,
      twoWay: true
    },
    currentVariationId: {
      type: Number,
      required: true,
    },
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
    },

    createVariation: function(){
      let url = '/editor/page/variation/create/' + this.pageInfo.pageId;
      this.newVariation(url);
    },

    duplicateVariation: function(variationId){
      let url = '/editor/page/variation/duplicate/' + variationId;
      this.newVariation(url);
    },

    newVariation: function(url){
      this.$http.get(url).then(function(response){
        let data = response.json();
        this.$dispatch('variation-changed', data.id);
        this.pageInfo.variations.push({id:data.id, name:data.name});
        this.currentVariationName = data.name;
      }, function(response){
        console.log(response);
      });
    },

    removeVariation: function(variationId){

    },

    switchVariation: function(variationId,variationName){
      this.$dispatch('variation-changed', variationId);
      this.currentVariationName = variationName;
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
    this.pageInfo.variations.forEach(function(variation){
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
      <div v-if="pageInfo.variations.length > 1"><span class="current-variation-name">{{currentVariationName}}</span> &nbsp; <span class="caret"></span></div>
      <div v-else>A/B测试</div>
    </div>
    <ul slot="dropdown-menu" class="dropdown-menu variations-menu">
      <li v-for="variation in pageInfo.variations">
        <span class="variation-name" @click="switchVariation(variation.id, variation.name)">{{variation.name}}</span>
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
          <div class="btn btn-default" title="复制" @click="duplicateVariation(variation.id)"><span class="glyphicon glyphicon-duplicate"></span></div>
          <div class="btn btn-danger" title="删除" @click="removeVariation(variation.id)"><span class="glyphicon glyphicon-trash"></span></div>
        </div>
        
      </li>
      <li @click="createVariation()">
        <span class="glyphicon glyphicon-plus"></span> 空白页
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
  min-width: 130px;
  white-space: nowrap;
  display: block;
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
  right: 4px;
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: solid;
  border-color: transparent transparent transparent #333;
}


</style>