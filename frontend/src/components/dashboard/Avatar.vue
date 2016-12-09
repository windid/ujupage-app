<script>
  import { Tooltip } from 'element-ui'

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
    computed: {
      memberName () {
        const name = this.member.name
        const shortName = name.substr(name.length - 2, 2)
        if (testChinese(shortName)) {
          return shortName
        } else {
          return name.substr(0, 2).toUpperCase()
        }
      }
    }
  }
</script>

<template>
  <tooltip :content="member.email" class="avatar">
    {{memberName}}
    <div slot="content" style="text-align:center; line-height: 1.4;">
      {{member.name}}<br/>
      {{member.email}}<br/>
      {{member.pivot.role === 'admin' ? '项目管理员' : '项目成员'}}
    </div>
  </tooltip>
</template>

<style scoped>
  
</style>