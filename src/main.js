// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
import { api } from './utils/requtes'
Vue.use(new VueSocketio({
  connection: socketio(`${api}`)
}))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    Bus: new Vue(),
  },
})

