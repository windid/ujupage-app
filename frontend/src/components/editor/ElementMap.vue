<script>
import elementMixin from '../../mixins/elementMixin'
import { merge, isEqual } from 'lodash'

export default {
  name: 'element-map',
  mixins: [elementMixin],
  data () {
    return {
      resize: {
        handles: 'e,s'
      },
      input: '',
      posList: [],
      showList: false,
      editing: false,
      map: null,
      marker: null
    }
  },
  computed: {
    center () {
      if (this.localElement.data.position === null) {
        return [113.280637, 23.125178]
      } else {
        return this.localElement.data.position
      }
    }
  },
  methods: {
    initMap () {
      const marked = this.localElement.data.position !== null
      if (this.map === null) {
        const config = {
          resizeEnable: true,
          zoom: marked ? 16 : 11,
          center: this.center
        }
        const toolBar = new window.AMap.ToolBar({
          visible: true
        })
        this.map = new window.AMap.Map(this.$refs.mapContent, config)
        toolBar.hideDirection()
        toolBar.hideRuler()
        this.map.addControl(toolBar)
      } else {
        this.map.setCenter(this.center)
      }
      if (this.marker !== null) {
        this.marker.setMap(null)
      }
      if (marked) {
        this.marker = new window.AMap.Marker({
          position: this.localElement.data.position,
          title: this.localElement.data.name
        })
        this.marker.setMap(this.map)
      }
    },
    editDone () {
      this.editing = false
      this.buttonGroup = 'main'
      if (!isEqual(this.element, this.localElement)) {
        this.modifyElement([this.elementId, this.localElement])
      }
    },
    edit () {
      this.editing = true
      this.buttonGroup = 'address'
      setTimeout(() => {
        this.$refs.input && this.$refs.input.focus()
      }, 50)
    },
    search () {
      const keyword = this.input
      const self = this
      window.AMap.service('AMap.PlaceSearch', function () {
        var placeSearch = new window.AMap.PlaceSearch({
          pageSize: 5,
          pageIndex: 1,
          city: '010'
        })
        placeSearch.search(keyword, (status, result) => {
          if (result.poiList.count > 0) {
            self.posList = result.poiList.pois
            self.showList = true
          }
        })
      })
    },
    selectAddress (index) {
      const pos = this.posList[index]
      const loc = pos.location
      const coordination = [loc.lng, loc.lat]
      this.localElement.data.position = coordination
      this.localElement.data.name = pos.name
      this.map.setCenter(coordination)
      this.map.setZoom(16)
      if (this.marker !== null) {
        this.marker.setMap(null)
      }
      this.marker = new window.AMap.Marker({
        position: coordination,
        title: pos.name
      })
      this.marker.setMap(this.map)
      this.showList = false
      this.editDone()
    }
  },
  watch: {
    'element': function (val) {
      if (!isEqual(val, this.localElement)) {
        this.localElement = merge({}, val)
        this.initMap()
      }
    }
  },
  mounted () {
    if (!window.GaodeMapScript) {
      const mapScript = document.createElement('script')
      const script = document.getElementsByTagName('script')[0]
      mapScript.type = 'text/javascript'
      mapScript.async = true
      mapScript.defer = true
      mapScript.src = '//webapi.amap.com/maps?v=1.3&key=e3b78e84d1aedba49bc8a84c4e113e01&plugin=AMap.ToolBar'
      script.parentNode.insertBefore(mapScript, script)
      const vm = this
      mapScript.onload = function () {
        vm.initMap()
      }
      window.GaodeMapScript = mapScript
    } else {
      this.initMap()
    }
  }
}
</script>

<template>
<element-common
  :element="element" 
  :section-id="sectionId" 
  :element-id="elementId"
  :button-group="buttonGroup"
  :resizable="resizable"
  :resize="resize"
  @drag-start="editDone">
</div>
  <div class="element-map" slot="content" @dblclick.stop="edit">
    <div class="element-map-content" ref="mapContent"></div>
    <div class="map-mask"></div>
  </div>
  <template slot="main-buttons-extend">
    <div class="btn btn-primary" title="定位" @click.stop="edit">定位</div>
  </template>
  <template slot="button-groups">
    <div v-if="buttonGroup === 'address'">
      <div class="input-group search-form">
        <input type="text" class="form-control" v-model="input" @keydown.enter="search" ref="input" placeholder="输入地名，回车搜索"></input>
        <div class="input-group-btn">
          <div class="btn btn-primary" @click.stop="search">搜索</div>
        </div>
      </div>
      <div class="search-result" v-show="showList">
        <ul>
          <li
            v-for="(pos, index) in posList"
            @click="selectAddress(index)">{{pos.name}}</li>
        </ul>
      </div>
    </div>
  </template>
</template>

<style scoped>
.element-map {
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
  position: relative;
}
.map-mask {
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
}
.element-map-content {
  width: 100%;
  height: 100%;
}
.search-form {
  display: flex;
}
.search-result ul {
  padding: 0;
  border-radius: 4px;
  background: rgba(255,255,255, 0.9);
  box-shadow: 0 0 3px #bbb;
}
.search-result ul li {
  list-style: none;
  padding: 4px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.search-result ul li:last-child {
  border: none;
}
.search-result ul li:hover {
  color: #337ab7;
}
</style>