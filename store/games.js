import { API_HOST } from '@/config';
import { http } from './index';

export const state = () => ({
  games: [],
  recentGames: [],
  defaultGames: [],
  newGames: [],
  liveGames: [],
  tournamentGames: [],
  gamesAreLoading: false,
  defaultGamesAreLoading: false,
  newGamesAreLoading: false,
  liveGamesAreLoading: false,
  tournamentGamesAreLoading: false,
  winnersAreLoading: false,
  gameProducers: [],
  gameUrlForIframe: '',
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
  setGameUrl: (state, gameUrl) => {
    state.gameUrlForIframe = gameUrl;
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
  setNewGamesAreLoading: (state, payload) => {
    state.newGamesAreLoading = payload;
  },
  setTournamentGamesAreLoading: (state, payload) => {
    state.tournamentGamesAreLoading = payload;
  },
  setLiveGamesAreLoading: (state, payload) => {
    state.liveGamesAreLoading = payload;
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
  setTournamentGames: (state, payload) => {
    state.tournamentGames = payload;
  },
  setLiveGames: (state, payload) => {
    state.liveGames = payload;
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
  async getGames({ commit, state }, payload = {}) {
    commit('setGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { ...payload, platform: state.platform },
      });
      commit('setGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setGamesAreLoading', false);
    }
  },

  async getNewGames({ commit, state }) {
    commit('setNewGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'new', platform: state.platform },
      });
      commit('setNewGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setNewGamesAreLoading', false);
    }
  },

  async getLiveGames({ commit, state }) {
    commit('setLiveGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { category: 'live', platform: state.platform },
      });
      commit('setLiveGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setLiveGamesAreLoading', false);
    }
  },

  async getTournamentGames({ commit, state }, params) {
    commit('setTournamentGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, { params, platform: state.platform });
      commit('setTournamentGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setTournamentGamesAreLoading', false);
    }
  },

  async getRecentGames({ commit, state }, payload = {}) {
    commit('setGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, {
        params: { ...payload, recent: 1, platform: state.platform },
      });
      commit('setRecentGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setGamesAreLoading', false);
    }
  },

  async getDefaultGames({ commit, state }) {
    commit('setDefaultGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, { params: { platform: state.platform } });
      commit('setDefaultGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setDefaultGamesAreLoading', false);
    }
  },

  async startGame({ state, commit }, { demo, gameId, returnUrl }) {
    if (state.gameError) commit('setGameError', '');
    try {
      const res = await http.post(`${API_HOST}/startGame`, {
        gameId,
        platform: state.platform,
        returnUrl,
        demo,
      });
      if (res.code === 0) {
        const { url } = res.data;
        commit('setGameUrl', url);
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
