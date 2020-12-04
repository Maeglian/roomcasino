import axios from 'axios';

export default async context => {
  if (context.store.getters.isLoggedIn) {
    axios.defaults.headers.common['X-Auth-Token'] = context.store.state.token;
  }
};
