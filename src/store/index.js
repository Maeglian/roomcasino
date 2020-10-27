import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_HOST from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },

  getters: {
    gamesLimited: (state) => (limit) => state.games.slice(0, limit),
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
    pushErrors: (state, payload) => {
      state.errors = { ...state.errors, payload };
    },
    setJackpots: (state, payload) => {
      state.jackpots = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
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
      try {
        // eslint-disable-next-line no-underscore-dangle
        const res = await axios.post(`${API_HOST}/register`, payload);
        commit('setUser', res.data);
      } catch (e) {
        commit('pushErrors', e);
      }
    },
  },
});
