<template>
  <div>
    <h1 class="Title Title--type-h2 Cards-Title">
      <template v-if="$route.params.providerName === 'all'">
        {{ $t('homepage.allProviders') }}
      </template>
      <template v-else>
        {{ $route.params.providerName }}
      </template>
    </h1>
    <Loader v-if="gamesAreLoading" />
    <Games
      class="DefaultGames-Cards"
      :games="games"
      :games-to-show="24"
      btn-class="Btn--common Btn--outline"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Loader from '@/components/Loader';
import Games from '@/components/Games';

export default {
  name: 'ProviderName',
  components: {
    Loader,
    Games,
  },
  async asyncData({ store, params }) {
    const gameParams = {};
    if (params.providerName !== 'all') gameParams.gameProducer = params.providerName;
    await store.dispatch('games/getGames', gameParams);
  },
  head() {
    return {
      title: `ᐈ Play ${this.$route.params.providerName.charAt(0).toUpperCase() +
        this.$route.params.providerName.slice(
          1,
        )} Games Now For Free Or Real Money | $450 Welcome Bonus At Ninecasino`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `★ Play ${this.$route.params.providerName.charAt(0).toUpperCase() +
            this.$route.params.providerName.slice(
              1,
            )} Games For Free Or Real Money At Online Casino ✓ Fast withdrawal ✓ Fully licensed Ninecasino`,
        },
      ],
    };
  },
  computed: {
    ...mapState('games', ['games', 'gamesAreLoading']),
  },
  methods: {
    ...mapActions('games', ['getGames']),
  },
};
</script>
