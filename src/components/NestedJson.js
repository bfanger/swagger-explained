import JsonObject from './JsonObject'
import JsonArray from './JsonArray'

export default {
  name: 'NestedJson',
  props: ['json'],
  render (h) {
    if (Array.isArray(this.json)) {
      return h(JsonArray, { props: { array: this.json }})
    } else {
      return h(JsonObject, { props: { object: this.json }})
    }
  }
}
