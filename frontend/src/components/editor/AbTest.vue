<script>
import Dropdown from '../ui/Dropdown.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Dropdown
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    ...mapActions([
      'loadVariation',
      'createVariation',
      'duplicateVariation',
      'removeVariation',
      'renameVariation',
      'getInput',
      'confirm',
      'warning'
    ]),
    rename (variation) {
      this.getInput({
        header: '请输入新的版本名',
        content: variation.name,
        onConfirm: (val) => {
          this.renameVariation([variation, val])
        }
      })
    },
    duplicate (variation) {
      this.duplicateVariation(variation)
      this.show = false
    },
    remove (variation) {
      if (this.page.variations.length === 1) {
        this.warning({
          header: '删除保护',
          content: '您不能删除唯一的版本，因为页面至少要保留一个版本。'
        })
        return
      }
      this.confirm({
        header: '确定删除？',
        content: '「' + variation.name + '」将被删除，其流量配额将按比例分配给其他版本',
        onConfirm: () => {
          this.removeVariation(variation)
          this.show = false
        }
      })
    },
    create () {
      this.createVariation()
      this.show = false
    },
    switchVariation (variation) {
      this.loadVariation([variation])
      this.show = false
    }
  },
  computed: {
    ...mapGetters({
      page: 'editingPage',
      workspace: 'editorWorkspace'
    })
  }
}
</script>

<template>
  <dropdown :show="show" @toggle="show=!show">
    <div class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <div>
        <span v-if="page.variations && page.variations.length > 1" class="current-variation-name">{{workspace.activeVariation.name}}</span>
        <span v-else>A/B测试</span>
         &nbsp; <span class="caret"></span>
      </div>
    </div>
    <ul slot="dropdown-menu" class="dropdown-menu variations-menu">
      <li v-for="variation in page.variations" :class="{ active: variation.id === workspace.activeVariation.id }">
        <span class="variation-name" @click="switchVariation(variation)">{{variation.name}}</span>
        <span class="caret-right"></span>
        <div class="btn-group">
          <div class="btn btn-default" title="重命名" @click="rename(variation)"><span class="glyphicon glyphicon-pencil"></span></div>
          <div class="btn btn-default" title="复制" @click="duplicate(variation)"><span class="glyphicon glyphicon-duplicate"></span></div>
          <div class="btn btn-danger" title="删除" @click="remove(variation)"><span class="glyphicon glyphicon-trash"></span></div>
        </div>
      </li>
      <li @click="create()">
        <span class="glyphicon glyphicon-plus"></span> 新建一个版本
      </li>
    </ul>
  </dropdown>
</template>

<style scoped>
.variations-button{
  padding: 0 14px;
}

.current-variation-name{
  max-width: 120px;
  float: left;
  overflow: hidden;
  white-space: nowrap;
}

.variation-name{
  min-width: 130px;
  white-space: nowrap;
  display: block;
}

.variations-menu > li{
  position: relative;
  line-height: 34px;
  padding: 0 14px;
  cursor: pointer;
}

.variations-menu > li.active{
  background: #eee;
}

.variations-menu > li:hover{
  background: #eee;
}

.variations-menu > li > .btn-group {
  position: absolute;
  right:-100px;
  top: 0;
  display: none;
}

.variations-menu > li:hover > .btn-group{
  display:block;
}

.caret-right{
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 4px;
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: solid;
  border-color: transparent transparent transparent #333;
}


</style>