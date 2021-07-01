<template>
  <div>
    <template v-if="recentGames.length">
      <div class="Title Title--type-h2 Cards-Title">
        {{ $t('gameCategories.recent') }}
      </div>
      <Games
        :key="isLoggedIn"
        class="DefaultGames-Cards"
        :games="recentGames"
        :games-to-show="recentGamesNum"
        btn-class="Btn--common Btn--dark"
      />
    </template>
    <h1 class="Title Title--type-h2 Cards-Title">
      {{ $t(`gameCategories.${$route.params.gameCategory}`) }}
    </h1>
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
import { mapActions, mapGetters, mapState } from 'vuex';
import Loader from '@/components/Loader';
import Games from '@/components/Games';

export default {
  name: 'GameCategory',
  components: {
    Loader,
    Games,
  },
  head() {
    return {
      title: `ᐈ Play ${this.$route.params.gameCategory.charAt(0).toUpperCase() +
        this.$route.params.gameCategory.slice(
          1,
        )} Games Now For Free Or Real Money | $450 Welcome Bonus At Ninecasino`,
      meta: [
        {
          description: `★ Play ${this.$route.params.gameCategory.charAt(0).toUpperCase() +
            this.$route.params.gameCategory.slice(
              1,
            )} Games For Free Or Real Money At Online Casino ✓ Fast withdrawal ✓ Fully licensed Ninecasino`,
        },
      ],
    };
  },
  computed: {
    ...mapState(['width', 'games', 'gamesAreLoading', 'recentGames']),
    ...mapGetters(['isLoggedIn']),
    recentGamesNum() {
      return this.width > 590 ? (this.width > 960 ? 6 : 4) : 2;
    },
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
        if (this.isLoggedIn) this.getRecentGames(this.gamesParams);
      },
    },
  },
  methods: {
    ...mapActions(['getGames', 'getRecentGames']),
  },
};
</script>
