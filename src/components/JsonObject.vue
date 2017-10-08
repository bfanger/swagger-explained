<template>
  <div class="json-object" :class="{'json-object--explained': object._explained, 'json-object--hovering': hovering}" @mousemove="mousemove" @mouseleave="mouseleave" @click="click">
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
        <nested-json :json="object[property]" />
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
import { mapMutations } from 'vuex'
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
    ...mapMutations(['setHover', 'setAnnotation']),
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
    mousemove (e) {
      if (!this.object._explained) {
        return
      }
      this.hovering = this.eventForMe(e)
      if (this.hovering) {
        this.setHover({
          ...this.object._explained,
          top: (this.$el.offsetTop) + 'px',
          left: (this.$el.offsetLeft) + 'px'
        })
      }
    },
    mouseleave (e) {
      if (this.hovering) {
        this.hovering = false
        this.setHover({})
      }
    },
    click (e) {
      if (this.object._explained && this.eventForMe(e)) {
        window.location.hash = this.object._explained.specification
        setTimeout(() => {
          this.setAnnotation(this.object._explained.annotation)
        })
      }
    },
    eventForMe (e) {
      let element = e.target
      while (element) {
        if (element.classList.contains('json-object')) {
          if (element === this.$el) {
            return true
          }
          return false
        }
        element = element.parentElement
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
  cursor: pointer;
}

.json-object--hovering {
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
</style>
