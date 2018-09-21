import Vue from 'vue'
import Vuetify from 'vuetify'

import router from './router'
import store from './store'

import App from './App'

import 'vuetify/dist/vuetify.min.css'
// Shared components
import MainLayout from './components/shared/layouts/MainLayout'
import LoginLayout from './components/shared/layouts/LoginLayout'
import StLoading from './components/shared/Loading'
import StMessage from './components/shared/Message'
import StatusLabel from './components/shared/StatusLabel'
import VueCookies from 'vue-cookies'

// Shared components registration
Vue.component('main-layout', MainLayout);
Vue.component('login-layout', LoginLayout);
Vue.component('st-loading', StLoading);
Vue.component('st-message', StMessage);
Vue.component('st-status', StatusLabel);

Vue.config.productionTip = false;

Vue.use(VueCookies);

Vue.use(Vuetify, {
  theme: {
    primary: '#3F51B5',
    secondary: '#E7A8B9',
    accent: '#AF9ADB',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
