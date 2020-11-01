import axios from 'axios';
import { BILLING_PROVIDER_ID, API_HOST_PROD, API_HOST_SANDBOX } from '../config';

const API_HOST = (process.env.NUXT_ENV_MODE === 'sandbox') ? API_HOST_SANDBOX : API_HOST_PROD;

const Cookie = process.client ? require('js-cookie') : undefined;
const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => ({
  status: '',
  countriesList: {},
  currencyList: {},
  shouldCashout: false,
  token: null,
  authError: '',
  navIsOpen: false,
  width: 0,
  games: [],
  jackpots: [],
  limits: [
    {
      name: 'Loss limits',
      limits: [
        {
          limitAmount: 5,
          currentPeriod: 'daily',
        },
        {
          limitAmount: 25,
          currentPeriod: 'weekly',
        },
      ],
    },
  ],
  gamesAreLoading: false,
  errors: {},
  user: {},
  currency: 'eur',
  billingSession: {},
  fakeBillingSession: {
    userId: '123',
    sessionId: '123',
    merchantId: '1000',
  },
});

export const getters = {
  activeAccount: (state) => {
    if (state.user.accountList) return state.user.accountList.find((acc) => acc.active === true);
    return {};
  },
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  gamesLimited: (state) => (limit) => state.games.slice(0, limit),
  countriesNames: (state) => Object.values(state.countriesList),
  currencyNames: (state) => Object.values(state.currencyList),
  userInfo: (state) => {
    const info = { ...state.user };
    const countryName = state.countriesList[info.country];
    info.country = countryName;
    delete info.accountList;
    return info;
  },
  curencyAccounts: (state) => Object.keys(state.currencyList).filter((cur) => {
    if (state.user.accountList) {
      return !state.user.accountList.some((acc) => acc.currency === cur);
    }
    return cur;
  }),
};

export const mutations = {
  openNav: (state) => {
    state.navIsOpen = true;
  },
  closeNav: (state) => {
    state.navIsOpen = false;
  },
  setWidth: (state, payload) => {
    state.width = payload;
  },
  gamesAreLoading: (state) => {
    state.gamesAreLoading = true;
  },
  gamesAreLoaded: (state) => {
    state.gamesAreLoading = false;
  },
  setGames: (state, payload) => {
    state.games = payload;
  },
  setCountriesList: (state, payload) => {
    state.countriesList = payload;
  },
  setCurrencyList: (state, payload) => {
    state.currencyList = payload;
  },
  pushErrors: (state, payload) => {
    state.errors = { ...state.errors, payload };
  },
  setJackpots: (state, payload) => {
    state.jackpots = payload;
  },
  addLimits: (state, payload) => {
    let limit = state.limits.find((lim) => lim.name === payload.name);
    if (!limit) {
      limit = {
        name: payload.name,
        limits: [],
      };
      state.limits.push(limit);
    }
    limit.limits.push(payload.content);
  },
  authRequest(state) {
    state.status = 'loading';
    state.authError = '';
  },
  authError(state, message) {
    state.status = 'error';
    state.authError = message;
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
  authSuccess(state) {
    state.status = 'success';
  },
  removeAuthError(state) {
    state.authError = '';
  },
  logout(state) {
    state.status = '';
    state.token = null;
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
      state.user.accountList.forEach((acc) => {
        if (acc.currency === currency) acc.active = true;
        else acc.active = false;
      });
    }
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    let token = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        token = parsed.token;
      } catch (e) {

      }
      commit('setToken', token);
    }
  },
  async getGames({ commit }, query = '') {
    commit('gamesAreLoading');
    try {
      // eslint-disable-next-line no-underscore-dangle
      // const res = await axios.get(`https://games.netdnstrace1.com/?liveCasinoOnly=true&${query}`);
      const res = await axios.get(`${API_HOST}/getGameList${query}`);
      commit('setGames', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    } finally {
      commit('gamesAreLoaded');
    }
  },
  async registerUser({ commit }, payload) {
    commit('authRequest');
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.post(`${API_HOST}/register`, payload);
      if (res.data.code === 10001) {
        commit('authError', res.data.message);
      }
    } catch (e) {
      commit('authError', e);
    }
  },

  async authorize({ state, commit, dispatch }, payload) {
    commit('authRequest');
    await dispatch('login', payload);
    if (!state.authError) await dispatch('getProfile');
    if (!state.authError) commit('authSuccess');
  },

  async login({ commit }, payload) {
    try {
      const res = await axios.post(`${API_HOST}/login`, payload);
      if (res.data.code === 10002) {
        commit('authError', res.data.message);
      } else {
        const { token } = res.data.data;
        commit('setToken', token);
        Cookie.set('token', token);
        axios.defaults.headers.common['X-Auth-Token'] = token;
      }
    } catch (e) {
      commit('authError', e);
      Cookie.remove('token');
    }
  },

  async getProfile({ commit }) {
    try {
      const res = await axios.get(`${API_HOST}/getProfile`);
      const user = res.data.data;
      commit('setUser', user);
    } catch (e) {
      commit('authError', e);
    }
  },

  async logout({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      await axios.post(`${API_HOST}/logout`);
      commit('logout');
      Cookie.remove('token');
      delete axios.defaults.headers.common['X-Auth-Token'];
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async getCountriesList({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`${API_HOST}/countryList`);
      commit('setCountriesList', res.data.data.countryList);
    } catch (e) {
      commit('pushErrors', e);
    }
  },
  async getCurrencyList({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.get(`${API_HOST}/currencyList`);
      commit('setCurrencyList', res.data.data.currencyList);
    } catch (e) {
      commit('pushErrors', e);
    }
  },
  async getBillingSession({ commit }) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const res = await axios.post(`${API_HOST}/getBillingSession`, {
        bpId: BILLING_PROVIDER_ID,
      });
      commit('setBillingSession', res.data.data);
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async startGame({ commit }, payload) {
    try {
      const res = await axios.post(`${API_HOST}/startGame`, payload);
      const { url } = res.data.data;
      const a = document.createElement('a');
      a.href = url;
      a.setAttribute('target', '_blank');
      a.click();
    } catch (e) {
      commit('pushErrors', e);
    }
  },

  async setActiveAccount({ commit }, payload) {
    try {
      const res = await axios.post(`${API_HOST}/setActiveAccount`, payload);
      commit('setActiveUserAccount', res.data.data.currency);
    } catch (e) {
      commit('pushErrors', e);
    }
  },
};

