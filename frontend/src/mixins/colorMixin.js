import { mapGetters } from 'vuex'
import Color, { isValidColor, getValidColor } from '../utils/color'

export default {
  computed: mapGetters({
    colorSet: 'editorColorSet'
  }),
  methods: {
    getColor (color) {
      if (isValidColor(color)) {
        return color
      } else if (color === '' || color === null) {
        return 'transparent'
      } else if (typeof color === 'number' || /^\d$/.test(color)) {
        return this.colorSet[color]
      } else {
        return getValidColor(Color(color))
      }
    }
  }
}
