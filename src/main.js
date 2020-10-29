import '@/styles/main.scss';
import Vue from 'vue';
import { Plugin } from 'vue-fragment';
import VModal from 'vue-js-modal';
import vClickOutside from 'v-click-outside';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import App from './App.vue';
import store from './store';
import router from './router';

const token = localStorage.getItem('token');

if (token) {
  axios.defaults.headers.common['X-Auth-Token'] = token;
}

Vue.prototype.$wlSlug = 'roomcasino';

Vue.use(Plugin);
Vue.use(vClickOutside);
Vue.use(Vuelidate);
Vue.use(VModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
