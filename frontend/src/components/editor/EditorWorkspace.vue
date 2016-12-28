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
      sections: 'editorSections',
      alignLines: 'getAlignLines'
    })
  }
}
</script>

<template>
  <div class="workspace">
    <div id="content-area" :style="{height: height + 'px', width: (workspace.width) + 'px', marginLeft:(-workspace.width/2) +'px'}">
      <div id="alignment-lines">
        <div class="align-line" v-for="line in alignLines"
        :class="line.vertical ? 'align-line-vertical' : 'align-line-horizontal'"
        :style="{
          left: (line.vertical ? line.vAxis - 1 : line.min) + 'px',
          top: (line.vertical ? line.min : line.vAxis - 1) + 'px',
          [line.vertical ? 'height' : 'width']: line.length + 'px'
        }">
          <div style='position: relative; width: 100%; height: 100%;'>
            <div class="dot" v-for="dot in line.dots"
            :style="{
              position: 'absolute',
              [line.dotSide.main]: (dot - line.min - 2) + 'px',
              [line.dotSide.sub]: '-2px',
              width: '4px',
              height: '4px',
              background: 'red'
            }"></div>
          </div>
        </div>
      </div>
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