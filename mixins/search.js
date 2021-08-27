import { mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      searched: '',
    };
  },
  computed: {
    ...mapState('games', ['defaultGames']),
    ...mapGetters('games', ['gamesSearched']),
    searchedGames() {
      return this.searched ? this.gamesSearched(this.searched) : this.defaultGames;
    },
  },
};
