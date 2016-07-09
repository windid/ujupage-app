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
        this.button.settings.borderRadius = newValue + 'px';
      },
      get: function(){
        return parseInt(this.button.settings.borderRadius);
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

        <color-picker :color.sync="button.settings.backgroundColor">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(button.settings.backgroundColor)}"></div>
            <div class="float-color-block-text">按钮</div>
          </div>
        </color-picker>

        <color-picker :color.sync="button.settings.hoverColor">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(button.settings.hoverColor)}"></div>
            <div class="float-color-block-text">悬停</div>
          </div>
        </color-picker>
        
        <color-picker :color.sync="button.settings.fontColor" :position="'right'">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(button.settings.fontColor)}"></div>
            <div class="float-color-block-text">文字</div>
          </div>
        </color-picker>

        <color-picker :color.sync="button.settings.borderColor" :position="'right'">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(button.settings.borderColor)}"></div>
            <div class="float-color-block-text">边框</div>
          </div>
        </color-picker>

      </div>

      <div class="sidebar-block">
        <div class="input-group font-size-input">
          <div class="input-group-addon">字号</div>
          <div class="input-group-btn">
            <font-size :font-size.sync="button.settings.fontSize"></font-size>
          </div>
        </div>
        <div class="input-group corner-radius-input shadow">
          <div class="input-group-addon"> 圆角 </div>
          <input type="text" class="form-control input-text-shadow" style="text-align:center" v-model="borderRadius">
        </div>
        <div style="clear:both"></div>
      </div>

      <div class="sidebar-block" style="text-align:center;">
        <checkbox-button :value.sync="button.settings.bold">加粗</checkbox-button> &nbsp; 
        <checkbox-button :value.sync="button.settings.shadow">阴影</checkbox-button> &nbsp; 
        <checkbox-button :value.sync="button.settings.border">边框</checkbox-button>
      </div>
      
    </div>
  </sidebar>
</template>