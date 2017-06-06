import { mapGetters } from 'vuex'
import { isValidColor, getValidColor } from 'utils/color'

export default {
  computed: mapGetters({
    colorSet: 'editorColorSet'
  }),
  methods: {
    getColor (color) {
      if (isValidColor(color) || color == null) {
        return color
      } else if (color === '') {
        return 'transparent'
      } else if (typeof color === 'number' || /^\d$/.test(color)) {
        return this.colorSet[color]
      } else {
        return getValidColor(color)
      }
    }
  }
}
