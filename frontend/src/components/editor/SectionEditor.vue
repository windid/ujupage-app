<script>
import Sidebar from '../ui/Sidebar'
import { mapGetters, mapActions } from 'vuex'
import colorMixin from '../../mixins/colorMixin'
import ColorPicker from './ColorPicker'
import { merge, isEqual } from 'lodash'

export default {
  components: {
    Sidebar,
    ColorPicker
  },
  mixins: [colorMixin],
  data () {
    return {
      style: {},
      imageObj: {},
      bgRepeatTypes: [
        '正常',
        '平铺',
        '水平平铺',
        '垂直平铺',
        '拉伸'
      ],
      defaultStyle: {
        'pc': {
          'background-color': '',
          'border-color': '',
          'border-width': 0
        },
        'mobile': {
          'background-color': '',
          'border-color': '',
          'border-width': 0
        },
        'bg': {
          'repeat': 0,
          'position': 5,
          'src': null,
          'attachment': false,
          'stretch': true
        },
        'mask': {
          'color': 0,
          'opacity': 0
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace',
      sections: 'editorSections'
    }),
    show () {
      return this.workspace.activeSectionId !== null
    },
    borderWidth: {
      get () {
        return parseInt(this.style[this.workspace.version]['border-width'])
      },
      set (val) {
        this.style[this.workspace.version]['border-width'] = val + 'px 0px'
      }
    },
    styleFromStore () {
      const sectionId = this.workspace.activeSectionId
      return sectionId !== null ? this.sections[sectionId]['style'] : null
    }
  },
  methods: {
    ...mapActions([
      'setActiveSectionId',
      'modifySection',
      'getImage'
    ]),
    selectImage () {
      this.getImage([(image) => {
        this.imageObj.src = image.url
      }])
    },
    removeImage () {
      this.imageObj.src = null
    }
  },
  watch: {
    'workspace.activeSectionId': function (sectionId) {
      if (sectionId !== null) {
        this.style = merge({}, this.defaultStyle, this.sections[sectionId]['style'])
      } else {
        this.style = {}
      }
    },
    'style': {
      handler: function (newStyle, oldStyle) {
        if (oldStyle.pc && newStyle.pc) {
          this.modifySection([this.workspace.activeSectionId, newStyle])
        }
        if (newStyle.bg) {
          this.imageObj = newStyle.bg
        }
      },
      deep: true
    },
    'styleFromStore': function (newStyle, oldStyle) {
      if (!isEqual(newStyle, this.style)) {
        if (newStyle !== null) {
          this.style = merge({}, this.style, newStyle)
        }
      }
    },
    'imageObj': function (newImage) {
      this.style.bg.src = newImage.src
      this.modifySection([this.workspace.activeSectionId, this.style])
    }
  }
}
</script>

<template>
  <sidebar v-if="show" :show="show" @close="setActiveSectionId(null)">
    <div slot="header">
      <div class="btn btn-success" @click="setActiveSectionId(null)">完成</div>
      <!-- <tooltip placement="left" content="同时修改桌面版和移动版">
        <h5 class="fr"><label><input type="checkbox"> 同步</label></h5>
      </tooltip> -->
    </div>
    <div slot="body">
      <div class="sidebar-block">
        <color-picker v-model="style[workspace.version]['background-color']"></color-picker> &nbsp; 背景颜色
      </div>
      <div class="sidebar-block">
        <div><color-picker v-model="style[workspace.version]['border-color']"></color-picker> &nbsp; 边框颜色</div>
        <div class="sidebar-block-inside"><input type="text" class="border-width-input" v-model.lazy.number="borderWidth"> &nbsp; 边框尺寸</div>
      </div>
      <div class="background-edit">
        <h3>图片背景</h3>
        <div class="bg-image-edit">
          <div @click.stop="selectImage" class="image-selector">
            <div class="bg-image-thumbnail-wrapper" v-if="imageObj && imageObj.src">
              <img :src="imageObj.src" class="bg-image-thumbnail" />
              <div class="bg-image-thumbnail-action">
                <div @click.stop="selectImage">更换</div>
                <div @click.stop="removeImage">删除</div>
              </div>
            </div>
            <div v-else class="bg-image-placeholder">背景图片</div>
          </div>
        </div>
        <div v-if="imageObj && imageObj.src">
          <div class='bg-setting'>
            <div class="bg-repeat-edit">
              <ul>
                <li v-for="(t,i) in bgRepeatTypes">
                  <input type="radio" name="bg-repeat" :id="`bg-repeat${i}`" :value="i" v-model="style.bg.repeat">
                  <label :for="`bg-repeat${i}`">{{t}}</label>
                </li>
              </ul>
            </div>
            <div class="bg-position-edit">
              <h4>位置</h4>
              <ul>
                <li v-for="i in 9">
                  <input type="radio" name="bg-position" :id="`bg-position${i}`" :value="i" v-model="style.bg.position">
                  <label :for="`bg-position${i}`"><i></i></label>
                </li>
              </ul>
            </div>
          </div>
          <div class="bg-other-props">
            <div>
              <input type="checkbox" id="bg-attachment" v-model="style.bg.attachment"/> <label for="bg-attachment">背景固定不滚动</label>
            </div>
            <div>
              <input type="checkbox" id="bg-stretch" v-model="style.bg.stretch"/> <label for="bg-stretch">背景拉伸到边缘</label>
            </div>
          </div>
          <div class="bg-mask-edit">
            <div>
              <h4>蒙板背景色</h4>
              <div>
                <color-picker v-model="style.mask.color"></color-picker>
              </div>
            </div>
            <div>
              <h4>蒙板透明度</h4>
              <div class="mask-opacity-wrapper">
                <input type="range" min="0" max="100" step="1" v-model="style.mask.opacity" class="mask-opacity" />
                <label>{{this.style.mask.opacity}}%</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </sidebar>
</template>

<style>

.border-width-input{
  height: 30px;
  border:2px solid #ddd;
  text-align: center;
  border-radius: 4px;
  width:60px;
}

.background-image-edit {
  display: flex;
  flex-direction: row;
}

.image-selector {
  width: 120px;
  height: 120px;
  cursor: pointer;
  background: #eee;
}
.bg-image-thumbnail-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    background-color: #eee;
    cursor: pointer;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
}
.bg-image-thumbnail {
  max-width: 100%;
  max-height: 100%;
  height: auto;
}
.bg-image-thumbnail-action {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #333;
  color: #fff;
  flex-direction: column;
  display: none;
}
.bg-image-thumbnail-action div {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-image-thumbnail-action div:hover {
  background: #444;
}
.bg-image-thumbnail-wrapper:hover .bg-image-thumbnail-action {
  display: flex;
}
.bg-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}

.bg-setting {
  margin-top: 10px;
  display: flex;
}
/*背景模式*/
.bg-repeat-edit {
  margin-right: 30px;
}
.bg-repeat-edit ul {
  padding: 0;
  margin: 0;
}
.bg-repeat-edit ul li {
  list-style: none;
}
.bg-repeat-edit ul li input {
  /*display: none;*/
}
.bg-repeat-edit ul li label {
  font-weight: normal;
  cursor: pointer;
}

/*背景位置*/
.bg-position-edit h4 {
  font-size: 16px;
  padding: 4px 0 0 0;
  margin: 0 0 12px 0;
}
.bg-position-edit {
}
.bg-position-edit ul {
  width: 100px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.bg-position-edit ul li {
  width: 33%;
  list-style: none;
}
.bg-position-edit ul li input {
  display: none;
}
.bg-position-edit ul li label {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  background-color: #eee;
  cursor: pointer;
  position: relative;
}

.bg-position-edit ul li label:hover {
  background-color: #ddd;
}
.bg-position-edit ul li input:checked + label {
  background-color: #555;
}
.bg-position-edit ul li label i {
  width: 0;
  height: 0;
  position: absolute;
}

.bg-position-edit ul li:nth-child(9n+1) label i {
  border-style: solid;
  border-width: 8px 8px 0 0;
  border-color: #ccc transparent transparent transparent;
  top: 6px;
  left: 6px;
}

.bg-position-edit ul li:nth-child(9n+3) label i {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 8px 8px 0;
  border-color: transparent #ccc transparent transparent;
  position: absolute;
  top: 6px;
  right: 6px;
}

.bg-position-edit ul li:nth-child(9n+5) label i {
  border: none;
  background-color: #ccc;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  top: 8px;
  left: 8px;
}

.bg-position-edit ul li:nth-child(9n+7) label i {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 0 0 8px;
  border-color: transparent transparent transparent #ccc;
  position: absolute;
  bottom: 6px;
  left: 6px;
}

.bg-position-edit ul li:nth-child(9n) label i {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 8px 8px;
  border-color: transparent transparent #ccc transparent;
  position: absolute;
  bottom: 6px;
  right: 6px;
}

.background-edit h3 {
  font-size: 18px;
}

.bg-other-props {
  margin-top: 15px;
}
.bg-other-props label {
  font-weight: normal;
}

.bg-mask-edit h4 {
  font-size: 14px;
  font-weight: normal;
  margin-top: 16px;
}

.mask-opacity-wrapper {
  padding: 5px;
  background: #eee;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
}

.mask-opacity-wrapper label {
  width: 44px;
  margin: 0;
  padding: 0;
  text-align: right;
}
.mask-opacity-wrapper input {
  flex: 1;
}

/* 设置蒙板透明度的 input slider */
input[type=range].mask-opacity {
  -webkit-appearance: none;
  margin: 2.5px 0;
  background-color: transparent;
}
input[type=range].mask-opacity:focus {
  outline: none;
}
input[type=range].mask-opacity::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  box-shadow: 0.5px 0.5px 0px #e0dfdf, 0px 0px 0.5px #edecec;
  background: rgba(255, 255, 255, 0.78);
  border-radius: 2px;
  border: 1px solid #ececec;
}
input[type=range].mask-opacity::-webkit-slider-thumb {
  box-shadow: 2px 2px 5.4px #b4b4b4, 0px 0px 2px #c1c1c1;
  border: 0px solid rgba(0, 0, 0, 0);
  height: 13px;
  width: 13px;
  border-radius: 6px;
  background: #0080c0;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3.5px;
}
input[type=range].mask-opacity:focus::-webkit-slider-runnable-track {
  background: rgba(255, 255, 255, 0.78);
}
input[type=range].mask-opacity::-moz-range-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  box-shadow: 0.5px 0.5px 0px #e0dfdf, 0px 0px 0.5px #edecec;
  background: rgba(255, 255, 255, 0.78);
  border-radius: 2px;
  border: 1px solid #ececec;
}
input[type=range].mask-opacity::-moz-range-thumb {
  box-shadow: 2px 2px 5.4px #b4b4b4, 0px 0px 2px #c1c1c1;
  border: 0px solid rgba(0, 0, 0, 0);
  height: 13px;
  width: 13px;
  border-radius: 6px;
  background: #0080c0;
  cursor: pointer;
}
input[type=range].mask-opacity::-ms-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range].mask-opacity::-ms-fill-lower {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid #ececec;
  border-radius: 4px;
  box-shadow: 0.5px 0.5px 0px #e0dfdf, 0px 0px 0.5px #edecec;
}
input[type=range].mask-opacity::-ms-fill-upper {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid #ececec;
  border-radius: 4px;
  box-shadow: 0.5px 0.5px 0px #e0dfdf, 0px 0px 0.5px #edecec;
}
input[type=range].mask-opacity::-ms-thumb {
  box-shadow: 2px 2px 5.4px #b4b4b4, 0px 0px 2px #c1c1c1;
  border: 0px solid rgba(0, 0, 0, 0);
  height: 13px;
  width: 13px;
  border-radius: 6px;
  background: #0080c0;
  cursor: pointer;
  height: 8px;
}
input[type=range].mask-opacity:focus::-ms-fill-lower {
  background: rgba(255, 255, 255, 0.78);
}
input[type=range].mask-opacity:focus::-ms-fill-upper {
  background: rgba(255, 255, 255, 0.78);
}

</style>
