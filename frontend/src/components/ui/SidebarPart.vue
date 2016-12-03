<script>
  export default {
    name: 'SidebarPart',
    props: {
      title: {
        type: String,
        required: true
      },
      expand: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        expanded: this.expand
      }
    },
    methods: {
      toggleExpanded () {
        console.log(this.expanded)
        this.expanded = !this.expanded
      }
    }
  }

</script>

<template>
  <div class="sidebar-part container-fluid">
    <h5 @click="expanded = !expanded"><span class="caret" :class="{'rotate' : !expanded}"></span> {{title}}</h5>
    <slot name="content" v-if="expanded"></slot>
  </div>
</template>

<style scoped>

.sidebar-part {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin-right: auto;
  margin-left: auto;
}

h5 {
  cursor: pointer;
}

.caret {
  transition: all .3s ease;
}

.rotate {
  transform: rotate(-90deg)
}

</style>