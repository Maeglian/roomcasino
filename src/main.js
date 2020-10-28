import '@/styles/main.scss';
import Vue from 'vue';
import { Plugin } from 'vue-fragment';
import VModal from 'vue-js-modal';
import vClickOutside from 'v-click-outside';
import Vuelidate from 'vuelidate';
import Axios from 'axios';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');

if (token) {
  Vue.prototype.$http.defaults.headers.common['X-Auth-Token'] = token;
}

Vue.prototype.$skin = 'VegasWinner';
Vue.prototype.$http = Axios;

Vue.use(Plugin);
Vue.use(vClickOutside);
Vue.use(Vuelidate);
Vue.use(VModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
