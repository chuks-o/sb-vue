require('dotenv').config()
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueAxios from 'axios'

/* Auth token pkg */
import Auth from './AuthPackage'
window.Auth = Auth

/* Vuex Store */
import { store } from './vuexstore/store'

Vue.use(Vuetify)

const axios = window.axios = VueAxios
axios.defaults.baseURL = 'http://localhost:8000/'

/*
* Axios request inteceptor
*/
axios.interceptors.request.use(function (config) {
  const token = Auth.getToken();

  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (err) {
  return Promise.reject(err);
});
/*
* End of inteceptor
*/


Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
