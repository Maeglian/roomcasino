import Cookie from 'js-cookie';
import axios from 'axios';

export default async context => {
  const token = Cookie.get('token');
  if (token) {
    context.store.commit('setToken', token);
    axios.defaults.headers.common['X-Auth-Token'] = token;
  }
};
