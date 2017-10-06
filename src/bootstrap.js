import Vue from 'vue'
import App from './components/App'
import NestedJson from './components/NestedJson'

Vue.config.productionTip = false
Vue.component('nested-json', NestedJson)
const vm = new Vue(App)
document.body.append(vm.$mount().$el)
