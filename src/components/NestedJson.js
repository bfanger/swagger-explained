import JsonObject from "./JsonObject.vue";
import JsonArray from "./JsonArray.vue";

export default {
  name: "NestedJson",
  props: ["json"],
  render(h) {
    if (Array.isArray(this.json)) {
      return h(JsonArray, { props: { array: this.json } });
    } else {
      return h(JsonObject, { props: { object: this.json } });
    }
  }
};
