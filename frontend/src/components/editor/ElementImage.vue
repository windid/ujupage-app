<script>
import { mapGetters, mapActions } from 'vuex'
import ElementCommon from './ElementCommon'
import LinkEditor from './LinkEditor'
import { merge } from 'lodash'

export default {
  // 接受父组件传参，element元素属性，sectionId:板块ID，elementId:元素ID
  props: ['element', 'sectionId', 'elementId'],
  components: {
    ElementCommon,
    LinkEditor
  },
  data () {
    return {
      buttonGroup: 'main',
      imageObj: {},
      linkObj: merge({}, this.element.link),
      resize: {
        // aspectRatio: true
      }
    }
  },
  methods: {
    ...mapActions([
      'modifyElement',
      'removeElement',
      'getImage'
    ]),
    edit () {
      this.getImage((image) => {
        this.imageObj = image
      })
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
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace'
    }),
    draggable () {
      return this.buttonGroup !== 'link' && this.draggableFromChild
    },
    resizable () {
      return (this.buttonGroup !== 'link' && this.workspace.activeElementId === this.elementId)
    }
  },
  watch: {
    'imageObj': function (newImage) {
      const newPropsObj = {}
      newPropsObj.src = newImage.url

      if (!this.element.style.pc.width) {
        const pcWidth = (newImage.width > 960) ? 960 : newImage.width
        const mobileWidth = (newImage.width > 360) ? 360 : newImage.width
        const pcLeft = (960 - pcWidth) / 2
        const mobileLeft = (360 - mobileWidth) / 2

        newPropsObj.style = {
          'pc': {
            width: pcWidth + 'px',
            left: pcLeft + 'px'
          },
          'mobile': {
            width: mobileWidth + 'px',
            left: mobileLeft + 'px'
          }
        }
      }
      this.modifyElement([this.elementId, newPropsObj])
    }
  }
}
</script>

<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable" :resize="resize" :resizable.sync="resizable">
    <div slot="content" @dblclick="edit">
      <img v-bind:src="element.src" :style="{width:'100%',height:'auto'}">
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="更换图片" @click.stop="edit">更换图片</div>
      <div class="btn btn-default" title="链接" @click="buttonGroup='link'"><span class="glyphicon glyphicon-link"></span></div>
    </template>
    <template slot="button-groups">
      <link-editor v-show="buttonGroup === 'link'" :link-editing="buttonGroup === 'link'" :link-obj="linkObj"></link-editor>
    </template>
  </element-common>
</template>
