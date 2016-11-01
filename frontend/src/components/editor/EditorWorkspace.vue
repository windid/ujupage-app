<script>
import PageSection from './PageSection'
import SectionEditor from './SectionEditor'
import ImageLibrary from './ImageLibrary'
import { mapGetters } from 'vuex'

export default {
  components: {
    PageSection,
    SectionEditor,
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
    <image-library></image-library>
  </div>
</template>

<style scoped>
.workspace{
  position:relative;
  /* 禁止文本选择 */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-bottom: 30px;
}

#content-area{
  position:absolute;
  left:50%;
}

</style>