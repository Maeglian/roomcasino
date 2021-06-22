import Cookie from 'js-cookie';
import { http } from '@/store';

export default async context => {
  const token = Cookie.get('token');
  if (token) {
    context.store.commit('setToken', token);
    http.defaults.headers.common['X-Auth-Token'] = token;
  }
};
