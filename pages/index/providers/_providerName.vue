<template>
  <div>
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
  computed: {
    ...mapState('games', ['games', 'gamesAreLoading']),
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
    ...mapActions('games', ['getGames']),
  },
};
</script>
