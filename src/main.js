// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import VueFormWizard from 'vue-form-wizard'
import VeeValidate from 'vee-validate';
import Vuelidate from 'vuelidate';
import VueGoodTablePlugin from 'vue-good-table';

// router setup
import routes from './routes/routes'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/NotificationPlugin'

// MaterialDashboard plugin
import MaterialDashboard from './material-dashboard'

import 'vue-good-table/dist/vue-good-table.css'

import Chartist from 'chartist'
 


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: 'nav-item active'
})

Vue.use(VueRouter)
Vue.use(VueFormWizard);
Vue.use(MaterialDashboard)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(VeeValidate)
Vue.use(Vuelidate)
Vue.use(VueGoodTablePlugin);


// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
})
