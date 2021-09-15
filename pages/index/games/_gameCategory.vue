<template>
  <div>
    <h1 class="Title Title--type-h2 Cards-Title">
      {{ $t(`gameCategories.${$route.params.gameCategory}`) }}
    </h1>
    <Loader v-if="gamesAreLoading" />
    <Games
      v-else
      class="DefaultGames-Cards"
      :category-name="$t(`gtagCategories.${$route.params.gameCategory}`)"
      :games="games"
      :games-to-show="24"
      btn-class="Btn--common Btn--outline"
    />
    <template v-if="$route.params.gameCategory === 'table'">
      <div class="Title Title--type-h2 Cards-Title">
        {{ $t('gameCategories.card') }}
      </div>
      <Loader v-if="cardGamesAreLoading" />
      <Games
        v-else
        class="DefaultGames-Cards"
        :category-name="$t('gtagCategories.card')"
        :games="cardGames"
        :games-to-show="24"
        btn-class="Btn--common Btn--outline"
      />
    </template>
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
  async asyncData({ store, params }) {
    const gameParams = {};
    if (params.gameCategory !== 'all') gameParams.category = params.gameCategory;
    await store.dispatch('games/getGames', gameParams);
    if (params.gameCategory === 'table') await store.dispatch('games/getCardGames');
  },
  head() {
    return {
      title: `ᐈ Play ${this.$route.params.gameCategory.charAt(0).toUpperCase() +
        this.$route.params.gameCategory.slice(
          1,
        )} Games Now For Free Or Real Money | $450 Welcome Bonus At Ninecasino`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `★ Play ${this.$route.params.gameCategory.charAt(0).toUpperCase() +
            this.$route.params.gameCategory.slice(
              1,
            )} Games For Free Or Real Money At Online Casino ✓ Fast withdrawal ✓ Fully licensed Ninecasino`,
        },
      ],
    };
  },
  computed: {
    ...mapState(['width']),
    ...mapState('games', [
      'games',
      'gamesAreLoading',
      'recentGames',
      'cardGamesAreLoading',
      'cardGames',
    ]),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions('games', ['getGames', 'getCardGames']),
  },
};
</script>
