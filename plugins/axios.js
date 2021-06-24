import { http } from '@/store';

export default async context => {
  if (context.store.getters.isLoggedIn) {
    http.defaults.headers.common['X-Auth-Token'] = context.store.state.token;
  }
};
