import Vue from 'vue'
import App from './App.vue'

import Vuelidate from 'vuelidate'

import store from './store/index'
import router from './routes/index'
import './assets/tailwind.css'

const isProd = process.env.NODE_ENV === 'production'

Vue.config.devtools      = isProd ? false : true
Vue.config.productionTip = isProd ? false : true
Vue.config.silent        = isProd ? true  : false
Vue.config.debug         = isProd ? false : true

Vue.use(Vuelidate)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
