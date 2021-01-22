import Vue from 'vue'
import App from './App'
import Fly from 'flyio/dist/npm/wx'
import mixin from './mixins/mixin'
Vue.config.productionTip = false
App.mpType = 'app'
let fly = new Fly()
fly.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  config.headers['X-Tag'] = 'flyio'
  return config
})
fly.config.baseURL = 'http://192.168.0.103:5001'

Vue.prototype.$http = fly

const app = new Vue(App)
app.$mount()
Vue.mixin(mixin)
