<template>
  <div class="btn-group" v-bind:class="{open:show}">
    <slot></slot>
    <slot name="dropdown-menu"></slot>
  </div>
</template>
<script>
  import eventHandler from '../utils/eventHandler'
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay: true
      }
    },
    methods: {
      toggleDropdown(e) {
        e.preventDefault()
        this.show = !this.show
      }
    },
    ready() {
      const el = this.$el
      const toggle = el.querySelector('[data-toggle="dropdown"]')
      if (toggle)
      {
        // toggle.style.borderRadius = '4px'
        toggle.addEventListener('click', this.toggleDropdown)
      }
      this._closeEvent = eventHandler.listen(window, 'click', (e)=> {
        if (!el.contains(e.target) || e.target.nodeName.toLowerCase() == 'a') this.show = false
      })
    },
    beforeDestroy() {
      if (this._closeEvent) this._closeEvent.remove()
    }
  }
</script>
