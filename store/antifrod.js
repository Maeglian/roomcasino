import { API_HOST, PIXEL_HOST } from '@/config';
import { http } from './index';

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async getPixel() {
    try {
      await fetch(`${PIXEL_HOST}/pixel/image`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },

  async sendLocaleStorageId() {
    const existingLocalStorageId = localStorage.getItem('localStorageId') || null;
    try {
      const res = await http.post(`${API_HOST}/localStorage`, {
        localStorageId: existingLocalStorageId,
      });
      if (!existingLocalStorageId) localStorage.setItem('localStorageId', res.data.localStorageId);
    } catch (e) {
      this.$sentry.captureException(new Error(e));
    }
  },
};
