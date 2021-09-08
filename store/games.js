import { API_HOST } from '@/config';
import { http } from './index';

export const state = () => ({
  gameToStart: null,
  games: [],
  recentGames: [],
  defaultGames: [],
  newGames: [],
  topGames: [],
  liveGames: [],
  jackpotGames: [],
  buybonusGames: [],
  megawaysGames: [],
  luckychoiceGames: [],
  dropsWinsSlotsGames: [],
  dropsWinsLiveGames: [],
  gamesAreLoading: false,
  defaultGamesAreLoading: false,
  newGamesAreLoading: false,
  topGamesAreLoading: false,
  liveGamesAreLoading: false,
  jackpotGamesAreLoading: false,
  buybonusGamesAreLoading: false,
  megawaysGamesAreLoading: false,
  luckychoiceGamesAreLoading: false,
  dropsWinsSlotsGamesAreLoading: false,
  dropsWinsLiveGamesAreLoading: false,
  winnersAreLoading: false,
  gameProducers: [],
  gameUrl: '',
  gameHtml: '',
  gameError: '',
  topWinnerList: [],
  lastWinnerList: [],
  topWinnerListIsLoading: false,
  lastWinnerListIsLoading: false,
  topWinnerListError: '',
  lastWinnerListError: '',
});

export const getters = {
  gamesLimited: state => limit => state.games.slice(0, limit),
  gamesSearched: state => text => {
    return state.defaultGames.filter(game => {
      const str = text.trim().toLowerCase();
      const title = game.gameName.toLowerCase();
      return title.includes(str);
    });
  },
};

export const mutations = {
  setStartingGame: (state, { url, html }) => {
    if (url !== null) state.gameUrl = url;
    if (html !== null) state.gameHtml = html;
  },
  setGameToStart: (state, payload) => {
    state.gameToStart = payload;
  },
  setGameError: (state, message) => {
    state.gameError = message;
  },
  setGameProducerList: (state, payload) => {
    state.gameProducers = payload;
  },
  setGamesAreLoading: (state, payload) => {
    state.gamesAreLoading = payload;
  },
  setDefaultGamesAreLoading: (state, payload) => {
    state.defaultGamesAreLoading = payload;
  },
  setLiveGamesAreLoading: (state, payload) => {
    state.liveGamesAreLoading = payload;
  },
  setTopGamesAreLoading: (state, payload) => {
    state.topGamesAreLoading = payload;
  },
  setNewGamesAreLoading: (state, payload) => {
    state.newGamesAreLoading = payload;
  },
  setJackpotGamesAreLoading: (state, payload) => {
    state.jackpotGamesAreLoading = payload;
  },
  setBuybonusGamesAreLoading: (state, payload) => {
    state.buybonusGamesAreLoading = payload;
  },
  setMegawaysGamesAreLoading: (state, payload) => {
    state.megawaysGamesAreLoading = payload;
  },
  setLuckychoiceGamesAreLoading: (state, payload) => {
    state.luckychoiceGamesAreLoading = payload;
  },
  setDropsWinsSlotsGamesAreLoading: (state, payload) => {
    state.dropsWinsSlotsGamesAreLoading = payload;
  },
  setDropsWinsLiveGamesAreLoading: (state, payload) => {
    state.dropsWinsLiveGamesAreLoading = payload;
  },
  setGames: (state, payload) => {
    state.games = payload;
  },
  setRecentGames: (state, payload) => {
    state.recentGames = payload;
  },
  setNewGames: (state, payload) => {
    state.newGames = payload;
  },
  setTopGames: (state, payload) => {
    state.topGames = payload;
  },
  setLiveGames: (state, payload) => {
    state.liveGames = payload;
  },
  setJackpotGames: (state, payload) => {
    state.jackpotGames = payload;
  },
  setBuybonusGames: (state, payload) => {
    state.buybonusGames = payload;
  },
  setMegawaysGames: (state, payload) => {
    state.megawaysGames = payload;
  },
  setLuckychoiceGames: (state, payload) => {
    state.luckychoiceGames = payload;
  },
  setDropsWinsSlotsGames: (state, payload) => {
    state.dropsWinsSlotsGames = payload;
  },
  setDropsWinsLiveGames: (state, payload) => {
    state.dropsWinsLiveGames = payload;
  },
  setDefaultGames: (state, payload) => {
    state.defaultGames = payload;
  },
  setTopWinnerList(state, payload) {
    state.topWinnerList = payload;
  },
  setLastWinnerList(state, payload) {
    state.lastWinnerList = payload;
  },
  setTopWinnerListIsLoading(state, payload) {
    state.topWinnerListIsLoading = payload;
  },
  setLastWinnerListIsLoading(state, payload) {
    state.lastWinnerListIsLoading = payload;
  },
  setTopWinnerListError(state, payload) {
    state.topWinnerListError = payload;
  },
  setLastWinnerListError(state, payload) {
    state.lastWinnerListError = payload;
  },
};

export const actions = {
  async getGames({ commit, rootState }, payload = {}) {
    commit('setGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { ...payload, platform: rootState.platform },
      });
      commit('setGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setGamesAreLoading', false);
    }
  },

  async getTopGames({ commit, rootState }) {
    commit('setTopGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'top', platform: rootState.platform },
      });
      commit('setTopGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setTopGamesAreLoading', false);
    }
  },

  async getNewGames({ commit, rootState }) {
    commit('setNewGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'new', platform: rootState.platform },
      });
      commit('setNewGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setNewGamesAreLoading', false);
    }
  },

  async getLiveGames({ commit, rootState }) {
    commit('setLiveGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'live', platform: rootState.platform },
      });
      commit('setLiveGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setLiveGamesAreLoading', false);
    }
  },

  async getRecentGames({ commit, rootState }, payload = {}) {
    commit('setGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { ...payload, recent: 1, platform: rootState.platform },
      });
      commit('setRecentGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setGamesAreLoading', false);
    }
  },

  async getJackpotGames({ commit, rootState }) {
    commit('setJackpotGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'jackpots', platform: rootState.platform },
      });
      commit('setJackpotGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setJackpotGamesAreLoading', false);
    }
  },

  async getBuybonusGames({ commit, rootState }) {
    commit('setBuybonusGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'buybonus', platform: rootState.platform },
      });
      commit('setBuybonusGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setBuybonusGamesAreLoading', false);
    }
  },

  async getMegawaysGames({ commit, rootState }) {
    commit('setMegawaysGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'megaways', platform: rootState.platform },
      });
      commit('setMegawaysGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setMegawaysGamesAreLoading', false);
    }
  },

  async getLuckychoiceGames({ commit, rootState }) {
    commit('setLuckychoiceGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'luckychoice', platform: rootState.platform },
      });
      commit('setLuckychoiceGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setLuckychoiceGamesAreLoading', false);
    }
  },

  async getDropsWinsSlotsGames({ commit, rootState }) {
    commit('setDropsWinsSlotsGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'DROP&WINS', platform: rootState.platform },
      });
      commit('setDropsWinsSlotsGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setDropsWinsSlotsGamesAreLoading', false);
    }
  },

  async getDropsWinsLiveGames({ commit, rootState }) {
    commit('setDropsWinsLiveGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'dropslive', platform: rootState.platform },
      });
      commit('setDropsWinsLiveGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setDropsWinsLiveGamesAreLoading', false);
    }
  },

  async getDefaultGames({ commit, rootState }) {
    commit('setDefaultGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { platform: rootState.platform },
      });
      commit('setDefaultGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setDefaultGamesAreLoading', false);
    }
  },

  async startGame({ state, commit, rootState }, { demo, gameId, returnUrl }) {
    if (state.gameError) commit('setGameError', '');
    try {
      const res = await http.post(`${API_HOST}/startGame`, {
        gameId,
        platform: rootState.platform,
        returnUrl,
        demo,
      });
      if (res.code === 0) {
        commit('setStartingGame', res.data);
      } else commit('setGameError', res.message);
    } catch (e) {
      commit('setGameError', e);
      this.$sentry.captureException(new Error(e));
    }
  },

  async getGameProducerList({ commit }) {
    try {
      const res = await http.get(`${API_HOST}/gameProducerList`);
      commit('setGameProducerList', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },

  async getTopWinnerList({ commit }, payload = {}) {
    commit('setTopWinnerListIsLoading', true);
    try {
      const res = await http.get(`${API_HOST}/topWinnerList`, {
        ...{ params: payload },
      });
      commit('setTopWinnerList', res.data);
    } catch (e) {
      commit('setTopWinnerListError', e);
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setTopWinnerListIsLoading', false);
    }
  },

  async getLastWinnerList({ commit }, payload = {}) {
    commit('setLastWinnerListIsLoading', true);
    try {
      const res = await http.get(`${API_HOST}/lastWinnerList`, {
        ...{ params: payload },
      });
      commit('setLastWinnerList', res.data);
    } catch (e) {
      commit('setLastWinnerListError', e);
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setLastWinnerListIsLoading', false);
    }
  },
};
