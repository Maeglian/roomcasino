import detect from '@/utils/deviceDetector';
import { http } from '@/store';
import { throttle } from '@/utils/helpers';

window.onNuxtReady(({ context }) => {
  http.interceptors.response.use(
    undefined,
    err =>
      new Promise(() => {
        // eslint-disable-next-line no-underscore-dangle,max-len
        if (err === '401') {
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
      .dispatch('profile/getAvailableBonusList')
      .then(() => context.store.commit('setInitialLoadingLoggedIn', 'availableBonus'));
    context.store
      .dispatch('getProfile')
      .then(() => context.store.commit('setInitialLoadingLoggedIn', 'profile'));
    context.store
      .dispatch('profile/getLimits')
      .then(() => context.store.commit('setInitialLoadingLoggedIn', 'limits'));
    context.store.dispatch('profile/getFreeSpinList');
  } else {
    context.store.commit('setInitialLoadingLoggedIn', 'availableBonus');
    context.store.commit('setInitialLoadingLoggedIn', 'profile');
    context.store.commit('setInitialLoadingLoggedIn', 'limits');
  }
  const updateWidth = throttle(() => context.store.commit('setWidth', window.innerWidth), 150);
  updateWidth();
  window.addEventListener('resize', updateWidth);
  context.store
    .dispatch('games/getDefaultGames')
    .then(() => context.store.commit('setInitialLoading', 'defaultGames'));
  context.store.dispatch('games/getNewGames');
  context.store.dispatch('games/getLiveGames');
  context.store
    .dispatch('dictionary/getCountriesList')
    .then(() => context.store.commit('setInitialLoading', 'countries'));
  context.store
    .dispatch('dictionary/getPhoneCodeList')
    .then(() => context.store.commit('setInitialLoading', 'phones'));
  context.store
    .dispatch('dictionary/getCurrencyList')
    .then(() => context.store.commit('setInitialLoading', 'currency'));
  context.store.dispatch('dictionary/getCategoriesList');
  context.store
    .dispatch('games/getGameProducerList')
    .then(() => context.store.commit('setInitialLoading', 'producers'));
  context.store.dispatch('games/getTopWinnerList', { limit: 5 });
  context.store.dispatch('games/getLastWinnerList', { limit: 5 });
});
