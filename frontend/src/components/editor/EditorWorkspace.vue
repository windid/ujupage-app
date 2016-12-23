<script>
import PageSection from './PageSection'
import FixedContainer from './FixedContainer'
import SectionEditor from './SectionEditor'
import ImageLibrary from './ImageLibrary'
import { mapGetters } from 'vuex'

export default {
  components: {
    PageSection,
    FixedContainer,
    SectionEditor,
    ImageLibrary
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace',
      height: 'editorHeight',
      sections: 'editorSections'
    })
  }
}
</script>

<template>
  <div class="workspace">
    <div id="content-area" :style="{height: height + 'px', width: (workspace.width) + 'px', marginLeft:(-workspace.width/2) +'px'}">
      <div id="alignment-lines"></div>
    </div>
    <fixed-container></fixed-container>
    <div class="section-wrapper">
      <page-section 
        v-for="(section, sectionId) in sections" 
        :section-id="sectionId"
        :section="section"
      >
      </page-section>
    </div>
    <section-editor></section-editor>
    <image-library></image-library>
  </div>
</template>

<style scoped>
.workspace {
  position: relative;
  /* 禁止文本选择 */
  user-select: none;
  /*margin-bottom: 30px;*/
  background: #fff;
}

#content-area{
  position: absolute;
  left: 50%;
}

.section-wrapper {
  position: relative;
  z-index: 1;
}

#alignment-lines {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

<style> 
/* 对齐线 */
.align-line {
  position: absolute;
  z-index: 9999999;
}
.align-line-horizontal {
  height: 1px;
  border-top: 1px solid red;
}
.align-line-vertical {
  width: 1px;
  border-left: 1px solid red;
}
</style>