<script>
import Dropdown from '../ui/Dropdown.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'PageItem',
  props: {
    pageItem: {
      type: Object
    }
  },
  components: {
    Dropdown
  },
  data () {
    return {
      showMenu: false,
      moving: false
    }
  },
  computed: mapGetters({
    pageGroups: 'allPageGroups',
    defaultPageGroup: 'defaultPageGroup',
    currentPageGroup: 'currentPageGroup'
  }),
  methods: {
    remove () {
      this.showMenu = false
      this.$store.dispatch('confirm', {
        header: '确定删除' + this.pageItem.name + '?',
        content: '页面被删除后将不可恢复。',
        onConfirm: () => {
          this.$store.dispatch('removePage', this.pageItem)
        }
      })
    },
    rename () {
      this.showMenu = false
      this.$store.dispatch('getInput', {
        header: '请输入新的页面名称',
        content: this.pageItem.name,
        onConfirm: (newName) => {
          if (newName && newName !== this.pageItem.name) {
            this.$store.dispatch('renamePage', [this.pageItem, newName])
          }
        }
      })
    },
    duplicate () {
      this.$store.dispatch('duplicatePage', this.pageItem)
      this.showMenu = false
    },
    move () {
      this.moving = true
    },
    moveTo (pageGroup) {
      if (pageGroup !== this.currentPageGroup) {
        this.$store.dispatch('movePage', [this.pageItem, pageGroup])
      }
      this.showMenu = false
    }
  },
  watch: {
    'showMenu': function (val) {
      this.moving = false
    }
  }
}
</script>

<template>
  <div class="page-item">
    <div class="page-item-header">
      <div class="page-item-name"><router-link :to="'/editor/' + pageItem.id">{{pageItem.name}}</router-link></div>
      <div class="page-item-url">
        <a v-if="pageItem.url" :href="'http://www.juyepage.com/' + pageItem.url" target="_blank">www.juyepage.com/{{pageItem.url}}</a>
        <span v-else>未发布</span>
      </div>
    </div>
    <div class="page-item-body"></div>
    <div class="page-item-footer">
      <div class="btn-group fr">
        <router-link class="btn btn-default btn-sm" :to="'/leads/' + pageItem.id">
          商机 <span class="glyphicon glyphicon-user"></span>
        </router-link>
        <router-link class="btn btn-default btn-sm" :to="'/stats/' + pageItem.id + '/overview'">
          分析 <span class="glyphicon glyphicon-stats"></span>
        </router-link>
        <dropdown :show="showMenu" dir="up" @toggle="showMenu = !showMenu">
          <slot>
            <div class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
              <span class="glyphicon glyphicon-cog"></span> <span class="caret"></span>
            </div>
          </slot>
          <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right page-menu">
            <div v-if="moving" class="move-to-group-menu">
              <div class="move-to-group-header">移动到文件夹</div>
              <div class="move-to-group-body">
                <div class="move-to-group-item" @click="moveTo(defaultPageGroup)">根目录</div>
                <div class="move-to-group-item" v-for="pageGroup in pageGroups" @click="moveTo(pageGroup)">{{pageGroup.name}}</div>
              </div>
            </div>
            <div v-else class="btn-group-vertical">
              <div class="btn btn-danger btn-sm" @click="remove">删除 <span class="glyphicon glyphicon-trash"></span></div>
              <div class="btn btn-default btn-sm" @click="rename">改名 <span class="glyphicon glyphicon-pencil"></span></div>
              <div class="btn btn-default btn-sm" @click="duplicate">复制 <span class="glyphicon glyphicon-duplicate"></span></div>
              <div class="btn btn-default btn-sm" @click.stop="move">移动 <span class="glyphicon glyphicon-copy"></span></div>
            </div>
          </div>
        </dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.page-item-header{
  position:relative;
  padding:10px;
  font-weight:bold;
}

.page-item-name a, .page-item-url a {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
}

.page-item-url {
  span, a {
    color: #bbb;
    font-size: 12px;
  }
}

.page-item-body{
  height: 60px;
  background:#f9f9f9;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.page-item-footer{
  height: 58px;
  text-align: right;
  padding: 15px;
}

.page-menu {
  border: 0;
  width: auto;
  min-width: 0;
  background: transparent;
  box-shadow: none;
}

.button-link {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.move-to-group-menu{
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 180px;
}

.move-to-group-header{
  padding: 6px 12px;
  background: #eee;
}

.move-to-group-body{
  max-height:160px;
  overflow-x: hidden;
  overflow-y: auto;
}

.move-to-group-item{
  padding: 6px 12px;
  white-space:nowrap;
  cursor: pointer;
}

.move-to-group-item:hover{
  background: #f6f6f6;
}

</style>