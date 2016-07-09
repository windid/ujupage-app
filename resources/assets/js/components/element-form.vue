<script>
import { modifyElement }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import elementCommon from './element-common.vue'
import buttonEdit from './button-edit.vue'
import { merge } from 'lodash'
import colorMixin from '../mixins/colorMixin.js'

export default {
  //接受父组件传参，element元素属性，sectionId:板块ID，elementId:元素ID
  props:['element','sectionId','elementId'],
  mixins: [colorMixin],
  components: {
    elementCommon,
    buttonEdit
  },
  vuex: {
    actions: {
      modifyElement
    },
    getters: {
      workspace: getWorkspaceData,
    }
  },
  methods:{
    edit: function(){
      this.buttonGroup = 'edit';
    },
    editButton: function(){
      this.editing = true;
    },
    editDone: function(){

    }
  },
  data (){
    return {
      buttonGroup:'main',
      editing: false,
      button: {
        text: this.element.button.text,
        settings: merge({}, this.element.button.settings),
      },
    }
  },
}
</script>
  
<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable">
    <div slot="content">
      <div class="el-overlay"></div>
      <div v-for="(index,field) in element.fields" class="form-field-wrapper">
        <template v-if="field.type === 'text'">
          <div v-if="!element.settings.labelInside"><label>{{field.label}}</label></div>
          <div>
            <input type="text" class="form-field-input" 
              :class="{'shadow-inside':element.settings.innerShadow}" 
              :style="{
                backgroundColor:getColor(element.settings.fieldColor),
                borderColor:getColor(element.settings.borderColor),
                color:getColor(element.settings.inputColor)
              }"
              placeholder="{{element.settings.labelInside ? field.label : ''}}
            ">
          </div>
        </template>
        <template v-if="field.type === 'textarea'">
          
        </template>
        <template v-if="field.type === 'radio'">
          
        </template>
        <template v-if="field.type === 'checkbox'">
          
        </template>
        <template v-if="field.type === 'china-state'">
          
        </template>
      </div>
      <div class="element-button"
        @dblclick="edit" 
        @mouseenter = "hover = true"
        @mouseleave = "hover = false"
        :style="[
          {
            borderRadius: button.settings.borderRadius,
            fontSize: button.settings.fontSize,
            backgroundColor:hover ? getColor(button.settings.hoverColor) : getColor(button.settings.backgroundColor),
            borderColor:getColor(button.settings.borderColor),
            color:getColor(button.settings.fontColor)
          }
        ]" 
        :class="{
          'element-button-shadow':button.settings.shadow,
          'element-button-border':button.settings.border,
          'element-button-bold':button.settings.bold
        }">
        {{button.text}}
      </div>
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-default" title="字段">字段</div>
        <div class="btn btn-default" title="风格">风格</div>
        <div class="btn btn-default" title="按钮" @click="editButton">按钮</div>
        <div class="btn btn-success" title="完成编辑" @click="editDone">完成</div>
      </div>
    </template>
    <template slot="tools">
      <button-edit :show.sync="editing" :button.sync="button"></button-edit>
    </template>
  </element-common>
</template>

<style>
.form-field-wrapper{
  padding:5px 0;
}

.form-field-input{
  line-height: 30px;
  width: 100%;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  padding: 2px 8px;
}

.shadow-inside{
  box-shadow: inset 0 1px 6px #ccc;
}

</style>