<script>
import ElementCommon from './ElementCommon'
import TimerEditor from './TimerEditor'
import colorMixin from '../../mixins/colorMixin.js'
import elementMixin from '../../mixins/elementMixin'

import { mapGetters, mapActions } from 'vuex'
import { merge, isEqual } from 'lodash'

export default {
  name: 'element-timer',
  props: ['element', 'elementId', 'sectionId'],
  mixins: [colorMixin, elementMixin],
  components: {
    ElementCommon,
    TimerEditor
  },
  data () {
    return {
      timerElement: merge({}, this.element),
      resize: {
        handles: 'e'
      },
      editing: false,
      buttonGroup: 'main',
      constraints: {
        minWidth: 210
      }
    }
  },
  computed: {
    ...mapGetters({
      workspace: 'editorWorkspace'
    }),
    resizable: function () {
      return (!this.editing && this.workspace.activeElementId === this.elementId)
    },
    labelStyle: function () {
      return {
        color: this.color('labelColor')
      }
    },
    timerStyle: function () {
      return {
        color: this.color('numberColor'),
        backgroundColor: this.color('timerColor')
      }
    }
  },
  methods: {
    ...mapActions([
      'modifyElement',
      'setActiveElementId'
    ]),
    color (field) {
      return this.getColor(this.timerElement.data[field])
    },
    edit () {
      this.editing = true
      this.buttonGroup = 'edit'
    },
    editDone () {
      this.editing = false
      this.buttonGroup = 'main'
      if (!isEqual(this.element, this.timerElement)) {
        this.modifyElement([this.elementId, this.timerElement])
      }
    },
    editChange () {
    }
  }
}
</script>

<template>
<div class="element-wrapper">
  <element-common 
    :element="element" 
    :section-id="sectionId" 
    :element-id="elementId" 
    :button-group="buttonGroup" 
    :resize="resize" 
    :resizable="resizable" 
    :dimensionContraint="constraints" 
    @change-button-group="changeButtonGroup" 
    @change-draggable="changeDraggable">
    <div slot="content" class="element-countdown">
      <div class="element-countdown-content">
        <div class="countdown-item">
          <div class="timer-label" :style="labelStyle">日</div>
          <div class="timer-time" :style="timerStyle">00</div>
        </div>
        <div class="countdown-seperator">
          <div class="timer-label"></div>
          <div class="timer-seperator">:</div>
        </div>
        <div class="countdown-item">
          <div class="timer-label" :style="labelStyle">时</div>
          <div class="timer-time" :style="timerStyle">00</div>
        </div>
        <div class="countdown-seperator">
          <div class="timer-label"></div>
          <div class="timer-seperator">:</div>
        </div>
        <div class="countdown-item">
          <div class="timer-label" :style="labelStyle">分</div>
          <div class="timer-time" :style="timerStyle">00</div>
        </div>
        <div class="countdown-seperator">
          <div class="timer-label"></div>
          <div class="timer-seperator">:</div>
        </div>
        <div class="countdown-item">
          <div class="timer-label" :style="labelStyle">秒</div>
          <div class="timer-time" :style="timerStyle">00</div>
        </div>
      </div>
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click.stop="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-success"><span class="glyphicon glyphicon-ok"></span></div>
      </div>
    </template>
  </element-common>
  <timer-editor :show="editing" v-model="timerElement.data" @edit-done="editDone" @edit-change="editChange"></video-editor>
</div>
</template>

<style>
.element-countdown {
}
.element-countdown-content {
  display: flex;
  flex-direction: row;
}
.countdown-item {
  text-align: center;
  flex: 1;
}
.countdown-seperator {
  text-align: center;
  min-width: 18px;
  display: flex;
  flex-direction: column;
}
.timer-seperator {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}
.timer-label {
  display: block;
  height: 16px;
  margin-bottom: 8px;
}
.timer-time {
  background: #eee;
  font-size: 20px;
  padding: 8px;
  border-radius: 4px;
}
</style>