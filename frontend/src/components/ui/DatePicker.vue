<template>
  <dropdown :show="show" @toggle="show=!show">
    <div class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <div>
        <span>{{currentDate}}</span>
         &nbsp; <span class="glyphicon" :class="show ? 'glyphicon-menu-up' : 'glyphicon-menu-down'"></span>
      </div>
    </div>
    <div slot="dropdown-menu" class="dropdown-menu" :class="{'dropdown-menu-right':position === 'right'}">
      <div class="datepicker-select-area btn-group">
        <button type="button" class="btn btn-default" @click="quickSelect(0)">今天</button>
        <button type="button" class="btn btn-default" @click="quickSelect(1)">昨天</button>
        <button type="button" class="btn btn-default" @click="quickSelect(7)">最近7天</button>
        <button type="button" class="btn btn-default" @click="quickSelect(14)">最近14天</button>
        <button type="button" class="btn btn-default" @click="quickSelect(30)">最近30天</button>
      </div>
      <div class="datepicker-selectDates">
        <div class="ctrl ctrl-left" >
          <a @click="prevMonth()" class="btn btn-default glyphicon glyphicon-chevron-left"></a>
        </div>
        <div class="datepicker-dates">
          <div v-for="dates in selectDates">
            <h5>{{dates.month}}</h5>
            <ul>
                <li>日</li>
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
                <template v-for="date in dates.dates">   
                  <li v-if="canSelectDate(date)" @click="selectDate($event, date.month + '-' + date.date, date.indexMonth, date.indexDate)" 
                    class="active" 
                    :class="{'selected': date.selected}">
                      {{date.date ? date.date : "&nbsp;"}}
                  </li>
                  <li v-else>{{date.date ? date.date : "&nbsp;"}}</li>
                </template>
            </ul>
          </div>
        </div>
        <div class="ctrl ctrl-right">
          <a @click="nextMonth()" class="btn btn-default glyphicon glyphicon-chevron-right"></a>
        </div>  
      </div>
      <div class="selected-dates-buttons">        
        <button type="button" class="btn btn-primary btn-sm" @click="dump()">确定</button>
        <button type="button" class="btn btn-default btn-sm" @click="cacnel()">取消</button>
      </div>
    </div>
  </dropdown>
</template>

<script>
import moment from 'moment'
import Dropdown from './Dropdown'
import 'moment/locale/zh-cn'
// import '../assets/css/bootstrap.min.css'

export default {
  components: {
    Dropdown
  },
  data () {
    return {
      show: false,
      year: moment().year(),
      month: moment().month() + 1,
      date: moment().date(),
      formatToDate: 'YYYY年MM月DD日',
      formatToInt: 'YYYYMMDD',
      currentDate: '',
      currentDateToInt: 0,

      selectLastMonth: moment().format('YYYY-MM'),
      selectDates: [],

      selectedStartDate: 0,
      selectedEndDate: 0,

      dateStartInt: 0,
      dateEndInt: 0,

      limitStartDateInt: 0,
      limitEndDateInt: 0
    }
  },
  mounted () {
    if (this.limitStartDate !== 0) {
      this.limitStartDateInt = moment(this.limitStartDate).format('YYYYMMDD')
    }
    if (this.limitEndDate !== 0) {
      this.limitEndDateInt = moment(this.limitEndDate).format('YYYYMMDD')
    }

    this.currentDate = moment().format(this.formatToDate)
    this.currentDateToInt = moment().format(this.formatToInt)

    this.setMonths()
  },
  props: {
    limitStartDate: {
      default: function () {
        return 0
      }
    },
    limitEndDate: {
      default: function () {
        return '2200-01-01'
      }
    },
    position: {
      default: 'left'
    }
  },
  watch: {
    'selectLastMonth': function () { this.setMonths() }
  },
  methods: {
    canSelectDate: function (date) {
      if (date.month && !date.disable) {
        return true
      } else {
        return false
      }
    },
    clickDatePicker: function () {
      this.show = false
    },
    setMonths: function () {
      const selectDates = []
      for (var i = 2, y = 0;
          i >= 0;
          i--) {
        var month = moment(this.selectLastMonth, 'YYYY-MM')
                      .add(-i, 'month')
                      .format('YYYY-MM')
        var _moment = moment(month, 'YYYY-MM')
        selectDates[y] = {
          month: _moment.format('YYYY年MM月')
        }
        var firstDay = _moment.day()
        var days = _moment.daysInMonth()

        selectDates[y].dates = []
        for (var s = 0, d = 1; s <= 41; s++) {
          if (s >= firstDay && d <= days) {
            var fulldateint = moment(month + '-' + d, 'YYYY-MM-DD').format(this.formatToInt)
            var disable = true
            // console.log(this.limitStartDateInt, fulldateint, this.limitEndDateInt)
            if (this.limitStartDateInt <= fulldateint && fulldateint <= this.limitEndDateInt) {
              disable = false
            }
            selectDates[y].dates[s] = { date: d, selected: false, month: month, indexMonth: y, indexDate: s, fullDateInt: fulldateint, disable: disable }
            d++
          } else {
            if (d === 1) {
              selectDates[y].dates[s] = {}
            }
          }
        }
        if (selectDates[y].dates !== undefined) {
          var _length = selectDates[y].dates.length
          selectDates[y].weeks = Math.ceil(_length / 7)
        }
        y++
      }
      this.selectDates = selectDates
    },
    prevMonth: function () {
      this.selectLastMonth = moment(this.selectLastMonth, 'YYYY-MM').add(-1, 'month').format('YYYY-MM')
    },
    nextMonth: function () {
      this.selectLastMonth = moment(this.selectLastMonth, 'YYYY-MM').add(1, 'month').format('YYYY-MM')
    },
    quickSelect: function (dayCounts) {
      if (dayCounts === 0) {
        this.selectedStartDate = this.currentDateToInt
        this.selectedEndDate = this.currentDateToInt
        this.currentDate = moment(this.currentDateToInt, this.formatToInt).format(this.formatToDate)
      } else {
        this.selectedStartDate = moment(this.currentDateToInt, this.formatToInt).add(-dayCounts, 'days').format(this.formatToInt)
        this.selectedEndDate = moment(this.currentDateToInt, this.formatToInt).add(-1, 'days').format(this.formatToInt)
        if (this.selectedStartDate === this.selectedEndDate) {
          this.currentDate = moment(this.selectedEndDate, this.formatToInt).format(this.formatToDate)
        } else {
          this.currentDate = moment(this.selectedStartDate, this.formatToInt).format(this.formatToDate) +
                                ' 至 ' + moment(this.selectedEndDate, this.formatToInt).format(this.formatToDate)
        }
      }
      this.dump()
    },
    selectDate: function (event, date, m, d) {
      var s = moment(date, 'YYYY-MM-DD').format(this.formatToInt)
      if (this.selectedStartDate === 0) {
        this.selectedStartDate = s
      } else if (this.selectedStartDate >= s) {
        this.selectedEndDate = this.selectedStartDate
        this.selectedStartDate = s
      } else if (this.selectedEndDate === 0 || this.selectedEndDate < s) {
        this.selectedEndDate = s
      } else if (this.selectedStartDate < s && this.selectedEndDate > s) {
        this.setMonths()

        this.selectedStartDate = s
        this.selectedEndDate = 0
      }
      this.selectDates[m].dates[d].selected = true
      this.$root.$set(this.selectDates, m, this.selectDates[m])

      if (this.selectedStartDate === this.selectedEndDate && this.currentDateToInt === this.selectedStartDate) {
        this.quickSelect(0)
      } else if (this.selectedStartDate > 0 && this.selectedEndDate > 0) {
        for (var dates in this.selectDates) {
          for (var dd in this.selectDates[dates].dates) {
            if (this.selectDates[dates].dates[dd].fullDateInt >= this.selectedStartDate &&
                  this.selectDates[dates].dates[dd].fullDateInt <= this.selectedEndDate) {
              this.selectDates[dates].dates[dd].selected = true
            }
          }
          this.$root.$set(this.selectDates, m, this.selectDates[m])
        }
      }
    },
    dump: function () {
      if (this.selectedStartDate === this.selectedEndDate) {
        this.currentDate = moment(this.selectedEndDate, this.formatToInt).format(this.formatToDate)
      } else {
        this.currentDate = moment(this.selectedStartDate, this.formatToInt).format(this.formatToDate) +
                              ' 至 ' + moment(this.selectedEndDate, this.formatToInt).format(this.formatToDate)
      }

      this.dateStartInt = this.selectedStartDate
      this.dateEndInt = this.selectedEndDate
      this.$emit('input', '{startDate: ' + this.dateStartInt + ', endDate: this. ' + this.dateEndInt + '}')

      this.cacnel()
    },
    cacnel: function () {
      this.show = false
      this.setMonths()

      this.selectedStartDate = 0
      this.selectedEndDate = 0
    }
  }
}
</script>

<style>
.datepicker {
  padding: 5px 10px;
}
.datepicker-box {
  position: absolute;
  width: 760px;
  height: 255px;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0, .15);
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
}
.datepicker-select-area {
  margin: 5px;
}
.datepicker-selectDates {
}
.datepicker-selectDates > div {
  float: left;
}
.datepicker-selectDates .ctrl {  
  text-align: center;
  width:50px;
  padding-top: 60px;
}
.datepicker-selectDates .ctrl-left{
}
.datepicker-selectDates .ctrl-right{
  float: right;
}
.datepicker-dates {
  width: 650px;
}
.datepicker-dates > div {
  width: 33.33%;
  float: left;
  padding-left: 8px;
}
.datepicker-dates div > h5 {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: bold;
}
.datepicker-dates div > ul {
  width:100%;
  text-align: center;
  padding-left: 0px;
}
.datepicker-dates div > ul > li:nth-child(-n+7) {
  border-bottom: 1px solid rgba(0,0,0, .15);
}
.datepicker-dates div > ul > li:nth-child(n+8) {
  color: #eee;
  cursor: default;
}
.datepicker-dates div > ul > li.active:nth-child(n+7) {
  color: #333;
  cursor: pointer !important;
}
.datepicker-dates div > ul > li.selected {
  color: #fff !important;
  background-color: #069;
}
.datepicker-dates div > ul > li {
  float: left;
  list-style-type: none;
  width: 14.28%;
}
.selected-dates-buttons {
  float: right;
  padding-right: 5px;
}
</style>