<script>
import ColorSchemes from '../ui/ColorSchemes'
import EditorSettings from './EditorSettings'
import AbTest from './AbTest'
import AbSplit from '../common/AbSplit'
import { Tooltip } from 'element-ui'
import { mapGetters, mapActions } from 'vuex'
import { urlKeyRE } from '../../utils'

export default {
  components: {
    ColorSchemes,
    EditorSettings,
    AbTest,
    AbSplit,
    Tooltip
  },
  data () {
    return {
      showSettings: false,
      showSplit: false,
      osWindows: window.navigator.userAgent.indexOf('Windows') >= 0
    }
  },
  computed: mapGetters({
    workspace: 'editorWorkspace',
    undoButton: 'undoButton',
    redoButton: 'redoButton',
    saveStatus: 'saveStatus',
    page: 'editingPage',
    colorSet: 'editorColorSet'
  }),
  methods: {
    ...mapActions({
      undo: 'undo',
      redo: 'redo',
      switchVersion: 'switchVersion',
      saveVariation: 'saveVariation',
      confirm: 'confirm',
      getInput: 'getInput',
      warning: 'warning',
      setURL: 'setURL',
      publishPage: 'publishPage',
      traficSplit: 'traficSplit',
      setColorSet: 'setColorSet'
    }),
    publish () {
      this.saveNotice(() => {
        if (!this.page.url) {
          this.getInput({
            header: '为您的页面选定一个URL地址',
            inputAddon: 'http://www.juyepage.com/',
            placeholder: '自定义url',
            hint: '可由数字、英文字母组成，至少3位以上。',
            onConfirm: (val) => {
              if (!urlKeyRE.test(val)) {
                return '自定义url地址不能少于3位，且只能包含数字和字母'
              }
              this.setURL([val, () => {
                this.doPublish()
              }, (error) => {
                this.warning({
                  header: '发布失败',
                  content: error,
                  onConfirm: () => {
                    this.publish()
                  }
                })
              }])
            }
          })
        } else {
          this.doPublish()
        }
      })
    },
    doPublish () {
      this.publishPage(() => {
        this.confirm({
          header: '页面发布成功！',
          content: '点击确定将返回主面板',
          onConfirm: () => {
            this.$router.push('/')
          }
        })
      })
    },
    saveNotice (cb) {
      if (!this.saveStatus) {
        this.confirm({
          header: '是否先保存？',
          content: '您修改了页面，建议保存之后再发布。',
          onConfirm: () => {
            this.saveVariation(cb)
          },
          onCancel: () => {
            cb()
          }
        })
      } else {
        cb()
      }
    },
    updateTraficSplit (traficWeights) {
      this.traficSplit(traficWeights)
    },
    onKey (event) {
      if (event.ctrlKey || event.metaKey) {
        let keyCaptured = false
        const code = event.which || event.keyCode
        if (code === 83) {
          // ctrl + s 保存
          keyCaptured = true
          this.saveVariation()
        } else if (code === 90) {
          if (event.shiftKey && !this.osWindows) {
            // mac: shift + ctrl + z 前进
            keyCaptured = true
            this.redo()
          } else {
            // ctrl + z 后退
            keyCaptured = true
            this.undo()
          }
        } else if (code === 82 && this.osWindows) {
          // windows: ctrl + r 前进
          keyCaptured = true
          this.redo()
        }
        if (keyCaptured) {
          event.stopPropagation()
          event.preventDefault()
        }
      }
    }
  },
  mounted () {
    document.addEventListener('keydown', this.onKey)
  },
  destroy () {
    document.removeEventListener('keydown', this.onKey)
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

    <ab-test @absplit="showSplit = true"></ab-test>

    <div class="btn-group">
      <div class="btn btn-default" :class="{ active: workspace.version === 'pc' }" @click="switchVersion('pc')">
        桌面版 <span class="glyphicon glyphicon-blackboard"></span>
      </div>
      <div class="btn btn-default" :class="{ active: workspace.version === 'mobile' }" @click="switchVersion('mobile')">
        移动版 <span class="glyphicon glyphicon-phone"></span>
      </div>
    </div>

    <div class="btn-toolbar fr">
      <div class="btn-group">
        <tooltip class="btn btn-default" content="帮助">
          <span class="glyphicon glyphicon-question-sign"></span>
        </tooltip>
      </div>
      <div class="btn-group">
        <tooltip content="撤销" class="btn btn-default" :class="{ disabled: !undoButton }" @click.native="undo">
          <span class="glyphicon glyphicon-share-alt flipx"></span>
        </tooltip>
        <tooltip content="重做" class="btn btn-default" :class="{ disabled: !redoButton }" @click.native="redo">
          <span class="glyphicon glyphicon-share-alt"></span>
        </tooltip>
      </div>
      
      <color-schemes :color-set="colorSet" @update-colors="setColorSet"></color-schemes>

      <div class="btn-group">
        <div class="btn btn-default" @click="showSettings = true">设置 <span class="glyphicon glyphicon-cog"></span></div>
        <div class="btn btn-default" :class="{ disabled: saveStatus }" @click="saveVariation()">保存 <span class="glyphicon glyphicon-floppy-disk"></span></div>
        <router-link class="btn btn-default" :to="'/preview/' + page.id + '/' + workspace.activeVariation.id">预览 <span class="glyphicon glyphicon-eye-open"></span></router-link>
        <div class="btn btn-primary" @click="publish">发布 <span class="glyphicon glyphicon-send"></span></div>
      </div>
    </div>
    <editor-settings v-if="showSettings" :show="showSettings" @close="showSettings = false" ></editor-settings>
    <ab-split v-if="showSplit" :page-id="page.id" :variations="page.variations" :show="showSplit" @update-split="updateTraficSplit" @close="showSplit = false"></ab-split>
  </div>
</template>

<style scoped>
.flipx {
  transform: scaleX(-1);
  /*IE*/
  filter: FlipH;
}

.editor-header{
  position: fixed;
  top: 0;
  height:50px;
  width:100%;
  z-index: 1002;
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
