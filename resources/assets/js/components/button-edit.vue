<script>
import sidebar from './sidebar.vue'
import colorPicker from './color-picker.vue'
import fontSize from './font-size.vue'
import checkboxButton from './checkbox-button.vue'
import colorMixin from '../mixins/colorMixin.js'

export default {
  props:{
    button: {
      type: Object,
      require: true
    },
    show:{
      type: Boolean,
      require: true
    }
  },
  mixins: [colorMixin],
  components: {
    sidebar,
    colorPicker,
    fontSize,
    checkboxButton
  },
  computed:{
    borderRadius:{
      set: function(newValue){
        this.button.props.borderRadius = newValue + 'px';
      },
      get: function(){
        return parseInt(this.button.props.borderRadius);
      }
    }
  },
  methods:{
    editDone: function(){
      this.$dispatch('button-edit-done');
    }
  }
}
</script>

<template>
  <sidebar :show.sync="show" slot="tools">
    <div slot="header">
      <div class="btn btn-success" @click="editDone">&nbsp; 完成 &nbsp;</div>
    </div>
    <div slot="body">
    
      <div class="sidebar-block">
        <div class="input-group shadow">
          <div class="input-group-addon"> 按钮文字 </div>
          <input type="text" class="form-control input-text-shadow" v-model="button.text">
        </div>
      </div>

      <div class="sidebar-block color-groups">

        <color-picker :color.sync="button.props.backgroundColor">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(button.props.backgroundColor)}"></div>
            <div class="float-color-block-text">按钮</div>
          </div>
        </color-picker>

        <color-picker :color.sync="button.props.hoverColor">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(button.props.hoverColor)}"></div>
            <div class="float-color-block-text">悬停</div>
          </div>
        </color-picker>
        
        <color-picker :color.sync="button.props.fontColor" :position="'right'">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(button.props.fontColor)}"></div>
            <div class="float-color-block-text">文字</div>
          </div>
        </color-picker>

        <color-picker :color.sync="button.props.borderColor" :position="'right'">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(button.props.borderColor)}"></div>
            <div class="float-color-block-text">边框</div>
          </div>
        </color-picker>

      </div>

      <div class="sidebar-block">
        <div class="input-group font-size-input">
          <div class="input-group-addon">字号</div>
          <div class="input-group-btn">
            <font-size :font-size.sync="button.props.fontSize"></font-size>
          </div>
        </div>
        <div class="input-group corner-radius-input shadow">
          <div class="input-group-addon"> 圆角 </div>
          <input type="text" class="form-control input-text-shadow" style="text-align:center" v-model="borderRadius">
        </div>
        <div style="clear:both"></div>
      </div>

      <div class="sidebar-block" style="text-align:center;">
        <checkbox-button :value.sync="button.props.bold">加粗</checkbox-button> &nbsp; 
        <checkbox-button :value.sync="button.props.shadow">阴影</checkbox-button> &nbsp; 
        <checkbox-button :value.sync="button.props.border">边框</checkbox-button>
      </div>
      
    </div>
  </sidebar>
</template>

<style>

.float-color-picker{
  float:left;
  width:48px;
  text-align: center;
  cursor: pointer;
}

.color-groups .btn-group{
  margin-left:4px;
}

.color-groups .btn-group:first-child{
  margin:0;
}

.float-color-block{
  height:30px;
  width:100%;
  border:2px solid #ccc;
  border-radius: 4px;
}

.font-size-input{
  float:left;
  width:100px;
}

.corner-radius-input{
  float:right;
  width:100px;
}

.float-color-block-text{
  margin-top:4px;
}
</style>

