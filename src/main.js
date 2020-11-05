import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CxltToastr from 'cxlt-vue2-toastr'

const toastrConfigs = {
  position: 'top center',
  showDuration: 1500,
  timeOut: 3500,
  progressBar: true,
  showMethod: 'rubberBand',
  hideMethod: 'bounceOut',
}

Vue.config.productionTip = false
Vue.use(CxltToastr, toastrConfigs)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
