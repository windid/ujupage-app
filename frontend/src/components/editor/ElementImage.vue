<script>
import { mapActions } from 'vuex'
import LinkEditor from './LinkEditor'
import elementMixin from '../../mixins/elementMixin'
import { merge } from 'lodash'

export default {
  mixins: [elementMixin],
  components: {
    LinkEditor
  },
  data () {
    return {
      imageObj: {},
      linkObj: merge({}, this.element.link),
      resize: {
        // aspectRatio: true
      }
    }
  },
  methods: {
    ...mapActions([
      'removeElement',
      'getImage'
    ]),
    edit () {
      this.getImage([(image) => {
        this.imageObj = image
      }])
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
      this.$refs.element.updateAlignmentInfo()
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
  },
  mounted () {
    if (!this.element.src) {
      this.getImage([(image) => {
        this.imageObj = image
      }, () => {
        this.removeElement([this.elementId, false])
      }])
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
    :button-group.sync="buttonGroup" 
    :draggable="draggable" 
    :resize="resize" 
    :resizable="resizable" 
    :fixedEditable="true"
    @change-button-group="changeButtonGroup" 
    @change-draggable="changeDraggable"
  >
    <div slot="content" @dblclick="edit" @mousedown.prevent>
      <img v-bind:src="element.src" :style="{width:'100%',height:'auto'}" @mousedown.prevent @load="imageOnload">
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="更换图片" @click.stop="edit">更换图片</div>
      <tooltip class="btn btn-default" content="链接" @click.native="editLink"><span class="glyphicon glyphicon-link"></span></tooltip>
    </template>
    <template slot="button-groups">
      <link-editor v-if="buttonGroup === 'link'" :link-editing="buttonGroup === 'link'" :link-obj="linkObj" @link-edit-done="editLinkDone"></link-editor>
    </template>
  </element-common>
</template>
