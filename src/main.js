import Vue from 'vue'
import App from './App.vue'

import VContextmenu from './index'
Vue.use(VContextmenu)

new Vue({
  el: '#app',
  render: h => h(App)
})
