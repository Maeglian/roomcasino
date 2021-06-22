import { API_HOST } from '@/config';
import { http } from './index';

export const state = () => ({
  phoneCodeList: [],
  countriesList: [],
  currencyList: [],
  categories: [],
});

export const getters = {};

export const mutations = {
  setPhoneCodeList: (state, payload) => {
    state.phoneCodeList = payload;
  },
  setCountriesList: (state, payload) => {
    state.countriesList = payload;
  },
  setCurrencyList: (state, payload) => {
    state.currencyList = payload;
  },
  setCategories: (state, payload) => {
    state.categories = payload;
  },
};

export const actions = {
  async getCountriesList({ commit }) {
    try {
      const res = await http.get(`${API_HOST}/countryList`);
      commit('setCountriesList', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },

  async getPhoneCodeList({ commit }) {
    try {
      const res = await http.get(`${API_HOST}/phoneCodeList`);
      commit('setPhoneCodeList', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },

  async getCurrencyList({ commit }) {
    try {
      const res = await http.get(`${API_HOST}/currencyList`);
      commit('setCurrencyList', res.data.currencyList);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },

  async getCategoriesList({ commit }) {
    try {
      const res = await http.get(`${API_HOST}/categoryList`);
      commit('setCategories', res.data);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },
};
