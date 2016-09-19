import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    colorSet: 'editorColorSet'
  }),
  methods: {
    getColor (color) {
      if (color === '' || color == null) {
        return ''
      } else if (color.toString().substr(0, 1) === '#') {
        return color
      } else {
        return this.colorSet[color]
      }
    }
  }
}
