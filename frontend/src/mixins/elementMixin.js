import ElementCommon from '../components/editor/ElementCommon'
import { merge } from 'lodash'
import { mapGetters, mapActions } from 'vuex'

export default {
  // 接受父组件传参，element元素属性，sectionId:板块ID，elementId:元素ID
  props: ['element', 'sectionId', 'elementId'],
  components: {
    ElementCommon
  },
  data () {
    return {
      // 初始加载主按钮组
      buttonGroup: 'main',
      // 是否处于编辑状态
      editing: false,
      // 组件实例化时将传入的element复制到本地，以避免直接修改store中的状态
      localElement: merge({}, this.element),
      resize: {},
      draggableFromChild: true
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace'
    }),
    draggable () {
      return this.draggableFromChild
    },
    resizable () {
      return (!this.editing && this.workspace.activeElementId === this.elementId)
    },
    elementBorder () {
      const borderObj = this.localElement.style.border
      if (borderObj) {
        return borderObj.width + ' ' + borderObj.style + ' ' + this.getColor(borderObj.color)
      } else {
        return ''
      }
    },
    elementBackground () {
      if (this.localElement.style.background) {
        return {
          backgroundColor: this.getColor(this.localElement.style.background.color),
          backgroundImage: 'url(' + this.localElement.style.background.image + ')',
          backgroundRepeat: this.localElement.style.background.repeat,
          backgroundPosition: this.localElement.style.background.position,
          backgroundSize: this.localElement.style.background.size ? 'cover' : 'auto'
        }
      } else {
        return {}
      }
    },
    elementShadow () {
      const shadowObj = this.localElement.style.shadow
      if (shadowObj) {
        return shadowObj.x + 'px ' + shadowObj.y + 'px ' + shadowObj.blur + 'px ' + shadowObj.spread + 'px ' + this.getColor(shadowObj.color)
      }
    }
  },
  methods: {
    ...mapActions([
      'modifyElement'
    ]),
    editDone () {

    },
    changeButtonGroup (val) {
      this.buttonGroup = val
    },
    changeDraggable (val) {
      this.draggableFromChild = val
    }
  },
  watch: {
    'workspace.activeElementId': function (val) {
      if (val !== this.elementId && this.editing) this.editDone()
    },
    'element': function (val) {
      this.localElement = merge({}, val)
    }
  }
}
