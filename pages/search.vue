<template>
  <div class="SearchPage Wrapper">
    <h1 class="Title Title--center SearchPage-Title">{{ $t('search.findGame') }}</h1>
    <Search v-model="searched" class="SearchPage-Search" />
    <div v-if="searched" class="SearchedGames">
      <div v-if="filteredGames.length" class="Title Title--type-h4 Cards-Title">
        {{ $t('search.searchResults') }} ({{ filteredGames.length }})
      </div>
      <Games
        class="DefaultGames-Cards"
        :games="filteredGames"
        :games-to-show="24"
        btn-class="Btn--common Btn--outline"
      >
        <template #notFound>
          <div class="Title Title--type-h4">
            {{ $t('search.nothingFound') }}
          </div>
          <div class="Text Text--additional">
            {{ $t('search.try') }}
          </div>
        </template>
      </Games>
    </div>
    <template v-if="recentGames.length">
      <div class="Title Title--type-h2 Cards-Title">
        {{ $t('gameCategories.recent') }}
      </div>
      <Games
        :key="isLoggedIn"
        class="DefaultGames-Cards"
        :games="recentGames"
        :games-to-show="6"
        btn-class="Btn--common Btn--outline"
      />
    </template>
    <div class="Title Title--type-h2 Cards-Title">
      {{ $t('gameCategories.top') }}
    </div>
    <Loader v-if="topGamesAreLoading" />
    <Games
      v-else
      class="DefaultGames-Cards"
      :games="topGames"
      :games-to-show="24"
      btn-class="Btn--common Btn--outline"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import search from '@/mixins/search';
import Search from '@/components/Search';
import Games from '@/components/Games';

export default {
  name: 'SearchPage',
  components: {
    Search,
    Games,
  },
  mixins: [search],
  layout: 'page',
  computed: {
    ...mapState('games', ['topGames', 'topGamesAreLoading', 'recentGames']),
    ...mapGetters(['isLoggedIn']),
  },
  mounted() {
    this.getTopGames();
    this.getRecentGames();
  },
  methods: {
    ...mapActions('games', ['getTopGames', 'getRecentGames']),
  },
};
</script>

<style lang="scss">
.SearchPage {
  &-Title {
    margin: 18px 0;
    font-size: 20px;
  }

  &-Search {
    position: relative;
    margin-bottom: 32px;

    @media (min-width: $screen-m) {
      position: relative;
      width: 600px;
      height: 46px;
      margin: 0 auto 32px;
      background: var(--color-bg);
      border: none;
    }
  }

  &-Cards {
    margin-bottom: 30px;
  }

  &-Text {
    font-size: 12px;
    line-height: 19px;
    color: var(--color-text-faded);
  }

  .Search-Close {
    @media (min-width: $screen-m) {
      right: 16px;
      left: initial;
    }
  }
}
</style>
