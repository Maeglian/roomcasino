import axios from 'axios';
import { throttle } from '../utils/helpers';

window.onNuxtReady(app => {
  if (app.$route.query.cxd) localStorage.setItem('cxd', app.$route.query.cxd);
  if (app.$store.getters.isLoggedIn) {
    app.$store.dispatch('getProfile');
    app.$store.dispatch('getLimits');
  }
  const updateWidth = throttle(() => app.$store.commit('setWidth', window.innerWidth), 150);
  updateWidth();
  window.addEventListener('resize', updateWidth);
  axios.interceptors.response.use(
    undefined,
    err =>
      new Promise(() => {
        // eslint-disable-next-line no-underscore-dangle,max-len
        if (
          err.response.status === 401 &&
          err.response.config &&
          // eslint-disable-next-line no-underscore-dangle
          !err.response.config.__isRetryRequest
        ) {
          app.$store.dispatch('logout', true);
        }
        throw err;
      }),
  );
  app.$store.dispatch('getCountriesList');
  app.$store.dispatch('getCurrencyList');
  app.$store.dispatch('getCategoriesList');
  app.$store.dispatch('getGameProducerList');
});
