<template>
  <div class="SearchPage Wrapper">
    <h1 class="Title Title--center SearchPage-Title">{{ $t('search.findGame') }}</h1>
    <Search v-model="searched" class="SearchPage-Search" />
    <ProvidersMenu
      v-if="gameProducerList.length"
      class="SearchPage-Providers"
      :game-producer-list="gameProducerList"
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
  AT: [
    'Book of Dead',
    'Starburst',
    'Legacy of Dead',
    'Wolf Gold',
    'Sweet Bonanza',
    'Lightning Roulette',
    "Gonzo's Quest Megaways",
    'Big Bass Bonanza',
    'Crazy Time',
    'Joe Exotic',
  ],
  CZ: [
    'Elvis Frog in Vegas',
    'The Dog House',
    'Sweet Bonanza',
    'Wolf Gold',
    'Fruit Party',
    'Big Bass Bonanza',
    'Release the Kraken',
    'Hot to Burn',
    'Buffalo Power Hold and Win',
    'Gems Bonanza',
    'Four Lucky Clover',
  ],
  SI: [
    'Starburst',
    'Book of Dead',
    'Big Bass Bonanza',
    'Lightning Roulette',
    'Wolf Gold',
    "Fisnin' Frenzy",
    'Eye of Horus',
    'Reel King Mega',
    '9 Pots of Gold',
  ],
  IE: [
    'Book of Dead',
    'Big Bass Bonanza',
    'Starburst',
    'Wolf Gold',
    "Gonzo's Quest Megaways",
    'Bonanza Megaways',
    'Sweet Bonanza',
    'Crazy Time',
    'Razor Shark',
    'Monopoly Live',
  ],
  RO: [
    'Book of dead',
    'Legacy of dead',
    'Elvis Frog in Vegas',
    'Crazy Time',
    'Aztec Magic Deluxe',
    'Sweet Bonanza',
    'Shining Crown',
    'Burning Hot',
    'Gates of Olympus',
    'The Dog House',
  ],
  DK: [
    'Starburst',
    'Book of Dead',
    'Crazy Time',
    'Fire Joker',
    'Deadwood',
    'Elvis Frog in Vegas',
    'Buffalo Power Hold and Win',
    'Book of Shadows',
    'Tombstone',
    'Divine Fortune',
  ],
  EE: [
    'Book of Dead',
    'Starburst',
    'Extra Chilli',
    'Hotel Yeti Way',
    'Gemix 2',
    'Legacy of Oz',
    'Dead or Alive 2',
    'Twin Spin Megaways',
  ],
  FI: [
    'Book of Dead',
    'Starburst',
    'Bonanza',
    'Big Bass Bonanza',
    'Legacy of Dead',
    'Wolf Gold',
    'Reactoonz',
    'Fire Joker',
    "Gonzo's Quest",
    'Crazy Time',
  ],
  GR: [
    'Book of Dead',
    "Gonzo's Quest Megaways",
    'Legacy of Dead',
    'Rich Wilde and the Tome of Madness',
    'Fruit Party',
    'Hotel Yeti Way',
    'Deadwood',
    'Rise of Olympus',
    'Crazy time',
    'The Dog House Megaways',
  ],
  HR: [
    'Starburst',
    'Book of Dead',
    'Razor Shark',
    'Big Bass Bonanza',
    'Wolf Gold',
    'Lightning Roulette',
    'Bonanza',
    'Age of the gods',
    'Reel King Mega',
  ],
  BG: [
    'Fire Joker',
    'Aztec Magic Deluxe',
    'Book of Dead',
    'Four Lucky Clover',
    'Elvis Frog in Vegas',
    'Lucky Clover',
    'Fruit Zen',
    'Fire Joker Freeze',
    'Fruit Bonanza',
  ],
  DE: [
    'Fire Joker',
    'Book of Dead',
    'Legacy of Dead',
    'Midas Golden Touch',
    'The Dog House',
    'Elvis Frog in Vegas',
    'John Hunter and the Book of Tut',
    'Sweet Bonanza',
    'Wolf Gold',
    'Big Bass Bonanza',
    'Fruit Party',
    'Hot Fruits Deluxe',
    'Razor Shark',
    'Allways Fruits',
    'Rise of Merlin',
  ],
  AU: [
    'Wolf Treasure',
    'Primal Hunt',
    'Dig Dig Digger',
    'Gold Digger',
    'Suncatcher Gigablox',
    'Sword of Khans',
    'Budda Fortune Hold and Win',
    "Caishen's Gold",
    'Fruit Million',
    '9 Happy Pharaohs',
  ],
  default: [
    'Book of Dead',
    'Starburst',
    'Legacy of Dead',
    'Wolf Gold',
    'Sweet Bonanza',
    'Lightning Roulette',
    'Fruit Party',
    'Fire Joker',
    'Buffalo Power Hold and Win',
  ],
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
          const countryGames = gamesForCountries[this.defaultCountry] || gamesForCountries.default;
          return countryGames.includes(game.gameName);
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
