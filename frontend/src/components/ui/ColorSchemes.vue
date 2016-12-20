<script>
import Dropdown from '../ui/Dropdown.vue'

export default {
  components: {
    Dropdown
  },
  props: ['colorSet'],
  data () {
    return {
      // colorSchemes: [
      //   { name: '海滩', colors: ['#E6E2AF', '#A7A37E', '#EFECCA', '#046380', '#002F2F'] },
      //   { name: '佛罗伦萨', colors: ['#468966', '#FFF0A5', '#FFB03B', '#B64926', '#8E2800'] },
      //   { name: '淡蓝', colors: ['#FCFFF5', '#D1DBBD', '#91AA9D', '#3E606F', '#193441'] },
      //   { name: '菲德拉', colors: ['#FF6138', '#FFFF9D', '#BEEB9F', '#79BD8F', '#00A388'] },
      //   { name: '蜜罐', colors: ['#105B63', '#FFFAD5', '#FFD34E', '#DB9E36', '#BD4932'] },
      //   { name: '阿司匹林C', colors: ['#225378', '#1695A3', '#ACF0F2', '#F3FFE2', '#EB7F00'] }
      // ],
      colorTypes: {
        grey: {
          colorGroup: ['#999', '#ccc'],
          colorSchemes: [
            ['#FFFBFF', '#E8ECED', '#A4B7BB', '#76A0B0', '#35262D'],
            ['#FFFBDC', '#E5E2C6', '#BFBCA5', '#7F7D6E', '#3F3E37'],
            ['#FFFEFC', '#E2E3DF', '#515B5E', '#CAF200', '#2E3233'],
            ['#FFFFFF', '#DEDEDE', '#8AA8B0', '#F26101', '#313732'],
            ['#E1E7E8', '#A3ABAF', '#37646F', '#B22E2F', '#1B2B32']
          ]
        },
        red: {
          colorGroup: ['#A20D1E', '#F0788C'],
          colorSchemes: [
            ['#FF1D23', '#D40D12', '#94090D', '#5C0002', '#450003'],
            ['#FFC887', '#FF8A00', '#CC5400', '#B31E00', '#662222'],
            ['#FF822E', '#FF6517', '#FA5B0F', '#EF5411', '#261822'],
            ['#F6B1C3', '#F0788C', '#DE264C', '#BC0D35', '#820D1E'],
            ['#FFF0A5', '#FFB03B', '#B64926', '#468966', '#8E2800']
          ]
        },
        yellow: {
          colorGroup: ['#FFD34E', '#FFFAD5'],
          colorSchemes: [
            ['#FFF7EA', '#E3D2B4', '#B59D75', '#332312', '#140B04'],
            ['#EFECCA', '#E6E2AF', '#A7A37E', '#046380', '#002F2F'],
            ['#C8DBB6', '#ECEBB7', '#CCC68A', '#B8B165', '#827A5D'],
            ['#FAD46B', '#F0B650', '#DB913C', '#BA5B22', '#013C4D'],
            ['#FFF5A6', '#FFEB57', '#FFE30A', '#807105', '#242001']
          ]
        },
        blue: {
          colorGroup: ['#3F5765', '#BDD4DE'],
          colorSchemes: [
            ['#E8F8FF', '#B4DCED', '#91C9E8', '#67B8DE', '#004499'],
            ['#E1E6FA', '#C4D7ED', '#ABC8E2', '#375D81', '#183152'],
            ['#EEEFF7', '#92CDCF', '#445878', '#31353D', '#1C1D21'],
            ['#FCFFF5', '#D1DBBD', '#91AA9D', '#3E606F', '#193441'],
            ['#FFFEF1', '#70B85D', '#2C5E2E', '#54D0ED', '#0C273D']
            // ['#ECF0F1', '#3498DB', '#2980B9', '#E74C3C', '#2C3E50']
          ]
        },
        green: {
          colorGroup: ['#79BD8F', '#BEEB9F'],
          colorSchemes: [
            ['#D9E5CD', '#85EDB6', '#49B8A8', '#067778', '#212629'],
            ['#96ED89', '#45BF55', '#168039', '#044D29', '#00261C'],
            ['#C8E8C7', '#A4DEAB', '#85CC9F', '#499E8D', '#00261C'],
            ['#E1E6B9', '#C4D7A4', '#ABC8A4', '#375D3B', '#183128'],
            ['#C6FFFA', '#E2FFA8', '#D6E055', '#50B8B4', '#2E95A3']
            // ['#B1FF91', '#67CC8E', '#FFE877', '#FF5600', '#289976']
          ]
        },
        purple: {
          colorGroup: ['#7E4985', '#BBA1CB'],
          colorSchemes: [
            ['#EBD0C4', '#F1B0B0', '#D68684', '#735360', '#3E3947'],
            ['#9768D1', '#7B52AB', '#553285', '#36175E', '#25064D'],
            ['#FFAA5C', '#DA727E', '#AC6C82', '#685C79', '#455C7B'],
            ['#EDE0E6', '#D188A8', '#D369A4', '#9D899D', '#6F196F'],
            ['#FFFF00', '#59580B', '#B256A1', '#7F176B', '#2E064C']
          ]
        }
      },
      mainColor: 'grey',
      show: false
    }
  }
}
</script>

<template>
  <dropdown :show="show" @toggle="show = !show">
    <slot>
      <div data-toggle="dropdown" class="btn btn-default dropdown-toggle">配色 <span class="glyphicon glyphicon-th-large"></span></div>
    </slot>
    <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">
      <div class="color-schemes-content">
        <div class="color-type" v-for="(colorType, colorName) in colorTypes" :class="{selected: mainColor === colorName}" @mouseover="mainColor = colorName">
          <div class="color-selector">
            <div class="first-half" :style="{backgroundColor: colorType.colorGroup[0]}"></div>
            <div class="second-half" :style="{backgroundColor: colorType.colorGroup[1]}"></div>
          </div>
        </div>
        <div class="color-schemes-wrapper">
          <div v-for="colorScheme in colorTypes[mainColor].colorSchemes" @click="$emit('update-colors', colorScheme)">
            <ul class="list-inline color-schemes-group">
              <li v-for="color in colorScheme" :style="{background:color}" :title="color"></li>
            </ul>
          </div>
        </div>
        
        <div v-if="!!colorSet">
          <div style="text-align:center">当前选择</div>
          <ul class="list-inline color-schemes-group">
            <li v-for="color in colorSet" :style="{background:color}" :title="color"></li>
          </ul>
        </div>
      </div>
      <!-- <div class="color-schemes-footer">
        <div class="btn btn-default">管理我的配色方案</div>
      </div> -->
    </div>
  </dropdown>
</template>


<style scoped>
.color-type {
  float: left;
  margin: 0 5px;
  padding: 5px 0;
  transition: border-color .3s ease;
}

.color-type.selected {
  border-bottom: 4px solid #999;
}

.color-type.selected > .color-selector {
  transform: rotate(270deg);
  border-color: #ddd;
}

.color-selector {
  float: left;
  border-radius: 50%;
  cursor: pointer;
  transform: rotate(45deg);
  border: 5px solid #f6f6f6;
  transition: all .3s ease;
}

.color-selector:hover {
  box-shadow: 0 0 8px #ddd;
}

.color-selector > div {
  float: left;
  height: 24px;
  width: 12px;
}


.first-half {
  border-radius: 24px 0 0 24px; 
}

.second-half {
  border-radius: 0 24px 24px 0; 
}

.color-schemes-wrapper {
  clear: both;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.color-schemes-content {
  cursor: default;
}

.color-schemes-group {
  border: 2px solid #eee;
  padding: 0;
  width: 254px;
  height: 34px;
  margin: 5px;
  cursor: pointer;
}

.color-schemes-group:hover {
  border-color: #ccc;
}

.color-schemes-group li {
  border: 0;
  padding: 0;
  width: 50px;
  height: 30px;
}

.color-schemes-footer {
  padding: 5px;
  text-align: right;
}

</style>