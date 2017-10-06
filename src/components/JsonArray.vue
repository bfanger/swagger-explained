<template>
  <div class="json-array">
    <div v-for="(value, index) in array" :key="index">
      <div class="json-array__property">
        <span v-if="valueType(value) === 'object'">{</span>
        <span v-else-if="valueType(value) === 'array'">[</span>
        <JsonValue v-else :value="value" />
        <span v-if="hasNestedValues(value) === false &&index + 1 !== array.length">,</span>
      </div>
      <div v-if="hasNestedValues(value)">
        <nested-json :json="value" @hover="$emit('hover', $event)" />
        <div>
          <span v-if="valueType(value) === 'object'">}</span>
          <span v-else>]</span>
          <span v-if="index + 1 !== array.length">,</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JsonValue from './JsonValue'

export default {
  name: 'JsonArray',
  props: {
    array: Array
  },
  components: { JsonValue },
  methods: {
    valueType (value) {
      if (value === null) {
        return 'null'
      }
      if (Array.isArray(value)) {
        return 'array'
      }
      return typeof value
    },
    hasNestedValues (value) {
      if (value === null) {
        return false
      }
      if (typeof value === 'object') {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss">
.json-array {
  padding-left: 1.2em;
}
</style>
