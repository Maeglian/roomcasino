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
    if (!context.store.state.siteIsAllowedForUser) context.redirect('/not-allowed');
  });
  if (context.route.query.cxd) localStorage.setItem('cxd', context.route.query.cxd);
  if (context.store.getters.isLoggedIn) {
    context.store.dispatch('getBonusHistoryList');
    context.store.dispatch('getProfile');
    context.store.dispatch('getLimits');
  }
  const updateWidth = throttle(() => context.store.commit('setWidth', window.innerWidth), 150);
  updateWidth();
  window.addEventListener('resize', updateWidth);
  context.store.dispatch('getDefaultGames');
  context.store.dispatch('getCountriesList');
  context.store.dispatch('getPhoneCodeList');
  context.store.dispatch('getCurrencyList');
  context.store.dispatch('getCategoriesList');
  context.store.dispatch('getGameProducerList');
});
