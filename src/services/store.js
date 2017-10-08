import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const type2annotation = {
  swagger: '@SWG\\Swagger',
  info: '@SWG\\Info',
  contact: '@SWG\\Contact',
  license: '@SWG\\License',
  pathItem: '@SWG\\Path',
  operation: '@SWG\\Operation',
  parameter: '@SWG\\Parameter',
  response: '@SWG\\Response',
  schema: '@SWG\\Schema',
  header: '@SWG\\Header'
}
const store = new Vuex.Store({
  state: {
    specification: '',
    annotation: '',
    hover: {}
  },
  mutations: {
    setSpecification (state, specification) {
      state.specification = specification
      const type = specification.substr(0, specification.length - 'Object'.length)
      state.annotation = type2annotation[type]
    },
    setAnnotation (state, annotation) {
      state.annotation = annotation
    },
    setHover (state, explained) {
      state.hover = explained
    }
  }
})
window.addEventListener('hashchange', () => {
  store.commit('setSpecification', window.location.hash.substr(1))
})
store.commit('setSpecification', window.location.hash.substr(1))

export default store
