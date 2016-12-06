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
      const border = this.localElement.style.border
      if (border) {
        return this.parseBorderStyle(border)
      } else {
        return ''
      }
    },
    elementBackground () {
      const background = this.localElement.style.background
      if (background) {
        return this.parseBackgroundStyle(background)
      } else {
        return {}
      }
    },
    elementShadow () {
      const shadow = this.localElement.style.shadow
      if (shadow) {
        return this.parseShadowStyle(shadow)
      }
    }
  },
  methods: {
    ...mapActions([
      'modifyElement'
    ]),
    parseBorderStyle (border) {
      return border.width + ' ' + border.style + ' ' + this.getColor(border.color)
    },
    parseShadowStyle (shadow) {
      return shadow.x + 'px ' + shadow.y + 'px ' + shadow.blur + 'px ' + shadow.spread + 'px ' + this.getColor(shadow.color)
    },
    parseBackgroundStyle (background) {
      return {
        backgroundColor: this.getColor(background.color),
        backgroundImage: 'url(' + background.image + ')',
        backgroundRepeat: background.repeat,
        backgroundPosition: background.position,
        backgroundSize: background.size
      }
    },
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
