import '@/styles/main.scss';
import Vue from 'vue';
import { Plugin } from 'vue-fragment';
import VModal from 'vue-js-modal';
import vClickOutside from 'v-click-outside';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.prototype.$skin = 'VegasWinner';

Vue.use(Plugin);
Vue.use(vClickOutside);
Vue.use(Vuelidate);
Vue.use(VModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
