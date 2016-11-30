<script>
import ElementCommon from './ElementCommon'
import FormEditor from './FormEditor'
import colorMixin from '../../mixins/colorMixin'
import { mapGetters, mapActions } from 'vuex'
import { merge, isEqual } from 'lodash'

export default {
  name: 'element-form',
  // 接受父组件传参，element元素属性，sectionId:板块ID，elementId:元素ID
  props: ['element', 'sectionId', 'elementId'],
  mixins: [colorMixin],
  components: {
    ElementCommon,
    FormEditor
  },
  data () {
    return {
      // 初始加载主按钮组
      buttonGroup: 'main',
      // 是否处于编辑状态
      editing: false,
      hover: false,
      formElement: merge({}, this.element),
      resize: {},
      draggableFromChild: true,
      hasPopup: false
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace'
    }),
    fieldStyles () {
      return {
        backgroundColor: this.getColor(this.formElement.props.fieldColor),
        borderColor: this.getColor(this.formElement.props.borderColor),
        color: this.getColor(this.formElement.props.fontColor),
        boxShadow: this.formElement.props.boxShadow
      }
    },
    draggable () {
      return this.draggableFromChild
    },
    resizable () {
      return (this.workspace.activeElementId === this.elementId)
    }
  },
  methods: {
    ...mapActions([
      'modifyElement',
      'setActiveElementId'
    ]),
    edit () {
      this.editing = true
      this.buttonGroup = 'edit'
    },
    editDone () {
      this.editing = false
      this.buttonGroup = 'main'
      this.saveElement()
    },
    saveElement () {
      if (!isEqual(this.element, this.formElement)) {
        this.modifyElement([this.elementId, this.formElement, true])
      }
    },
    changeButtonGroup (val) {
      this.buttonGroup = val
    },
    changeDraggable (val) {
      this.draggableFromChild = val
    },
    popupChange (val) {
      this.hasPopup = val
    },
    imageChange (val) {
      this.formElement.button.imageObj = val
      this.setActiveElementId(this.elementId)
      this.$forceUpdate()
    }
  },
  watch: {
    'workspace.activeElementId': function (val) {
      if (this.hasPopup) return
      if (val !== this.elementId && this.editing) this.editDone()
    },
    'element': function (val) {
      this.formElement = merge({}, val)
    }
  }
}
</script>

<template>
  <element-common 
    :element="element" 
    :section-id="sectionId" 
    :element-id="elementId" 
    :button-group="buttonGroup" 
    :draggable="draggable" 
    :resize="resize" 
    :resizable="resizable" 
    @change-button-group="changeButtonGroup" 
    @change-draggable="changeDraggable" 
    @drag-start="editDone"
  >
    <div slot="content" @dblclick="edit">
      <div class="el-overlay"></div>

      <div v-for="(field, index) in formElement.fields" class="form-group">
        <template v-if="field.type === 'text'">
          <div v-if="!formElement.props.labelInside"><label :style="{color:getColor(formElement.props.labelColor)}">{{field.label}}</label></div>
          <input type="text" class="form-control form-field-input" :style="fieldStyles" :value="formElement.props.labelInside ? field.label : ''">
        </template>

        <template v-if="field.type === 'textarea'">
          <div v-if="!formElement.props.labelInside"><label :style="{color:getColor(formElement.props.labelColor)}">{{field.label}}</label></div>
          <textarea class="form-control form-field-input" :style="fieldStyles" rows="3">{{formElement.props.labelInside ? field.label : ''}}</textarea>
        </template>

        <template v-if="field.type === 'radio'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(formElement.props.labelColor)}">{{field.label}}</label></div>
          <div v-for="option in field.options" track-by="$index" :class="{'options-in-line':field.optionsInLine}">
            <label :style="{color:getColor(formElement.props.labelColor)}"><input type="radio"> {{option}}</label>
          </div>
        </template>

        <template v-if="field.type === 'checkbox'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(formElement.props.labelColor)}">{{field.label}}</label></div>
          <div v-for="option in field.options" track-by="$index" :class="{'options-in-line':field.optionsInLine}">
            <label :style="{color:getColor(formElement.props.labelColor)}"><input type="checkbox"> {{option}}</label>
          </div>
        </template>

        <template v-if="field.type === 'dropdown'">
          <select class="form-control form-field-input" :style="fieldStyles">
            <option value="">{{field.label}}</option>
          </select>
        </template>

        <template v-if="field.type === 'china-state'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(formElement.props.labelColor)}">{{field.label}}</label></div>
          <div>
            <select class="form-control form-field-input" style="float:left;margin-right:2%;width:32%" :style="fieldStyles">
              <option value="">省份</option>
            </select>
            <select class="form-control form-field-input" style="float:left;margin-right:2%;width:32%" :style="fieldStyles">
              <option value="">城市</option>
            </select>
            <select class="form-control form-field-input" style="float:left;width:32%" :style="fieldStyles">
              <option value="">区县</option>
            </select>
            <div style="clear:both;"></div>
          </div>
        </template>

      </div> <!-- End fields for -->

      <div class="form-button">
        <div v-if="formElement.button.imageObj" class="element-image-button"
          :style="{
            overflow: 'hidden',
            borderRadius: formElement.button.props.borderRadius,
            boxShadow: formElement.button.props.boxShadow,
            borderStyle: formElement.button.props.borderStyle,
            borderColor: getColor(formElement.button.props.borderColor)
          }">
          <img :src="formElement.button.imageObj.url" :style="{width: '100%', height: 'auto'}" @mousedown.prevent/>
        </div>
        <button v-else class="form-control element-button"
          :style="[
            {
              borderRadius: formElement.button.props.borderRadius,
              fontSize: formElement.button.props.fontSize,
              boxShadow: formElement.button.props.boxShadow,
              fontWeight: formElement.button.props.fontWeight,
              borderStyle: formElement.button.props.borderStyle,
              backgroundColor:hover ? getColor(formElement.button.props.hoverColor) : getColor(formElement.button.props.backgroundColor),
              borderColor: getColor(formElement.button.props.borderColor),
              color: getColor(formElement.button.props.color),
            }
          ]">
          {{formElement.button.text}}
        </button>
      </div>

    </div>
    
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click.stop="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
    </template>
    <form-editor 
      slot="sidebar"
      :show="editing" 
      v-model="formElement" 
      @edit-done="editDone" 
      @save="saveElement"
      @popup-change="popupChange"
      @image-change="imageChange"
    >
    </form-editor>
  </element-common>
</template>

<style>
.form-field-wrapper{
  margin:6px 0;
}

.form-field-input{
  font-size: 16px;
  height: 40px;
  line-height: 20px;
  padding: 4px 10px;
}

.form-field-input .caret{
  float:right;
  margin-top:12px;
  margin-right:2px;
}

.form-field-dropdown{
  float:left;
  width:auto;
}

.options-in-line{
  display: inline-block;
  margin-right:10px;
}

.shadow-inside{
  box-shadow: inset 0 1px 6px #ccc;
}
</style>