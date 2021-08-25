import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searched: '',
    };
  },
  computed: {
    ...mapGetters('games', ['gamesSearched']),
    searchedGames() {
      return this.searched ? this.gamesSearched(this.searched) : this.games;
    },
  },
};
