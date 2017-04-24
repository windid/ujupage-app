<script>
import FormEditor from './FormEditor'
import colorMixin from 'mixins/colorMixin'
import elementMixin from 'mixins/elementMixin'
// import elementTypes from '../../config/editorElementTypes'
import { merge, isEqual } from 'lodash'

export default {
  mixins: [colorMixin, elementMixin],
  components: {
    FormEditor
  },
  data () {
    return {
      localElement: merge({}, this.element)
    }
  },
  computed: {
    fieldStyles () {
      return {
        backgroundColor: this.getColor(this.localElement.props.fieldColor),
        borderColor: this.getColor(this.localElement.props.borderColor),
        color: this.getColor(this.localElement.props.fontColor),
        boxShadow: this.localElement.props.boxShadow
      }
    },
    buttonStyles () {
      const props = this.localElement.button.props
      return {
        borderRadius: props.borderRadius,
        border: this.parseBorderStyle(this.localElement.button.style.border),
        boxShadow: this.parseShadowStyle(this.localElement.button.style.shadow),
        overflow: 'hidden',
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        backgroundColor: this.getColor(props.backgroundColor),
        color: this.getColor(props.color)
      }
    }
  },
  methods: {
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
      if (!isEqual(this.element, this.localElement)) {
        this.modifyElement([this.elementId, this.localElement, true])
      }
    }
  },
  watch: {
    'element': function (val) {
      this.localElement = merge({}, val)
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

      <div v-for="(field, index) in localElement.fields" class="form-group">
        <template v-if="field.type === 'text'">
          <label :class="{'label-inside': localElement.props.labelInside}" :style="{color:getColor(localElement.props.labelColor)}">{{field.label}}</label>
          <input type="text" class="form-control form-field-input" :style="fieldStyles">
        </template>

        <template v-if="field.type === 'textarea'">
          <label :class="{'label-inside': localElement.props.labelInside}" :style="{color:getColor(localElement.props.labelColor)}">{{field.label}}</label>
          <textarea class="form-control" :style="fieldStyles" rows="3"></textarea>
        </template>

        <template v-if="field.type === 'radio'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(localElement.props.labelColor)}">{{field.label}}</label></div>
          <div v-for="option in field.options" track-by="$index" :class="{'options-in-line':field.optionsInLine}">
            <label :style="{color:getColor(localElement.props.labelColor)}"><input type="radio"> {{option}}</label>
          </div>
        </template>

        <template v-if="field.type === 'checkbox'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(localElement.props.labelColor)}">{{field.label}}</label></div>
          <div v-for="option in field.options" track-by="$index" :class="{'options-in-line':field.optionsInLine}">
            <label :style="{color:getColor(localElement.props.labelColor)}"><input type="checkbox"> {{option}}</label>
          </div>
        </template>

        <template v-if="field.type === 'dropdown'">
          <select class="form-control form-field-input" :style="fieldStyles">
            <option value="">{{field.label}}</option>
          </select>
        </template>

        <template v-if="field.type === 'china-state'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(localElement.props.labelColor)}">{{field.label}}</label></div>
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
        <div slot="content" :class="{'element-button-text': !localElement.button.image}"
          :style="buttonStyles">
          <img v-if="localElement.button.image" :src="localElement.button.image" :style="{width: '100%', height: 'auto'}" @mousedown.prevent>
          <span v-else>{{localElement.button.text}}</span>
        </div>
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
      v-model="localElement" 
      @edit-done="editDone" 
      @save="saveElement"
    >
    </form-editor>
  </element-common>
</template>

<style scoped>

.form-group {
  position: relative;
}
.label-inside {
  position: absolute;
  top: 9px;
  left: 11px;
}
label {
  font-size: 16px;
  font-weight: normal;
}

.form-field-input {
  font-size: 16px;
  height: 40px;
}

.form-field-input .caret{
  float: right;
  margin-top: 12px;
  margin-right: 2px;
}

.form-field-dropdown{
  float: left;
  width: auto;
}

.options-in-line{
  display: inline-block;
  margin-right: 10px;
}

.shadow-inside{
  box-shadow: inset 0 1px 6px #ccc;
}

.element-button-text {
  text-align: center;
  padding: 6px;
}
</style>