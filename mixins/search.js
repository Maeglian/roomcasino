import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searched: '',
    };
  },
  computed: {
    ...mapGetters(['gamesSearched']),
    filteredGames() {
      return this.searched ? this.gamesSearched(this.searched) : this.games;
    },
  },
  methods: {
    onSearch(text) {
      this.searched = text;
    },
  },
};
