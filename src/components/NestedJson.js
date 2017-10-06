import JsonObject from './JsonObject'
import JsonArray from './JsonArray'

export default {
  name: 'NestedJson',
  props: ['json'],
  render (h) {
    if (Array.isArray(this.json)) {
      return h(JsonArray, { props: { array: this.json }, on: { hover: this.hover }})
    } else {
      return h(JsonObject, { props: { object: this.json }, on: { hover: this.hover }})
    }
  },
  methods: {
    hover (explanation) {
      this.$emit('hover', explanation)
    }
  }
}
