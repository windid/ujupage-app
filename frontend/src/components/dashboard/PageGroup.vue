<script>
import { mapActions } from 'vuex'

export default {
  props: {
    pageGroup: {
      type: Object
    }
  },
  computed: {
    editing () {
      return this.$store.getters.editingPageGroup === this.pageGroup
    }
  },
  methods: {
    ...mapActions([
      'removePageGroup',
      'switchPageGroup',
      'setEditingPageGroup',
      'renamePageGroup'
    ]),
    rename (e) {
      if (!this.editing) {
        return
      }
      const newName = e.target.value
      if (newName && newName !== this.pageGroup.name) {
        this.renamePageGroup(newName)
      }
      this.setEditingPageGroup({})
    },
    remove () {
      this.$store.dispatch('confirm', {
        header: '确定删除？',
        content: '「 ' + this.pageGroup.name + ' 」内的所有页面将一并被删除。',
        onConfirm: () => {
          this.removePageGroup(this.pageGroup)
        }
      })
    }
  },
  watch: {
    'editing': function (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.nameInput.focus()
          this.$refs.nameInput.select()
        })
      }
    }
  }
}
</script>

<template>
  <div class="page-group" @click="switchPageGroup([pageGroup])">
    <div class="page-group-header">
      <div class="page-group-name">
        <div v-if="editing" class="input-group" @click.stop>
          <input ref="nameInput" :value="pageGroup.name" @keyup.enter="rename" @blur="rename" class="form-control" type="text">
          <div class="input-group-btn">
            <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
          </div>
        </div>
        <span v-else>{{pageGroup.name}}</span>
      </div>
    </div>
    <div class="page-group-body">
      <span class="glyphicon glyphicon-folder-open"></span>
    </div>
    <div class="page-group-footer">
      <div class="btn-group fr">
        <div class="btn btn-default btn-sm" @click.stop="setEditingPageGroup(pageGroup)">改名 <span class="glyphicon glyphicon-pencil"></span></div>
        <div class="btn btn-default btn-sm" @click.stop="remove">删除 <span class="glyphicon glyphicon-trash"></span></div>
      </div>
    </div>
  </div>
</template>

<style>
.page-group {
  background: #f9f9f9;
  cursor: pointer;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 6px;
  float: left;
  margin: 10px;
  box-shadow: 0 0 8px #ddd;
}

.page-group-header {
  position: relative;
  padding: 10px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.page-group-name {
  line-height: 35px;
}

.page-group-body {
  height: 136px;
  font-size: 100px;
  color: #ccc;
  text-align: center;
  background: #f9f9f9;
}

.page-group-footer {
  height: 50px;
  text-align: right;
  padding: 10px;
}
</style>