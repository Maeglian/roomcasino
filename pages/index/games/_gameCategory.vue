<template>
  <div>
    <Loader v-if="gamesAreLoading" />
    <Games
      v-else
      class="DefaultGames-Cards"
      :games="games"
      :games-to-show="24"
      btn-class="Btn--common Btn--dark"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Loader from '@/components/Loader';
import Games from '@/components/Games';

export default {
  name: 'GameCategory',
  components: {
    Loader,
    Games,
  },
  computed: {
    ...mapState(['games', 'gamesAreLoading']),
    gamesParams() {
      const params = {};
      if (this.$route.params.gameCategory !== 'all')
        params.category = this.$route.params.gameCategory;
      if (this.$route.params.producer) params.gameProducer = this.$route.params.producer;
      return params;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getGames(this.gamesParams);
      },
    },
  },
  methods: {
    ...mapActions(['getGames']),
  },
};
</script>
