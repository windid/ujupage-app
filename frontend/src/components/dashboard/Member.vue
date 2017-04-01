<script>
  import { Tooltip } from 'element-ui'
  import eventHandler from '../../utils/eventHandler'
  import { mapGetters, mapActions } from 'vuex'
  import { chineseRE } from '../../utils'

  export default {
    name: 'member',
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
        const name = this.member.name || this.member.email
        const shortName = name.substr(name.length - 2, 2)
        if (chineseRE.test(shortName)) {
          return shortName
        } else {
          return name.substr(0, 2).toUpperCase()
        }
      },
      memberRole () {
        return this.member.pivot ? this.member.pivot.role : 'invited'
      }
    },
    methods: {
      ...mapActions(['removeMember', 'cancelInvite', 'confirm']),
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
      remove () {
        this.confirm({
          header: '移除成员',
          content: '确定将' + this.member.name + '移除出此项目吗？',
          onConfirm: () => {
            if (this.memberRole === 'invited') {
              this.cancelInvite([this.member, this.project])
            } else {
              this.removeMember([this.member, this.project])
            }
          }
        })
      }
    }
  }
</script>

<template>
  <tooltip data-toggle="dropdown" v-model="show" :manual="true" @click.native="toggle" placement="bottom">
    <div>
      {{memberName}}
    </div>
    <div ref="tooltip" slot="content" class="tooltip-content">
      <p v-if="memberRole === 'invited'">
        {{member.email}}<br>
        已邀请<br>
      </p>
      <p v-else>
        {{member.name}}<br>
        {{member.email}}<br>
        {{memberRole === 'admin' ? '项目管理员' : '项目成员'}}<br>
      </p>
      <div v-if="isAdmin && memberRole !== 'admin'" class="btn btn-xs btn-danger" @click="remove">移除</div>
    </div>
  </tooltip>
</template>

<style scoped>
  .tooltip-content {
    text-align:center;
    line-height: 1.4;
  }
</style>