<script>
import StatsNav from './StatsNav'

export default {
  components: {
    StatsNav
  },
  props: ['report']
}

</script>

<template>
  <div>
    <stats-nav title="转化详情"></stats-nav>
    <div class="stats-content">
      <h4>转化事件</h4>
      <table class="report table table-bordered table-hover">
        <thead>
          <tr>
            <th width="120px">转化类型</th>
            <th>转化目标</th>
            <th width="120px">转化次数</th>
            <th width="120px">转化率</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>事件</td>
            <td>表单提交成功</td>
            <td>123</td>
            <td>12.3%</td>
          </tr>
          <tr>
            <td>外链/下载</td>
            <td>http://test.com</td>
            <td>356</td>
            <td>31.6%</td>
          </tr>
        </tbody>
      </table>

      <h4>非转化事件<span class="title-remark">(未被定义为转化的用户交互行为)</span></h4>
      <table class="report table table-bordered table-hover">
        <thead>
          <tr>
            <th width="120px">事件类型</th>
            <th>事件描述</th>
            <th width="120px">发生次数</th>
            <th width="120px">发生率</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>事件</td>
            <td>表单提交失败</td>
            <td>84</td>
            <td>10.1%</td>
          </tr>
          <tr>
            <td>外链/下载</td>
            <td>http://test.com/haha</td>
            <td>356</td>
            <td>15%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>