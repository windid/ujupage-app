<script>
import ColorPicker from './ColorPicker'
import IconPicker from './IconPicker'
import elementMixin from '../../mixins/elementMixin'
import colorMixin from '../../mixins/colorMixin'

export default {
  mixins: [colorMixin, elementMixin],
  components: {
    ColorPicker,
    IconPicker
  },
  data () {
    return {
      resize: {
        handles: 's,e',
        aspectRatio: true
      },
      editing: false
    }
  },
  computed: {

  },
  methods: {
    edit () {
      this.buttonGroup = 'edit'
      this.editing = true
    },
    editDone () {
      this.buttonGroup = 'main'
      this.editing = false
    },
    changeColor (val) {
      console.log(val)
      this.modifyElement([this.elementId, { data: { color: val }}])
    },
    changeIcon (val) {
      this.modifyElement([this.elementId, { data: { icon: val }}])
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
    <span slot="content" class="glyphicon element-icon" 
      @dblclick="edit"
      :class="'glyphicon-' + localElement.data.icon"
      :style="{
        fontSize: localElement.style[workspace.version].width,
        color: getColor(localElement.data.color)
      }">
    </span>

    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="更换图标" @click.stop="edit">更换图标</div>
      <color-picker v-model="localElement.data.color" @input="changeColor">
        <div class="btn btn-default dropdown-toggle" data-toggle="dropdown">
          颜色
          <span class="caret"></span>
        </div>
      </color-picker>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group">
        <div class="btn btn-success" @click="editDone"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
    </template>
    <icon-picker
      slot="sidebar"
      :show="editing"
      v-model="localElement.data.icon"
      @edit-done="editDone"
      @input="changeIcon"
      >
    </icon-picker>
  </element-common>
</template>

<style scoped>
.element-icon {
  top: 0;
}
</style>
