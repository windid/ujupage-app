<script>
import ColorSchemes from './ColorSchemes'
import EditorSettings from './EditorSettings'
import AbTest from './AbTest'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ColorSchemes,
    EditorSettings,
    AbTest
  },
  data () {
    return {
      showSettings: false
    }
  },
  computed: mapGetters({
    workspace: 'editorWorkspace',
    undoButton: 'undoButton',
    redoButton: 'redoButton'
  }),
  methods: {
    ...mapActions({
      undo: 'undo',
      redo: 'redo',
      switchVersion: 'switchVersion',
      switchVariation: 'switchVariation'
    })
  }
}
</script>


<template>
  <div class="editor-header">
    <div class="home">
      <router-link to="/" class="home-link">
        <span class="glyphicon glyphicon-home"></span>
      </router-link>
    </div>
    <ab-test></ab-test>
    <div class="btn-group">
      <div class="btn btn-default" :class="{active: workspace.version === 'pc'}" @click="switchVersion('pc')">
        桌面版 <span class="glyphicon glyphicon-blackboard"></span>
      </div>
      <div class="btn btn-default" :class="{active: workspace.version === 'mobile'}" @click="switchVersion('mobile')">
        移动版 <span class="glyphicon glyphicon-phone"></span>
      </div>
    </div>

    <div class="btn-toolbar fr">
      <div class="btn-group">
        <div class="btn btn-default">
          <span class="glyphicon glyphicon-question-sign"></span>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn btn-default" :class="{disabled: !undoButton}" @click="undo">
          <span class="glyphicon glyphicon-share-alt flipx"></span>
        </div>
        <div class="btn btn-default" :class="{disabled: !redoButton}" @click="redo">
          <span class="glyphicon glyphicon-share-alt"></span>
        </div>
      </div>
      
      <color-schemes></color-schemes>

      <div class="btn-group">
        <div class="btn btn-default" @click="showSettings = true">设置 <span class="glyphicon glyphicon-cog"></span></div>
        <div class="btn btn-default">保存 <span class="glyphicon glyphicon-floppy-disk"></span></div>
        <div class="btn btn-default">预览 <span class="glyphicon glyphicon-eye-open"></span></div>
        <div class="btn btn-primary">发布 <span class="glyphicon glyphicon-send"></span></div>
      </div>
    </div>
    <transition name="fade">
      <editor-settings v-if="showSettings" :show="showSettings" @close="showSettings=false" ></editor-settings>
    </transition>
  </div>
</template>

<style>
.flipx {
  -moz-transform:scaleX(-1);
  -webkit-transform:scaleX(-1);
  -o-transform:scaleX(-1);
  transform:scaleX(-1);
  /*IE*/
  filter:FlipH;
}

.editor-header{
  position: fixed;
  top: 0;
  height:50px;
  width:100%;
  z-index: 1000001;
  background: #fff;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 0 8px #ddd;
}

.home {
  float: left;
  width: 50px;
  margin-right:12px;
  background: #f9f9f9;
  border-right:1px solid #ddd;
}

.home:hover {
  background: #f5f5f5;
}

.home-link {
  display: block;
  font-size:20px;
  text-align: center;
  line-height: 48px;
}

.editor-header .btn-group{
  margin:7px;
}


</style>