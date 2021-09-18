import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import lazyload from 'vue-lazyload'

import toast  from 'components/common/toast'
Vue.config.productionTip = false
Vue.use(toast)
Vue.use(lazyload,{
  loading:require('assets/img/common/loading.jpg')
})

FastClick.attach(document.body)  

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  },
  router,
  store
}).$mount('#app')
