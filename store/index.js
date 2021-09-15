import axios from 'axios';
import Vue from 'vue';
import { BILLING_PROVIDER_ID, API_HOST, DOMAIN } from '../config';

const Cookie = process.client ? require('js-cookie') : undefined;
const cookieparser = process.server ? require('cookieparser') : undefined;

const jsonInterceptor = [
  response => {
    if (response.headers['x-meta-count'])
      return { data: response.data.data, count: response.headers['x-meta-count'] };
    return response.data;
  },
  error => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.config &&
      // eslint-disable-next-line no-underscore-dangle
      !error.response.config.__isRetryRequest
    )
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('401');
    return Promise.reject(
      (error.response.data.data && error.response.data.data.message) || error.response.data.message,
    );
  },
];

function jsonClient() {
  const client = axios.create();
  client.interceptors.response.use(...jsonInterceptor);
  return client;
}

export const http = jsonClient();

export const state = () => ({
  status: '',
  authStatus: '',
  authError: '',
  token: null,
  profileIsLoading: false,
  user: {},
  siteIsAllowedForUser: true,
  defaultCountry: '',
  defaultCurrency: '',
  chatIsLoaded: false,
  showOverlay: false,
  initialLoadingIsDone: {
    geoInfo: false,
    countries: false,
    currency: false,
    phones: false,
    defaultGames: false,
    producers: false,
  },
  initialLoadingLoggedInIsDone: {
    profile: false,
    availableBonus: false,
    limits: false,
  },
  registrationWindowWasOpened: false,
  heroBannerIsLoaded: false,
  depositNum: 0,
  dga: {},
  platform: 'desktop',
  emailConfirmError: '',
  emailConfirmIsFetching: false,
  emailIsConfirmed: false,
  billingSessionIsLoading: false,
  getBillingSessionError: '',
  serverError: '',
  shouldCashout: false,
  navIsOpen: false,
  notificationsPanelIsOpen: false,
  notificationAlerts: [],
  showPleaseDepositModal: false,
  width: 0,
  errors: {},
  billingSession: {},
  notifications: {
    promotions: [
      {
        title: 'First deposit bonus',
        icon: 'bonus.png',
        text:
          '100% of the deposit amount. <strong>€100 <span class="Colored">+</span> 55 free spins!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'On your second deposit',
        icon: 'bonus.png',
        text:
          '55% of the deposit amount. <strong>€100 <span class="Colored">+</span> 100 free spins!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'Third deposit bonus',
        icon: 'bonus.png',
        text: '100% of the deposit amount.<br/> Up to <strong>€100!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'Thuesday free spins',
        icon: 'bonus-ball.png',
        text: 'Up to <strong>100 free spins</strong> every Tuesday!',
        btnText: 'Get bonus',
      },
      {
        title: 'Weekend reload',
        icon: 'bonus-weekend.png',
        text: '40% of the deposit amount.<br/> Up to <strong>€150!</strong>',
        btnText: 'Get bonus',
      },
      {
        title: 'Bonus for high rollers',
        icon: 'bonus-spades.png',
        text:
          '30% of the deposit amount.<br/> Up to <strong>€550</strong> on your first deposit of <strong>€300 </strong>',
        btnText: 'Get bonus',
      },
    ],
    notifications: [],
    tournaments: [
      {
        title: 'Weekly tournament',
        icon: 'bonus-cup.png',
        text: '<strong>€1000</strong> weekly prize fund for playing table games!',
        btnText: 'Learn more',
      },
      {
        title: 'Friday party',
        icon: 'bonus-diamond.png',
        text: '<strong>€500</strong> free spins up for grabs every 5 days!',
        btnText: 'Learn more',
      },
    ],
  },
  paymentsMethods: [
    {
      icon: 'visa',
      alt: 'visa',
      type: 'Credit Card',
      fee: '2.5%',
      progressTime: 'Instant',
      limits: 'Min $/€ 10 - Max $/€ 4,000',
    },
    {
      icon: 'bitcoin',
      alt: 'bitcoin',
      type: 'Online Currency',
      fee: 'Free',
      progressTime: '1-5 banking days',
      limits: 'Min. 0.001 BTC - Max. 10 BTC',
    },
    {
      icon: 'maestro',
      alt: 'maestro',
      type: 'Credit Card',
      fee: '2.5%',
      progressTime: 'Instant',
      limits: 'Min $/€ 10 - Max $/€ 4,000',
    },
    {
      icon: 'coinspaid',
      alt: 'coinspaid',
      type: 'Online Currency',
      fee: 'Free',
      progressTime: '1-3 banking days',
      limits: 'Min. 20 USDT - Max. 4,000 USDT',
    },
    {
      icon: 'skrill',
      alt: 'skrill',
      type: 'Credit Card',
      fee: '2.5%',
      progressTime: 'Instant',
      limits: 'Min $/€ 10 - Max $/€ 5,000',
    },
    {
      icon: 'maestro',
      alt: 'maestro',
      type: 'Credit Card',
      fee: '2.5%',
      progressTime: 'Instant',
      limits: 'Min $/€ 10 - Max $/€ 4,000',
    },
    {
      icon: 'coinspaid',
      alt: 'coinspaid',
      type: 'Online Currency',
      fee: 'Free',
      progressTime: '1-3 banking days',
      limits: 'Min. 20 USDT - Max. 4,000 USDT',
    },
  ],
});

export const getters = {
  minAge: state => {
    return state.defaultCountry === 'EE' ? 21 : 18;
  },
  initialLoading: state => {
    const initialLoading = !Object.values(state.initialLoadingIsDone).includes(false);
    if (state.token) {
      const initialLoadingLoggedIn = !Object.values(state.initialLoadingLoggedInIsDone).includes(
        false,
      );
      return initialLoading && initialLoadingLoggedIn;
    }

    return initialLoading;
  },
  activeCurrency: state => {
    if (state.user.accountList) return getters.activeAccount.currency;
    return {};
  },
  // eslint-disable-next-line no-shadow
  defaultCountry: (state, getters, rootState) => {
    return rootState.dictionary.countriesList.find(
      country => country.code === state.defaultCountry,
    );
  },
  activeAccount: state => {
    if (state.user.accountList) return state.user.accountList.find(acc => acc.active === true);
    return '';
  },
  sortedAccountList: state => {
    if (state.user.accountList)
      return [...state.user.accountList].sort((a, b) => b.balance - a.balance);
    return [];
  },
  otherAccountList: state => {
    if (state.user.accountList)
      return [...state.user.accountList]
        .filter(acc => !acc.active)
        .sort((a, b) => b.balance - a.balance);
    return [];
  },
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  // eslint-disable-next-line no-shadow
  userInfo: (state, getters, rootState) => {
    if (Object.keys(state.user).length) {
      const info = { ...state.user };
      info.country = rootState.dictionary.countriesList.find(
        country => country.code === info.country,
      );
      delete info.accountList;
      delete info.affiliateId;
      delete info.requirePasswordChange;
      return info;
    }

    return {};
  },
  currencyAccounts: state => {
    if (state.user.accountList) {
      return state.user.accountList.map(acc => ({
        name: acc.currency,
        value: acc.currency,
      }));
    }
    return [];
  },
  // eslint-disable-next-line no-shadow
  moreCurrencyAccounts: (state, getters, rootState) =>
    rootState.dictionary.currencyList.filter(cur => {
      if (state.user.accountList) {
        return !state.user.accountList.some(acc => acc.currency === cur);
      }
      return cur;
    }),
  isNewNotifications: state => !Object.values(state.notifications).every(arr => !arr.length),
};

export const mutations = {
  setRegistrationWindowWasOpened: (state, payload) => {
    state.registrationWindowWasOpened = payload;
  },
  setChatIsLoaded: state => {
    state.chatIsLoaded = true;
  },
  toggleOverlay: (state, payload) => {
    state.showOverlay = payload;
  },
  setHeroBannerIsLoaded: state => {
    state.heroBannerIsLoaded = true;
  },
  setInitialLoading: (state, field) => {
    state.initialLoadingIsDone[field] = true;
  },
  setInitialLoadingLoggedIn: (state, field) => {
    state.initialLoadingLoggedInIsDone[field] = true;
  },
  setProfileIsLoading(state, payload) {
    state.profileIsLoading = payload;
  },
  setDepositNum: (state, payload) => {
    state.depositNum = payload;
  },
  setDgaInfo: (state, { producer, game, data }) => {
    if (!state.dga[producer]) Vue.set(state.dga, producer, {});
    Vue.set(state.dga[producer], game, data);
  },
  setPlatform: (state, payload) => {
    state.platform = payload;
  },
  setEmailConfirmIsDone: state => {
    state.emailConfirmIsFetching = false;
  },
  setEmailConfirmIsFetching: state => {
    state.emailConfirmIsFetching = true;
  },
  setEmailIsConfirmed: state => {
    state.emailIsConfirmed = true;
  },
  clearEmailIsConfirmed: state => {
    state.emailIsConfirmed = false;
  },
  setEmailConfirmError: (state, payload) => {
    state.emailConfirmError = payload;
  },
  clearEmailConfirmError: state => {
    state.emailConfirmError = '';
  },
  setShowPleaseDepositModal: (state, payload) => {
    state.showPleaseDepositModal = payload;
  },
  setSiteIsAllowedForUser: (state, payload) => {
    state.siteIsAllowedForUser = payload;
  },
  setDefaultCountry: (state, payload) => {
    state.defaultCountry = payload;
  },
  setDefaultCurrency: (state, payload) => {
    state.defaultCurrency = payload;
  },
  setBillingSessionIsLoading: (state, payload) => {
    state.billingSessionIsLoading = payload;
  },
  setGetBillingSessionError: (state, message) => {
    state.billingSessionIsLoading = message;
  },
  setServerError: (state, message) => {
    state.serverError = message;
  },
  openNav: state => {
    state.navIsOpen = true;
  },
  closeNav: state => {
    state.navIsOpen = false;
  },
  openNotificationsPanel: state => {
    state.notificationsPanelIsOpen = true;
  },
  closeNotificationsPanel: state => {
    state.notificationsPanelIsOpen = false;
  },
  setWidth: (state, payload) => {
    state.width = payload;
  },
  pushErrors: (state, payload) => {
    state.errors = { ...state.errors, payload };
  },
  setAuthRequest(state) {
    state.authStatus = 'loading';
    state.authError = '';
  },
  setAuthError(state, message) {
    state.authStatus = 'error';
    state.authError = message;
  },
  setAuthSuccess(state) {
    state.authStatus = 'success';
    state.authError = '';
  },
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
  setBillingSession(state, payload) {
    state.billingSession = payload;
  },
  removeAuthError(state) {
    state.authError = '';
  },
  logout(state) {
    state.authStatus = '';
    state.token = null;
    state.user = {};
    state.depositNum = 0;
    state.emailIsConfirmed = false;
  },
  setCashoutTrue(state) {
    state.shouldCashout = true;
  },
  setCashoutFalse(state) {
    state.shouldCashout = false;
  },
  updateBalance(state, payload) {
    state.user.balance += Number(payload);
  },
  setActiveUserAccount(state, currency) {
    if (state.user.accountList) {
      state.user.accountList.forEach(acc => {
        acc.active = acc.currency === currency;
      });
    }
  },
  pushNotificationAlert(state, payload) {
    state.notificationAlerts.push(payload);
  },
  deleteNotificationAlert(state, idx) {
    state.notificationAlerts.splice(idx, 1);
  },
  clearNotificationAlerts(state) {
    state.notificationAlerts = [];
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (process.env.NUXT_ENV_MODE !== 'sandbox' && process.env.NUXT_ENV_MODE !== 'stage') {
      let token = null;
      if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie);
        try {
          // eslint-disable-next-line prefer-destructuring
          token = parsed.token;
          // eslint-disable-next-line no-empty
        } catch (e) {}
        if (token) {
          http.defaults.headers.common['X-Auth-Token'] = token;
          commit('setToken', token);
          commit('setAuthSuccess');
        }
      }
    }
    // await dispatch('games/getDefaultGames').then(() => commit('setInitialLoading', 'defaultGames'));
    // await dispatch('games/getGameProducerList').then(() =>
    //   commit('setInitialLoading', 'producers'),
    // );
    // await dispatch('games/getTopGames');
    // await dispatch('games/getNewGames');
    // await dispatch('games/getLiveGames');
    // await dispatch('games/getJackpotGames');
    // await dispatch('games/getBuybonusGames');
    // await dispatch('games/getMegawaysGames');
    // await dispatch('games/getLuckychoiceGames');
    // await dispatch('games/getDropsWinsSlotsGames');
  },

  async registerUser({ commit, dispatch }, payload) {
    commit('setAuthRequest');
    try {
      const res = await http.post(`${API_HOST}/register`, payload);
      if (res.code === 0) {
        commit('setAuthSuccess');
        const { token } = res.data;
        commit('setToken', token);
        Cookie.set('token', token);
        Cookie.set('token', token, { domain: `.${DOMAIN}` });
        http.defaults.headers.common['X-Auth-Token'] = token;
        dispatch('antifrod/getPixel');
        dispatch('antifrod/sendLocaleStorageId');
        dispatch('getProfile');
        dispatch('profile/getAvailableBonusList');
      } else commit('setAuthError', res.message);
    } catch (e) {
      commit('setAuthError', e);
      this.$sentry.captureException(new Error(e));
      Cookie.remove('token');
    }
  },

  async authorize({ state, commit, dispatch }, payload) {
    commit('setAuthRequest');
    await dispatch('login', payload);
    if (!state.authError) {
      await dispatch('getProfile');
      await dispatch('profile/getFreeSpinList');
      dispatch('profile/getLimits');
      dispatch('profile/getAvailableBonusList');
      commit('setAuthSuccess');
    }
  },

  async login({ commit, dispatch }, payload) {
    try {
      const res = await http.post(`${API_HOST}/login`, payload);
      if (res.code === 0) {
        const { token } = res.data;
        commit('setToken', token);
        Cookie.set('token', token);
        Cookie.set('token', token, { domain: `.${DOMAIN}` });
        http.defaults.headers.common['X-Auth-Token'] = token;
        dispatch('antifrod/getPixel');
        dispatch('antifrod/sendLocaleStorageId');
      } else commit('setAuthError', res.message);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
      Cookie.remove('token');
    }
  },

  async getProfile({ commit }) {
    commit('setProfileIsLoading', true);
    try {
      const res = await http.get(`${API_HOST}/profile`);
      const user = res.data;
      commit('setUser', user);
    } catch (e) {
      commit('setAuthError', e);
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setProfileIsLoading', false);
    }
  },

  async logout({ commit }, isAuthError = false) {
    try {
      if (!isAuthError) await http.post(`${API_HOST}/logout`);
      commit('logout');
      commit('games/setRecentGames', [], { root: true });
      commit('profile/setLimits', [], { root: true });
      commit('profile/setFreeSpinList', [], { root: true });
      commit('profile/setAvailableBonusList', [], { root: true });
      commit('profile/setBonusList', [], { root: true });
      commit('profile/setUserDocumentList', [], { root: true });
      commit('profile/setTransactionHistoryList', [], { root: true });
      commit('profile/setGameHistoryList', [], { root: true });
      commit('profile/setBonusHistoryList', [], { root: true });
      commit('profile/setSessionHistoryList', [], { root: true });
      Cookie.remove('token');
      delete http.defaults.headers.common['X-Auth-Token'];
      commit('clearNotificationAlerts');
      this.$router.push(this.$i18n.localePath('/'));
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },

  async getBillingSession({ state, commit }) {
    if (state.getBillingSessionError) commit('setGetBillingSessionError', '');
    commit('setBillingSessionIsLoading', true);
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await http.post(`${API_HOST}/billingSession`, {
        bpId: BILLING_PROVIDER_ID,
      });
      commit('setBillingSession', res.data);
    } catch (e) {
      commit('setGetBillingSessionError', e);
      this.$sentry.captureException(new Error(e));
      throw e;
    } finally {
      commit('setBillingSessionIsLoading', false);
    }
  },

  async confirmEmail({ state, commit }, payload) {
    if (state.emailConfirmError) commit('setEmailConfirmError', '');
    commit('setEmailConfirmIsFetching');
    try {
      await http.put(`${API_HOST}/emailConfirm`, payload);
      commit('setEmailIsConfirmed');
    } catch (e) {
      commit('setEmailConfirmError', e);
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setEmailConfirmIsDone');
    }
  },

  async getGeoInfo({ commit }) {
    try {
      const res = await http.get(`${API_HOST}/geoInfo`);
      commit('setSiteIsAllowedForUser', res.data.allowed);
      commit('setDefaultCountry', res.data.country);
      commit('setDefaultCurrency', res.data.currency);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },
};
