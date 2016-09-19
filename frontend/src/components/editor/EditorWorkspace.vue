<script>
import PageSection from './PageSection'
import SectionEditor from './SectionEditor'
import ElementEditor from './ElementEditor'
import ImageLibrary from './ImageLibrary'
import { mapGetters } from 'vuex'

export default {
  components: {
    PageSection,
    SectionEditor,
    ElementEditor,
    ImageLibrary
  },
  computed: mapGetters({
    workspace: 'editorWorkspace',
    height: 'editorHeight',
    sections: 'editorSections'
  })
}
</script>

<template>
  <div class="workspace">
    <div id="content-area" :style="{height: height + 'px', width: (workspace.width) + 'px', marginLeft:(-workspace.width/2) +'px'}"></div>
    <page-section 
      v-for="(section, sectionId) in sections" 
      :section-id="sectionId"
      :section="section"
    >
    </page-section>
    <section-editor></section-editor>
    <element-editor></element-editor>
    <image-library></image-library>
  </div>
</template>

<style>
.workspace{
  position:relative;
}

#content-area{
  position:absolute;
  left:50%;
}

/* 禁止文本选择 */
body{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

</style>