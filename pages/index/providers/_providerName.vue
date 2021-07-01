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
      btn-class="Btn--common Btn--dark"
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
  head() {
    return {
      title: `ᐈ Play ${this.$route.params.providerName.charAt(0).toUpperCase() +
        this.$route.params.providerName.slice(
          1,
        )} Games Now For Free Or Real Money | $450 Welcome Bonus At Ninecasino`,
      meta: [
        {
          description: `★ Play ${this.$route.params.providerName.charAt(0).toUpperCase() +
            this.$route.params.providerName.slice(
              1,
            )} Games For Free Or Real Money At Online Casino ✓ Fast withdrawal ✓ Fully licensed Ninecasino`,
        },
      ],
    };
  },
  computed: {
    ...mapState(['games', 'gamesAreLoading']),
    gamesParams() {
      const params = {};
      if (this.$route.params.providerName !== 'all')
        params.gameProducer = this.$route.params.providerName;
      if (this.$route.params.category !== 'all') params.category = this.$route.params.category;
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
