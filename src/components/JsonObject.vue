<template>
  <div class="json-object" :class="{'json-object--explained': object._explained, 'json-object--hovering': hovering}" @mousemove="mousemove" @mouseleave="mouseleave">
    <div v-for="(property, index) in properties" :key="property">
      <div class="json-object__property">
        <span class="json-object__property-name">{{JSON.stringify(property)}}</span>
        <span class="json-object__double-colon">:</span>
        <span v-if="propertyType(property) === 'object'">{</span>
        <span v-else-if="propertyType(property) === 'array'">[</span>
        <JsonValue v-else :value="object[property]" />
        <span v-if="hasNestedValues(property) === false &&index + 1 !== properties.length">,</span>
      </div>
      <div v-if="hasNestedValues(property)">
        <nested-json :json="object[property]" @hover="hover" />
        <div>
          <span v-if="propertyType(property) === 'object'">}</span>
          <span v-else>]</span>
          <span v-if="index + 1 !== properties.length">,</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JsonValue from './JsonValue'
export default {
  name: 'JsonObject',
  props: {
    object: Object
  },
  data: () => ({
    hovering: false
  }),
  components: { JsonValue },
  computed: {
    properties () {
      return Object.keys(this.object).filter(property => property !== '_explained')
    }
  },
  methods: {
    propertyType (property) {
      const value = this.object[property]
      if (value === null) {
        return 'null'
      }
      if (Array.isArray(value)) {
        return 'array'
      }
      return typeof value
    },
    hasNestedValues (property) {
      if (this.object[property] === null) {
        return false
      }
      if (typeof this.object[property] === 'object') {
        return true
      }
      return false
    },
    hover (explained) {
      if (this.hovering) {
        this.hovering = false
      }
      this.$emit('hover', explained)
    },
    mousemove (e) {
      let element = e.target
      while (element) {
        if (element.classList.contains('json-object')) {
          if (element === this.$el && !this.hovering) {
            this.hovering = true
            this.$emit('hover', this.object._explained)
          }
          break
        }
        element = element.parentElement
      }
    },
    mouseleave (e) {
      if (this.hovering) {
        this.hovering = false
      }
    }
  }
}
</script>

<style lang="scss">
.json-object {
  margin-left: 1.2em;
}

.json-object--explained {
  background: rgba(#bbf, 0.05);
  cursor: help;
}

.json-object--hovering {
  background: rgba(#fff, 0.07);
  outline: 1px dotted #ccc;
}

.json-object__property {
  display: flex;
}

.json-object__property-name {
  color: #cc6666;
}

.json-object__double-colon {
  padding-right: .5em;
}

// // .json--hover {
// //     background: rgba(white, 0.08);
// //     outline: 1px solid rgba(black, 0.08);
// //     cursor: help;
// // }
// // .json--active {
// //     background: #342848;
// //     outline: 1px dotted rgba(white, 0.4);
// //     cursor: help;
// }
</style>
