import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navIsOpen: false,
    width: 0,
    games: [],
    jackpots: [],
    gamesAreLoading: false,
    errors: {},
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
  },
});
