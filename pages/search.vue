<template>
  <div class="SearchPage Wrapper">
    <h1 class="Title Title--center SearchPage-Title">{{ $t('search.findGame') }}</h1>
    <Search v-model="searched" class="SearchPage-Search" />
    <ProvidersMenu
      v-if="gameProducerList.length"
      class="SearchPage-Providers"
      :provider-active="providerActive"
      @choose-provider="onChooseProvider"
    />
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
    <div class="Title Title--type-h4 Cards-Title">
      {{ $t('search.popular') }}
    </div>
    <Games
      class="DefaultGames-Cards"
      :games="popularGames"
      :games-to-show="24"
      btn-class="Btn--common Btn--outline"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import search from '@/mixins/search';
import Search from '@/components/Search';
import Games from '@/components/Games';
import ProvidersMenu from '@/components/ProvidersMenu';
import gameProducer from '@/mixins/gameProducer';

const gamesForCountries = {
  RU: [
    'book of dead',
    'starburst',
    'legacy of dead',
    'wolf gold',
    'sweet bonanza',
    'lightning roulette',
    "gonzo's quest megaways",
    'big bass bonanza',
    'crazy time',
    'joe exotic',
  ],
  AT: [
    'book of dead',
    'starburst',
    'legacy of dead',
    'wolf gold',
    'sweet bonanza',
    'lightning roulette',
    "gonzo's quest megaways",
    'big bass bonanza',
    'crazy time',
    'joe exotic',
  ],
  CZ: [
    'elvis frog in vegas',
    'the dog house',
    'sweet bonanza',
    'wolf gold',
    'fruit party',
    'big bass bonanza',
    'release the kraken',
    'hot to burn',
    'buffalo power hold and win',
    'gems bonanza',
    'four lucky clover',
  ],
  SI: [],
  IE: [],
  RO: [],
  DK: [],
  EE: [],
  FI: [],
  GR: [],
  HR: [],
  BG: [],
  DE: [],
  AU: [],
};

export default {
  name: 'SearchPage',
  components: {
    Search,
    Games,
    ProvidersMenu,
  },
  mixins: [search, gameProducer],
  layout: 'page',
  computed: {
    ...mapState(['defaultCountry']),
    ...mapState('games', ['defaultGames']),
    popularGames() {
      if (this.defaultCountry) {
        return this.defaultGames.filter(game => {
          const gameLowerCase = game.gameName.toLowerCase();
          return gamesForCountries[this.defaultCountry].includes(gameLowerCase);
        });
      }

      return [];
    },
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
      height: 46px;
      margin: 0 auto 10px;
      background: var(--color-bg);
      border: none;
    }
  }

  &-Providers {
    margin-bottom: 24px;
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
