import axios from 'axios';
import detect from '@/utils/deviceDetector';
import { throttle } from '../utils/helpers';

window.onNuxtReady(({ context }) => {
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
          context.store.dispatch('logout', true);
        }
        throw err;
      }),
  );

  const platform = detect.mobile() || detect.tablet() || detect.phone() ? 'mobile' : 'desktop';
  context.store.commit('setPlatform', platform);
  context.store.dispatch('getGeoInfo').then(() => {
    context.store.commit('setInitialLoading', 'geoInfo');
    if (!context.store.state.siteIsAllowedForUser) context.redirect('/not-allowed');
  });
  if (context.route.query.cxd) localStorage.setItem('cxd', context.route.query.cxd);
  if (context.store.getters.isLoggedIn) {
    context.store
      .dispatch('getAvailableBonusList')
      .then(() => context.store.commit('setInitialLoadingLoggedIn', 'availableBonus'));
    context.store
      .dispatch('getProfile')
      .then(() => context.store.commit('setInitialLoadingLoggedIn', 'profile'));
    context.store
      .dispatch('getLimits')
      .then(() => context.store.commit('setInitialLoadingLoggedIn', 'limits'));
  } else {
    context.store.commit('setInitialLoadingLoggedIn', 'availableBonus');
    context.store.commit('setInitialLoadingLoggedIn', 'profile');
    context.store.commit('setInitialLoadingLoggedIn', 'limits');
  }
  const updateWidth = throttle(() => context.store.commit('setWidth', window.innerWidth), 150);
  updateWidth();
  window.addEventListener('resize', updateWidth);
  context.store
    .dispatch('getDefaultGames')
    .then(() => context.store.commit('setInitialLoading', 'defaultGames'));
  context.store.dispatch('getNewGames');
  context.store.dispatch('getLiveGames');
  context.store
    .dispatch('getCountriesList')
    .then(() => context.store.commit('setInitialLoading', 'countries'));
  context.store
    .dispatch('getPhoneCodeList')
    .then(() => context.store.commit('setInitialLoading', 'phones'));
  context.store
    .dispatch('getCurrencyList')
    .then(() => context.store.commit('setInitialLoading', 'currency'));
  context.store.dispatch('getCategoriesList');
  context.store
    .dispatch('getGameProducerList')
    .then(() => context.store.commit('setInitialLoading', 'producers'));
});
