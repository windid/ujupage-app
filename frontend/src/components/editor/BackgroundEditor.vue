<script>
  import SidebarPart from '../ui/SidebarPart'
  import ColorPicker from './ColorPicker'
  import colorMixin from '../../mixins/colorMixin'
  import ImagePicker from './ImagePicker'

  export default {
    props: {
      value: {
        type: Object,
        required: true
      },
      expand: {
        type: Boolean,
        default: false
      }
    },
    components: {
      SidebarPart,
      ColorPicker,
      ImagePicker
    },
    mixins: [colorMixin],
    data () {
      return {
        positions: [
          'left top',
          'center top',
          'right top',
          'left center',
          'center center',
          'right center',
          'left bottom',
          'center bottom',
          'right bottom'
        ]
      }
    },
    computed: {
      background: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>

<template>
  <sidebar-part title="背景" :expand="expand">
    <color-picker slot="quick-selector" v-model="background.color" position="right" style="width: 100%; height: 100%;">
      <div class="color-btn" data-toggle="dropdown" 
        :style="{
          backgroundColor:getColor(background.color),
          backgroundImage: 'url(' + background.image + ')',
          backgroundRepeat: background.repeat,
          backgroundSize: 'cover',
          backgroundPosition: 'left top'
        }">
      </div>
    </color-picker>
    <div slot="content">
      <div class="col" style="width: 34%;">
        <image-picker v-model="background.image"></image-picker>
      </div>
      <div class="col" style="width: 28%;" v-if="background.image">
        <label><input type="radio" name="background-repeat" value="no-repeat" v-model="background.repeat"> 正常</label>
        <label><input type="radio" name="background-repeat" value="repeat" v-model="background.repeat"> 平铺</label>
        <label><input type="radio" name="background-repeat" value="repeat-x" v-model="background.repeat"> 水平平铺</label>
        <label><input type="radio" name="background-repeat" value="repeat-y" v-model="background.repeat"> 垂直平铺</label>
        <label><input type="checkbox" name="background-size" true-value="cover" false-value="auto" v-model="background.size"> 拉伸</label>
      </div>
      <div class="col" v-if="background.image" style="width: 32%; margin-right: 0">
        <p>背景图位置</p>
        <ul class="bg-repeat">
          <li v-for="(value, index) in positions">
            <input type="radio" name="bg-position" :id="`bg-position-${index}`" :value="value" v-model="background.position">
            <label :for="`bg-position-${index}`"><i></i></label>
          </li>
        </ul>
      </div>
    </div>
  </sidebar-part>
</template>

<style scoped>
  .col {
    float: left;
    margin-right: 3%;
  }

  .col label {
    font-weight: normal;
    cursor: pointer;
  }

  .color-btn {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }

  .bg-repeat {
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
  }

  .bg-repeat li {
    width: 33%;
    float: left;
  }

  .bg-repeat li input {
    display: none;
  }
  .bg-repeat li label {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 2px;
    background-color: #eee;
    cursor: pointer;
    position: relative;
  }

  .bg-repeat li label:hover {
    background-color: #ddd;
  }
  .bg-repeat li input:checked + label {
    background-color: #555;
  }
  .bg-repeat li label i {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0;
  }

  .bg-repeat li:nth-child(9n+1) label i {
    border-width: 8px 8px 0 0;
    border-color: #ccc transparent transparent transparent;
    top: 6px;
    left: 6px;
  }

  .bg-repeat li:nth-child(9n+3) label i {
    border-width: 0 8px 8px 0;
    border-color: transparent #ccc transparent transparent;
    top: 6px;
    right: 6px;
  }

  .bg-repeat li:nth-child(9n+5) label i {
    border: none;
    background-color: #ccc;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    top: 8px;
    left: 8px;
  }

  .bg-repeat li:nth-child(9n+7) label i {
    border-width: 8px 0 0 8px;
    border-color: transparent transparent transparent  #ccc;
    bottom: 6px;
    left: 6px;
  }

  .bg-repeat li:nth-child(9n) label i {
    border-width: 0 0 8px 8px;
    border-color: transparent transparent #ccc transparent;
    bottom: 6px;
    right: 6px;
  }
</style>

