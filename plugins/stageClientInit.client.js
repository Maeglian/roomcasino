import Cookie from 'js-cookie';

export default async context => {
  const token = Cookie.get('token');
  console.log(token);
  context.store.commit('setToken', token);
};
