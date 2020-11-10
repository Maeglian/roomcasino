import axios from 'axios';

window.onNuxtReady((app) => {
  console.log(app.$store);
  const updateWidth = () => {
    app.$store.commit('setWidth', window.innerWidth);
  };
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
});
