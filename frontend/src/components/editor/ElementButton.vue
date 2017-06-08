<script>
import LinkEditor from './LinkEditor'
import ButtonEditor from './ButtonEditor'
import elementMixin from 'mixins/elementMixin'
import colorMixin from 'mixins/colorMixin'
import elementTypes from '../../config/editorElementTypes'
import { merge, isEqual } from 'lodash'

export default {
  name: 'element-button',
  mixins: [colorMixin, elementMixin],
  components: {
    LinkEditor,
    ButtonEditor
  },
  data () {
    return {
      localElement: merge({}, elementTypes.button, this.element),
      linkObj: merge({}, this.element.link)
    }
  },
  computed: {
    buttonStyles () {
      const props = this.localElement.props
      return {
        borderRadius: props.borderRadius,
        border: this.elementBorder,
        boxShadow: this.elementShadow,
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
      if (!isEqual(this.element, this.localElement)) {
        this.modifyElement([this.elementId, this.localElement])
      }
    },
    editLink () {
      this.buttonGroup = 'link'
    },
    editLinkDone (changed, linkObj) {
      if (changed) {
        this.linkObj = merge({}, linkObj)
        const newPropsObj = { link: linkObj }
        this.modifyElement([this.elementId, newPropsObj])
      }
      this.buttonGroup = 'main'
    },
    imageOnload () {
      this.$refs.element.updateDimen()
    }
  },
  watch: {
    'element': function (val) {
      this.localElement = merge({}, elementTypes.button, val)
    }
  }
}
</script>

<template>
  <element-common
    :element="element"
    ref="element"
    :section-id="sectionId"
    :element-id="elementId"
    :button-group="buttonGroup"
    :draggable="draggable"
    :resize="resize"
    :resizable="resizable"
    :fixedEditable="true"
    @change-button-group="changeButtonGroup"
    @change-draggable="changeDraggable"
    @drag-start="editDone"
  >
    <div slot="content" :class="{'element-button-text': !localElement.image}"
      @dblclick="edit"
      ref="content"
      :style="buttonStyles">
      <img v-if="localElement.image" :src="localElement.image" :style="{width: 'auto', 'max-width':'100%', height:'auto'}" @mousedown.prevent @load="imageOnload">
      <span v-else>{{localElement.text}}</span>
    </div>

    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click.stop="edit">编辑</div>
      <tooltip class="btn btn-default" content="链接" @click.native="editLink">
        <div><span class="glyphicon glyphicon-link"></span></div>
      </tooltip>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
      <link-editor v-if="buttonGroup === 'link'" :link-editing="buttonGroup === 'link'" :link-obj="linkObj" @link-edit-done="editLinkDone"></link-editor>
    </template>
    <button-editor slot="sidebar" :show="editing" v-model="localElement"
      @edit-done="editDone"
    >
    </button-editor>
  </element-common>
</template>

<style scoped>

.element-button-text {
  text-align: center;
  padding: 6px;
}

</style>
