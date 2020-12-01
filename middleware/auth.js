// eslint-disable-next-line func-names
export default function({ store, redirect }) {
  if (!store.getters.isLoggedIn) {
    return redirect('/');
  }
}
