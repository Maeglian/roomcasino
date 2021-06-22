import { API_HOST } from '@/config';
import { http } from './index';

export const state = () => ({
  profileIsUpdating: false,
  updateProfileError: '',
  bonusList: [],
  bonusListIsLoading: false,
  availableBonusList: [],
  availableBonusListIsLoading: false,
  freeSpinList: [],
  freeSpinListIsLoading: false,
  availableFreeSpinList: [],
  availableFreeSpinListIsLoading: false,
  deleteBonusError: '',
  activateFreeSpinError: '',
  pageRowsCount: 0,
  pageDataIsLoading: false,
  historyListIsLoading: false,
  transactionHistoryList: [],
  gameHistoryList: [],
  bonusHistoryList: [],
  sessionHistoryList: [],
  userDocumentList: [],
  originalFileIsLoading: false,
  originalFile: null,
  originalFileError: '',
  limits: [],
  createLimitError: '',
  deleteLimitError: '',
});

export const getters = {
  limitsByTypes: state => {
    const ll = state.limits.reduce((namedLimits, limit) => {
      const namedlimit = namedLimits.find(l => l.type === limit.type);
      if (namedlimit) namedlimit.limits.push(limit);
      else {
        namedLimits.push({
          type: limit.type,
          limits: [limit],
        });
      }
      return namedLimits;
    }, []);
    return ll;
  },
};

export const mutations = {
  setProfileIsUpdating(state, payload) {
    state.passwordIsUpdating = payload;
  },
  setUpdateProfileError(state, payload) {
    state.updateProfileError = payload;
  },
  setBonusListIsLoading: (state, payload) => {
    state.bonusListIsLoading = payload;
  },
  setBonusList: (state, payload) => {
    state.bonusList = payload;
  },
  setAvailableBonusListIsLoading: (state, payload) => {
    state.availablebonusListIsLoading = payload;
  },
  setAvailableBonusList: (state, payload) => {
    state.availableBonusList = payload;
  },
  setFreeSpinListIsLoading: (state, payload) => {
    state.freeSpinListIsLoading = payload;
  },
  setAvailableFreeSpinListIsLoading: (state, payload) => {
    state.availablefreeSpinListIsLoading = payload;
  },
  setAvailableFreeSpinList: (state, payload) => {
    state.availableFreeSpinList = payload;
  },
  setFreeSpinList: (state, payload) => {
    state.freeSpinList = payload;
  },
  setDeleteBonusError: (state, message) => {
    state.deleteBonusError = message;
  },
  setActivateFreeSpinError: (state, message) => {
    state.activateFreeSpinError = message;
  },
  setPageRowsCount: (state, payload) => {
    state.pageRowsCount = payload;
  },
  setPageDataIsLoading: state => {
    state.pageDataIsLoading = true;
  },
  setPageDataIsLoaded: state => {
    state.pageDataIsLoading = false;
  },
  setTransactionHistoryList: (state, payload) => {
    state.transactionHistoryList = payload;
  },
  setGameHistoryList: (state, payload) => {
    state.gameHistoryList = payload;
  },
  setBonusHistoryList: (state, payload) => {
    state.bonusHistoryList = payload;
  },
  setSessionHistoryList: (state, payload) => {
    state.sessionHistoryList = payload;
  },
  setHistoryListIsLoading: (state, payload) => {
    state.historyListIsLoading = payload;
  },
  setUserDocumentList: (state, payload) => {
    state.userDocumentList = payload;
  },
  setOriginalFileIsLoading: (state, payload) => {
    state.originalFileIsLoading = payload;
  },
  setOriginalFile: (state, payload) => {
    state.originalFile = payload;
  },
  setOriginalFileError: (state, payload) => {
    state.originalFileError = payload;
  },
  setCreateLimitError: (state, message) => {
    state.createLimitError = message;
  },
  setDeleteLimitError: (state, message) => {
    state.deleteLimitError = message;
  },
  setLimits: (state, payload) => {
    state.limits = payload;
  },
};

export const actions = {
  async setActiveAccount({ commit }, payload) {
    try {
      await http.post(`${API_HOST}/setActiveAccount`, payload);
    } catch (e) {
      commit('pushNotificationAlert', e, { root: true });
      this.$sentry.captureException(new Error(e));
    }
  },

  async createAccount({ rootState, commit, dispatch }, payload) {
    if (rootState.serverError) commit('setServerError', '', { root: true });
    try {
      await http.post(`${API_HOST}/createAccount`, payload);
      dispatch('getProfile', null, { root: true });
      dispatch('getLimits');
    } catch (e) {
      commit('setServerError', e, { root: true });
      this.$sentry.captureException(new Error(e));
    }
  },

  async updateProfile({ state, commit, dispatch }, payload) {
    if (state.updateProfileError) commit('setUpdateProfileError', '');
    try {
      commit('setProfileIsUpdating', true);
      await http.put(`${API_HOST}/profile`, payload);
      dispatch('getProfile', null, { root: true });
    } catch (e) {
      commit('setUpdateProfileError', e);
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setProfileIsUpdating', false);
    }
  },

  async updatePassword({ commit }, payload) {
    try {
      commit('setProfileIsUpdating', true);
      await http.put(`${API_HOST}/updatePassword`, payload);
    } catch (e) {
      commit('setUpdateProfileError', e);
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setProfileIsUpdating', false);
    }
  },

  async restorePassword({ commit }, payload) {
    try {
      commit('setPageDataIsLoading', true);
      await http.post(`${API_HOST}/passwordRestore`, payload);
    } catch (e) {
      commit('setServerError', e, { root: true });
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setPageDataIsLoading', false);
    }
  },

  async confirmRestorePassword({ commit }, payload) {
    try {
      commit('setPageDataIsLoading', true);
      await http.post(`${API_HOST}/passwordRestoreConfirm`, payload);
    } catch (e) {
      commit('setServerError', e, { root: true });
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setPageDataIsLoading', false);
    }
  },

  async getBonusList({ commit }) {
    commit('setBonusListIsLoading', true);
    try {
      const res = await http.get(`${API_HOST}/bonusList`);
      commit('setBonusList', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setBonusListIsLoading', false);
    }
  },

  async getFreeSpinList({ commit }) {
    commit('setFreeSpinListIsLoading', true);
    try {
      const res = await http.get(`${API_HOST}/freeSpinList`);
      commit('setFreeSpinList', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setFreeSpinListIsLoading', false);
    }
  },

  async getAvailableBonusList({ commit }) {
    commit('setAvailableBonusListIsLoading', true);
    try {
      const res = await http.get(`${API_HOST}/availableBonusList`);
      const bonuses = res.data;
      const wasntDeposit = bonuses.find(bonus => bonus.available && bonus.depositNum);
      const depositNum = !bonuses.length || !wasntDeposit ? 4 : wasntDeposit.depositNum;

      commit('setAvailableBonusList', bonuses);
      commit('setDepositNum', depositNum, { root: true });
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setAvailableBonusListIsLoading', false);
    }
  },

  async getAvailableFreeSpinList({ commit }) {
    commit('setAvailableFreeSpinListIsLoading', true);
    try {
      const res = await http.get(`${API_HOST}/availableFreeSpinList`);
      const bonuses = res.data;
      commit('setAvailableFreeSpinList', bonuses);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setAvailableFreeSpinListIsLoading', false);
    }
  },

  async deleteBonus({ commit, state }, id) {
    if (state.deleteBonusError) commit('setDeleteBonusError', '');
    try {
      await http.delete(`${API_HOST}/bonus/${id}`);
    } catch (e) {
      commit('setDeleteBonusError', e);
      this.$sentry.captureException(new Error(e));
    }
  },

  async deleteFreeSpin({ commit, state }, id) {
    if (state.deleteBonusError) commit('setDeleteBonusError', '');
    try {
      await http.delete(`${API_HOST}/freeSpin/${id}`);
    } catch (e) {
      commit('setDeleteBonusError', e);
      this.$sentry.captureException(new Error(e));
    }
  },

  async activateFreeSpin({ commit, state }, { id, gameId }) {
    if (state.activateFreeSpinError) commit('setActivateFreeSpinError', '');
    try {
      await http.patch(`${API_HOST}/freeSpin/${id}`, { gameId });
    } catch (e) {
      commit('setActivateFreeSpinError', e);
      this.$sentry.captureException(new Error(e));
    }
  },

  async getTransactionHistoryList({ rootState, commit }, payload = {}) {
    try {
      if (rootState.serverError) commit('setServerError', null, { root: true });
      commit('setHistoryListIsLoading', true);
      const res = await http.get(`${API_HOST}/transactionHistoryList`, {
        ...{ params: payload },
      });
      commit('setPageRowsCount', res.count);
      commit('setTransactionHistoryList', res.data);
    } catch (e) {
      commit('setServerError', e, { root: true });
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setHistoryListIsLoading', false);
    }
  },

  async getBonusHistoryList({ rootState, commit }, payload = {}) {
    try {
      if (rootState.serverError) commit('setServerError', null, { root: true });
      commit('setHistoryListIsLoading', true);
      const res = await http.get(`${API_HOST}/bonusHistoryList`, {
        ...{ params: payload },
      });
      commit('setPageRowsCount', res.count);
      commit('setBonusHistoryList', res.data);
    } catch (e) {
      commit('setServerError', e, { root: true });
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setHistoryListIsLoading', false);
    }
  },

  async getGameHistoryList({ rootState, commit }, payload = {}) {
    try {
      if (rootState.serverError) commit('setServerError', null, { root: true });
      commit('setHistoryListIsLoading', true);
      const res = await http.get(`${API_HOST}/gameHistoryList`, {
        ...{ params: payload },
      });
      commit('setPageRowsCount', res.count);
      commit('setGameHistoryList', res.data);
    } catch (e) {
      commit('setServerError', e, { root: true });
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setHistoryListIsLoading', false);
    }
  },

  async getSessionHistoryList({ rootState, commit }, payload = {}) {
    try {
      if (rootState.serverError) commit('setServerError', null, { root: true });
      commit('setHistoryListIsLoading', true);
      const res = await http.get(`${API_HOST}/sessionHistory`, {
        ...{ params: payload },
      });
      commit('setPageRowsCount', res.count);
      commit('setSessionHistoryList', res.data);
    } catch (e) {
      commit('setServerError', e, { root: true });
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setHistoryListIsLoading', false);
    }
  },

  async getUserDocumentList({ commit }) {
    try {
      commit('setPageDataIsLoading', true);
      const res = await http.get(`${API_HOST}/document`);
      commit('setUserDocumentList', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setPageDataIsLoading', false);
    }
  },

  async showUserDocument({ commit }, id) {
    commit('setOriginalFileIsLoading', true);
    try {
      const res = await http.get(`${API_HOST}/document/${id}`, {
        responseType: 'blob',
      });
      commit('setOriginalFile', res);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    } finally {
      commit('setOriginalFileIsLoading', false);
    }
  },

  async deleteUserDocument(context, id) {
    try {
      await http.delete(`${API_HOST}/document/${id}`);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },

  async getLimits({ commit }) {
    try {
      const res = await http.get(`${API_HOST}/limit`);
      const limits = res.data;
      commit('setLimits', limits);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },

  async addLimit({ state, commit }, payload) {
    if (state.createLimitError) commit('setCreateLimitError', '');
    try {
      await http.put(`${API_HOST}/limit`, payload);
    } catch (e) {
      commit('setCreateLimitError', e);
      this.$sentry.captureException(new Error(e));
    }
  },

  async deleteLimit({ state, commit }, payload) {
    if (state.deleteLimitError) commit('setDeleteLimitError', '');
    try {
      await http.delete(`${API_HOST}/limit?type=${payload.type}&period=${payload.period}`);
    } catch (e) {
      commit('setDeleteLimitError', e);
      this.$sentry.captureException(new Error(e));
    }
  },
};
