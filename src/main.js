import '@/styles/main.scss';
import Vue from 'vue';
import { Plugin } from 'vue-fragment';
import vClickOutside from 'v-click-outside';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.prototype.$skin = 'VegasWinner';

Vue.use(Plugin);
Vue.use(vClickOutside);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
