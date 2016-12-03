<script>
import ShapeEditor from './ShapeEditor'
import colorMixin from '../../mixins/colorMixin'
import elementMixin from '../../mixins/elementMixin'
import { isEqual } from 'lodash'

export default {
  name: 'element-shape',
  mixins: [colorMixin, elementMixin],
  components: {
    ShapeEditor
  },
  data () {
    return {
      resize: {
        handles: this.element.subType === 'line' ? 'e' : (this.element.subType === 'vline' ? 's' : 's,e'),
        aspectRatio: this.element.subType === 'circle'
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
      if (!isEqual(this.element, this.localElement)) {
        this.modifyElement([this.elementId, this.localElement])
      }
    }
  },
  computed: {
    elementCommonStyle () {
      if (this.localElement.subType === 'line') {
        return {
          height: 20 + parseInt(this.localElement.style.border.width) + 'px',
          marginTop: '-10px'
        }
      } else if (this.localElement.subType === 'vline') {
        return {
          width: 20 + parseInt(this.localElement.style.border.width) + 'px',
          marginRight: '-10px'
        }
      } else {
        return {}
      }
    },
    contentStyle () {
      if (this.localElement.subType === 'line') {
        return {
          height: 10 + parseInt(this.localElement.style.border.width) + 'px',
          width: '100%',
          borderBottom: this.elementBorder
        }
      } else if (this.localElement.subType === 'vline') {
        return {
          width: 10 + parseInt(this.localElement.style.border.width) + 'px',
          height: '100%',
          borderRight: this.elementBorder
        }
      } else {
        return {}
      }
    },
    isLine () {
      return (this.localElement.subType === 'line' || this.localElement.subType === 'vline')
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
    :fixed-editable="true"
    @change-button-group="changeButtonGroup" 
    @change-draggable="changeDraggable" 
    @drag-start="editDone"
    :style="elementCommonStyle"
  >
    <div slot="content" class="element-shape" @dblclick="edit" 
      :style="[ elementBackground,
        {
          border: isLine ? '' : elementBorder,
          borderRadius: localElement.style.borderRadius,
          opacity: localElement.style.opacity / 100
        }
      ]">
      <div v-if="isLine" :style="contentStyle"></div>
    </div>
    
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click.stop="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
    </template>
    <shape-editor 
      slot="sidebar"
      :show="editing" 
      v-model="localElement"
      @edit-done="editDone"
    >
    </shape-editor>
  </element-common>
</template>

<style>
.element-shape {
  height: 100%;
  transition: all .3s ease;
}

</style>