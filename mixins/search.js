import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searched: '',
    };
  },
  computed: {
    ...mapGetters('games', ['gamesSearched']),
    filteredGames() {
      return this.searched ? this.gamesSearched(this.searched) : this.games;
    },
  },
};
