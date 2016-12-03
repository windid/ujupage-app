<script>
  import ElementText from './ElementText'
  import ElementButton from './ElementButton'
  import ElementImage from './ElementImage'
  import ElementShape from './ElementShape'

  import { mapGetters } from 'vuex'

  export default {
    components: {
      ElementText,
      ElementButton,
      ElementImage,
      ElementShape
    },
    computed: {
      ...mapGetters({
        workspace: 'editorWorkspace',
        fixedElements: 'editorFixedElements',
        elements: 'editorElements'
      })
    }
  }
</script>

<template>
  <transition-group name="fade" tag="div" id="fixed-container" :style="{width: (workspace.width) + 'px', marginLeft:(-workspace.width/2) +'px'}">
    <component v-for="elementId in fixedElements" :is="'element-' + elements[elementId].type" :element="elements[elementId]" section-id="fixed" :element-id="elementId" :key="elementId"></component>
  </transition-group>
</template>

<style scoped>
  #fixed-container {
    position: fixed;
    pointer-events: none;
    z-index: 100;
    top: 50px;
    height: calc(100% - 50px);
    left: 50%;
  }
</style>