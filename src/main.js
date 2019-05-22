// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import './theme/index.less'
import axios from 'axios'
import store from './store'
import vc from 'vue-cookie'
import moment from 'moment'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.use(iView)
Vue.use(vc)
axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.filter('time', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')