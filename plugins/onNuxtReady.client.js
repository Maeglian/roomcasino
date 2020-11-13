import axios from 'axios';
import { throttle } from './../utils/helpers'

window.onNuxtReady((app) => {
  console.log(app.$store);
  const updateWidth = throttle(() => app.$store.commit('setWidth', window.innerWidth), 150);
  updateWidth();
  window.addEventListener('resize', updateWidth);
  axios.interceptors.response.use(undefined, (err) => new Promise(() => {
    // eslint-disable-next-line no-underscore-dangle,max-len
    if (err.response.status === 401 && err.response.config && !err.response.config.__isRetryRequest) {
      this.$store.dispatch('logout', true);
    }
    throw err;
  }));
  app.$store.dispatch('getCountriesList');
  app.$store.dispatch('getCurrencyList');
  if (app.$store.getters.isLoggedIn) {
    axios.defaults.headers.common['X-Auth-Token'] = app.$store.state.token;
    app.$store.dispatch('getProfile');
  }
  app.$store.dispatch('getGames');
});
