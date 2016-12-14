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
      },
      quickSelector: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        expanded: this.expand
      }
    }
  }
</script>

<template>
  <div class="sidebar-part">
    <div class="part-header">
      <div @click="expanded = !expanded" class="part-title">
        <span class="caret" :class="{'rotate' : !expanded}"></span> {{title}}
      </div>
      <div v-if="quickSelector" class="quick-selector">
        <slot name="quick-selector"></slot>
        <div class="dropdown-hint"><span class="glyphicon glyphicon-chevron-down"></span></div>
      </div>
      <div style="clear: both;"></div>
    </div>
    <div class="slide" :style="{'max-height': expanded ? '300px' : '0'}">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
  .slide {
    transition: max-height 0.4s ease;
    overflow: hidden;
  }
  .sidebar-part {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
  }

  .part-header {
    margin: 10px 0;
    line-height: 28px;
  }

  .part-title {
    float: left;
    cursor: pointer;
  }

  .quick-selector {
    position: relative;
    float: right;
    height: 28px;
    width: 90px;
  }

  .quick-selector:hover > .dropdown-hint {
    display: block;
  }

  .dropdown-hint {
    position: absolute;
    display: none;
    pointer-events: none;
    right: 5px;
    top: 5px;
    text-align: center;
    color: #fff;
    background: #999;
    opacity: .6;
    border-radius: 50%;
    height: 18px;
    width: 18px;
  }

  .dropdown-hint span {
    font-size: 11px;
    top: -3px;
  }

  .caret {
    transition: all .3s ease;
  }

  .rotate {
    transform: rotate(-90deg)
  }

</style>