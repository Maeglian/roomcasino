import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_HOST from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    countriesList: {},
    currencyList: {},
    token: localStorage.getItem('token') || '',
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
    user: {
      email: 'vasiapupkin@wakeapp.ru',
      country: 'RU',
      currency: 'USD',
      balance: 0,
    },
    currency: 'eur',
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    gamesLimited: (state) => (limit) => state.games.slice(0, limit),
    countriesNames: (state) => Object.values(state.countriesList),
    currencyNames: (state) => Object.values(state.currencyList),
  },

  mutations: {
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
    authSuccess(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    logout(state) {
      state.status = '';
      state.token = '';
    },
  },

  actions: {
    async getGames({ commit }, query) {
      commit('gamesAreLoading');
      try {
        // eslint-disable-next-line no-underscore-dangle
        const res = await axios.get(`https://games.netdnstrace1.com/?liveCasinoOnly=true&${query}`);
        commit('setGames', res.data);
      } catch (e) {
        commit('pushErrors', e);
      } finally {
        commit('gamesAreLoaded');
      }
    },
    async getJackpots({ commit }) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        const res = await axios.get('https://games.netdnstrace1.com/?daily_jackpot=true');
        commit('setJackpots', res.data);
      } catch (e) {
        commit('pushErrors', e);
      }
    },
    async registerUser({ commit }, payload) {
      commit('authRequest');
      try {
        // eslint-disable-next-line no-underscore-dangle
        await axios.post(`${API_HOST}/register`, payload);
      } catch (e) {
        commit('authError', e);
      }
    },

    async login({ commit }, payload) {
      commit('authRequest');
      try {
        const res = await axios.post(`${API_HOST}/login`, payload);
        if (res.data.code === 10002) commit('authError', res.data.message);
        else {
          const { token } = res.data;
          localStorage.setItem('token', token);
          axios.defaults.headers.common['X-Auth-Token'] = token;
          const user = await axios.get(`${API_HOST}/getProfile`);
          commit('authSuccess', token, user.data);
        }
      } catch (e) {
        commit('authError', e);
        localStorage.removeItem('token');
      }
    },

    async logout({ commit }) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        await axios.post(`${API_HOST}/logout`);
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['X-Auth-Token'];
      } catch (e) {
        commit('pushErrors', e);
      }
    },

    async getCountriesList({ commit }) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        const res = await axios.get(`${API_HOST}/countryList`);
        console.log(res.data.data.countryList);
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
  },
});
