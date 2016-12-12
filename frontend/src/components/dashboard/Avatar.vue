<script>
  import { Tooltip } from 'element-ui'
  import eventHandler from '../../utils/eventHandler'
  import { mapGetters, mapActions } from 'vuex'

  const testChinese = (str) => {
    const re = /[^\u4e00-\u9fa5]/
    if (re.test(str)) return false
    return true
  }

  export default {
    name: 'avatar',
    props: {
      member: {
        type: Object,
        required: true
      }
    },
    components: {
      Tooltip
    },
    data () {
      return {
        show: false
      }
    },
    computed: {
      ...mapGetters({
        isAdmin: 'isProjectAdmin',
        project: 'currentProject'
      }),
      memberName () {
        const name = this.member.name
        const shortName = name.substr(name.length - 2, 2)
        if (testChinese(shortName)) {
          return shortName
        } else {
          return name.substr(0, 2).toUpperCase()
        }
      }
    },
    methods: {
      ...mapActions(['removeMember', 'confirm']),
      toggle () {
        if (this.show) {
          this.show = false
          if (this._closeEvent) {
            this._closeEvent.remove()
          }
        } else {
          this.show = true
          const el = this.$el
          const tooltipEl = this.$refs.tooltip
          this._closeEvent = eventHandler.listen(window, 'click', (e) => {
            if (!el.contains(e.target) && !tooltipEl.contains(e.target) && this.show) {
              this.toggle()
            }
          })
        }
      },
      remove (member) {
        this.confirm({
          header: '移除成员',
          content: '确定将' + member.name + '移除出此项目吗？',
          onConfirm: () => {
            this.removeMember([member, this.project])
          }
        })
      }
    }
  }
</script>

<template>
  <tooltip data-toggle="dropdown" v-model="show" :manual="true" @click.native="toggle">
    {{memberName}}
    <div ref="tooltip" slot="content" class="tooltip-content">
      {{member.name}}<br/>
      {{member.email}}<br/>
      {{member.pivot.role === 'admin' ? '项目管理员' : '项目成员'}}<br/>
      <!-- <div v-if="isAdmin && member.pivot.role !== 'admin'" class="btn btn-xs btn-danger" @click="remove(member)">移除</div> -->
    </div>
  </tooltip>
</template>

<style scoped>
  .tooltip-content {
    text-align:center;
    line-height: 1.4;
  }
</style>