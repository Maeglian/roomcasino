import { API_HOST, TOURNAMENTS } from '@/config';
import { http } from './index';

export const state = () => ({
  tournamentGamesAreLoading: false,
  tournamentGames: [],
  tournamentList: [],
  tournamentListLoadingStatus: 'notLoaded',
  tournamentListError: '',
  tournamentResult: [],
  tournamentResultIsLoading: false,
  tournamentResultError: '',
  tournamentAwards: [],
  lotteryList: [],
  lotteryListLoadingStatus: 'notLoaded',
  lotteryResultListIsLoading: false,
  lotteryResultList: [],
  lotteryResultListError: '',
});

export const getters = {
  tournaments: state => {
    const nineCasinoTournaments = state.tournamentList.reduce((obj, tournament) => {
      if (!obj[tournament.slug]) {
        const newTournament = tournament;
        newTournament.url = newTournament.slug;
        newTournament.translates = newTournament.slug;
        newTournament.class =
          newTournament.slug.charAt(0).toUpperCase() + newTournament.slug.slice(1);
        obj[tournament.slug] = newTournament;
      }
      return obj;
    }, {});
    return { ...TOURNAMENTS, ...nineCasinoTournaments };
  },
};

export const mutations = {
  setTournamentGamesAreLoading: (state, payload) => {
    state.tournamentGamesAreLoading = payload;
  },
  setTournamentGames: (state, payload) => {
    state.tournamentGames = payload;
  },
  setTournamentList(state, payload) {
    state.tournamentList = payload;
  },
  setTournamentListLoadingStatus(state, payload) {
    state.tournamentListLoadingStatus = payload;
  },
  setTournamentListError(state, payload) {
    state.tournamentListError = payload;
  },
  setTournamentResultIsLoading(state, payload) {
    state.tournamentResultIsLoading = payload;
  },
  setTournamentResult(state, payload) {
    state.tournamentResult = payload;
  },
  setTournamentResultError(state, payload) {
    state.tournamentResultError = payload;
  },
  setTournamentAwards(state, payload) {
    state.tournamentAwards = payload;
  },
  setLotteryList(state, payload) {
    state.lotteryList = payload;
  },
  setLotteryListLoadingStatus(state, payload) {
    state.lotteryListLoadingStatus = payload;
  },
  setLotteryResultListIsLoading(state, payload) {
    state.lotteryResultListIsLoading = payload;
  },
  setLotteryResultList(state, payload) {
    state.lotteryResultList = payload;
  },
  setLotteryResultListError(state, payload) {
    state.lotteryResultListError = payload;
  },
};

export const actions = {
  async getTournamentGames({ commit, rootState }, params) {
    commit('setTournamentGamesAreLoading', true);
    try {
      const res = await http.get(`${API_HOST}/gameList`, { params, platform: rootState.platform });
      commit('setTournamentGames', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setTournamentGamesAreLoading', false);
    }
  },

  async getTournamentList({ commit }, payload = {}) {
    if (!payload.withAwards) commit('setTournamentListLoadingStatus', 'loading');
    try {
      const res = await http.get(`${API_HOST}/tournamentList`, {
        ...{ params: payload },
      });
      if (payload.withAwards) commit('setTournamentAwards', res.data);
      else commit('setTournamentList', res.data);
    } catch (e) {
      commit('setTournamentListError', e);
      this.$sentry.captureException(new Error(e));
    } finally {
      if (!payload.withAwards) commit('setTournamentListLoadingStatus', 'loaded');
    }
  },

  async getTournamentResult({ commit }, payload = {}) {
    commit('setTournamentResultIsLoading', true);
    try {
      const res = await http.get(`${API_HOST}/tournamentResult`, {
        ...{ params: payload },
      });
      commit('setTournamentResult', res.data);
    } catch (e) {
      commit('setTournamentResultError', e);
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setTournamentResultIsLoading', false);
    }
  },

  async getLotteryList({ commit }) {
    commit('setLotteryListLoadingStatus', 'loading');
    try {
      const res = await http.get(`${API_HOST}/lotteryNameList`);
      commit('setLotteryList', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setLotteryListLoadingStatus', 'loaded');
    }
  },

  async getLotteryResultList({ commit }, payload = {}) {
    commit('setLotteryResultListIsLoading', true);
    try {
      const res = await http.get(`${API_HOST}/lotteryList`, {
        ...{ params: payload },
      });
      commit('setLotteryResultList', res.data);
    } catch (e) {
      commit('setLotteryResultListError', e);
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setLotteryResultListIsLoading', false);
    }
  },
};
