<script>
import dropdown from '../../ui/dropdown.vue'
import { mapGetters, mapActions } from 'vuex'


export default {
  props: {
    pageItem:{
      type: Object
    }
  },
  components: {
    dropdown
  },
  data(){
    return {
      showMenu: false
    }
  },
  methods:{
    remove(){
      this.$store.dispatch('confirm', {
        header: '确定删除' + this.pageItem.name + '?',
        content: '页面被删除后将不可恢复。',
        onConfirm: () => {
          this.$store.dispatch('removePage', this.pageItem);
        }
      });
    },
    rename(){
      this.$store.dispatch('getInput', {
        header: '请输入新的页面名称',
        content: this.pageItem.name,
        onConfirm: (newName) => {
          if (newName && newName !== this.pageItem.name){
            this.$store.dispatch('renamePage', [ this.pageItem, newName ]);
          }
        }
      });
    },
    duplicate(){
      this.$store.dispatch('duplicatePage', this.pageItem);
    }
  }
}
</script>

<template>
<transition name="bounce" mode="out-in">
  <div class="page-item">
    <div class="page-item-header">
      <div class="page-item-name"><a :href="'/editor/'+pageItem.id">{{pageItem.name}}</a></div>
      <div class="page-item-url">
        <a v-if="pageItem.url" :href="'http://'+pageItem.url">{{pageItem.url}}</a>
        <span v-else>未发布</span>
      </div>
    </div>
    <div class="page-item-body"></div>
    <div class="page-item-footer">
      <div class="btn-group fr">
        <div class="btn btn-default btn-sm">商机 <span class="glyphicon glyphicon-user"></span></div>
        <div class="btn btn-default btn-sm">分析 <span class="glyphicon glyphicon-signal"></span></div>
        <dropdown :show="showMenu" dir="up" @toggle="showMenu = !showMenu">
          <slot>
            <div class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
              <span class="glyphicon glyphicon-cog"></span> <span class="caret"></span>
            </div>
          </slot>
          <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right page-menu">
            <div class="btn-group-vertical">
              <div class="btn btn-danger btn-sm" @click="remove">删除 <span class="glyphicon glyphicon-trash"></span></div>
              <div class="btn btn-default btn-sm" @click="rename">改名 <span class="glyphicon glyphicon-pencil"></span></div>
              <div class="btn btn-default btn-sm" @click="duplicate">复制 <span class="glyphicon glyphicon-duplicate"></span></div>
              <div class="btn btn-default btn-sm">移动 <span class="glyphicon glyphicon-copy"></span></div>
            </div>
          </div>
        </dropdown>
      </div>
    </div>
  </div>
</transition>
</template>

<style lang="sass" scoped>
@import "../../../sass/config";

.page-item{
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 6px;
  float:left;
  margin:10px;
  @extend .shadow;
}

.page-item-header{
  position:relative;
  padding:10px;
  font-weight:bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.page-item-name{
  
}

.page-item-url span, .page-item-url a{
  color:#bbb;
  font-size: 12px;
}

.page-item-body{
  height:130px;
  background:#f9f9f9;
  border-top:1px solid #eee;
  border-bottom:1px solid #eee;
}

.page-item-footer{
  height:50px;
  text-align: right;
  padding:10px;
}

.page-menu{
  border:0;
  width:auto;
  min-width: 0;
  background: transparent;
  box-shadow: none;
}
</style>