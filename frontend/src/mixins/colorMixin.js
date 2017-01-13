import { mapGetters } from 'vuex'
import Color, { getValidColor } from '../utils/color'

export default {
  computed: mapGetters({
    colorSet: 'editorColorSet'
  }),
  methods: {
    getColor (color) {
      if (color === '' || color === null) {
        return 'transparent'
      } else if (color.toString().substr(0, 1) === '#') {
        return color
      } else if (typeof color === 'number' || /^\d$/.test(color)) {
        return this.colorSet[color]
      } else {
        return getValidColor(Color(color))
      }
    }
  }
}
