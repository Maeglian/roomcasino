import Cookie from 'js-cookie';
import { http } from '@/store';

export default async context => {
  const token = Cookie.get('token');
  if (token) {
    context.store.commit('setToken', token);
    context.store.commit('setAuthSuccess');
    http.defaults.headers.common['X-Auth-Token'] = token;
  }
};
