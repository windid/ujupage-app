import { getColorSet } from '../store/getters'

export default {
  vuex: {
    getters: {
      colorSet: getColorSet
    }
  },
  methods: {
    getColor: function(color){
      if (color === "" || color == null){
        return "";
      } else if (color.toString().substr(0,1) === "#"){
        return color;
      } else {
        return this.colorSet[color];
      }
    }
  }
}