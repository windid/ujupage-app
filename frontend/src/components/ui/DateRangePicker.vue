<template>
  <div class="date-picker-wrap btn-group btn btn-default dropdown-toggle" data-toggle="dropdown">
    <div>
      <span>{{ displayRange }}</span>
       &nbsp; <span class="glyphicon" :class="'glyphicon-menu-down'"></span>
    </div>
    <date-picker
      :editable="false"
      class="date-picker"
      v-model="dateRange"
      type="daterange"
      align="right"
      placeholder="请输入日期"
      :picker-options="pickerOptions">
    </date-picker>
  </div>
</template>

<script>
import moment, { msOfDay } from '../../utils/date'
import { DatePicker } from 'element-ui'

const defaultPickerOptions = {
  shortcuts: [
    {
      text: '今天',
      onClick (picker) {
        const today = new Date()
        picker.$emit('pick', [today, today])
      }
    },
    {
      text: '昨天',
      onClick (picker) {
        const date = new Date()
        date.setTime(date.getTime() - msOfDay)
        picker.$emit('pick', [date, date])
      }
    },
    {
      text: '最近7天',
      onClick (picker) {
        const start = new Date()
        const end = new Date()
        start.setTime(start.getTime() - msOfDay * 7)
        end.setTime(end.getTime() - msOfDay)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近30天',
      onClick (picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - msOfDay * 30)
        end.setTime(end.getTime() - msOfDay)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '本月',
      onClick (picker) {
        const end = new Date()
        const start = new Date()
        start.setDate(1)
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '上月',
      onClick (picker) {
        const start = moment().subtract(1, 'M')
        const end = moment().subtract(1, 'M')
        picker.$emit('pick', [start.startOf('month').value(), end.endOf('month').value()])
      }
    }
  ],
  disabledDate (d) {
    return moment(d).isAfter()
  }
}

export default {
  components: {
    DatePicker
  },
  props: {
    value: Object,
    pickerOptions: {
      type: Object,
      default () {
        return defaultPickerOptions
      }
    }
  },
  computed: {
    dateRange: {
      get () {
        const v = this.value
        return [v.startDate, v.endDate]
      },
      set (val) {
        const start = moment(val[0]).format('YYYY-MM-DD')
        const end = moment(val[1]).format('YYYY-MM-DD')
        if (start !== this.value.startDate || end !== this.value.endDate) {
          this.$emit('input', {
            startDate: moment(val[0]).format('YYYY-MM-DD'),
            endDate: moment(val[1]).format('YYYY-MM-DD')
          })
        }
      }
    },
    displayRange () {
      const { startDate, endDate } = this.value
      return startDate === endDate ? startDate : `${startDate} 至 ${endDate}`
    }
  }
}
</script>

<style lang="scss">
.date-picker-wrap.btn {
  position: relative;
  .date-picker {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 0;
    input {
      cursor: inherit;
      padding: 0;
      height: 100%;
    }
    .el-icon {
      display: none;
    }
  }
}
</style>