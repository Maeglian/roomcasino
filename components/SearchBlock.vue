<template>
  <div class="SearchBlock">
    <div v-click-outside="onClickOutsideFiltersBtn" class="SearchBlock-Header">
      <Search v-model="searched" class="SearchBlock-Search" />
      <div class="SearchBlock-Filters">
        <div class="SearchBlock-FiltersIconWrapper" @click="filtersAreOpen = !filtersAreOpen">
          <svg class="SearchBlock-FiltersIcon" width="13" height="15">
            <use xlink:href="@/assets/img/icons.svg#filters"></use>
          </svg>
        </div>
        <div v-if="filtersAreOpen || width >= 768" class="SearchBlock-FiltersInner">
          <CheckboxFilter
            v-for="(filter, name) in filters"
            :key="name"
            class="SearchBlock-Filter"
            :title="filter.title"
            :default-value="filter.defaultValue"
            :name-key="filter.nameKey"
            :value-key="filter.valueKey"
            :value="filter.value"
            :values="filter.values"
            @change="filter.value = $event"
          >
          </CheckboxFilter>
        </div>
      </div>
    </div>
    <div
      v-if="
        searched || filters.gameProducerList.value.length || filters.categoriesList.value.length
      "
      class="SearchBlock-Games"
    >
      <div v-if="filteredGames.length" class="Title Title--type-h4 Cards-Title">
        {{ $t('search.searchResults') }} ({{ filteredGames.length }})
      </div>
      <Games
        class="SearchBlock-Cards"
        :games="filteredGames"
        :games-to-show="7"
        :show-dga="false"
        play-btn-showed
        btn-class="SearchBlock-Btn"
      >
        <template #notFound>
          <div class="SearchBlock-NotFound ">
            {{ $t('search.nothingFound') }}.
            <br />
            {{ $t('search.try') }}
          </div>
        </template>
        <template v-if="selectedOneFilter" #btn>
          <NuxtLink
            :to="localePath({ path: pathToSelectedFilter, hash: '#games' })"
            class="SearchBlock-Btn Games-Btn"
          >
            {{ $t('buttons.loadMoreGames') }}
          </NuxtLink>
        </template>
      </Games>
    </div>
    <div class="SearchBlock-Popular">
      <div class="Title Title--type-h4 Cards-Title">
        {{ $t('search.popular') }}
      </div>
      <Games
        class="DefaultGames-Cards"
        :games="popularGames"
        :games-to-show="7"
        :show-dga="false"
        play-btn-showed
        btn-class="SearchBlock-Btn"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import search from '@/mixins/search';
import Search from '@/components/Search';
import Games from '@/components/Games';
import CheckboxFilter from '@/components/CheckboxFilter';

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
  name: 'SearchBlock',
  components: {
    Search,
    Games,
    CheckboxFilter,
  },
  mixins: [search],
  layout: 'page',
  data() {
    return {
      filters: {
        categoriesList: {
          title: 'Categories',
          defaultValue: 'All categories',
          nameKey: 'name',
          valueKey: 'value',
          value: [],
          values: [
            {
              name: this.$t('gameCategoriesTabs.top'),
              value: 'top',
            },
            {
              name: this.$t('gameCategoriesTabs.slots'),
              value: 'slots',
            },
            {
              name: this.$t('gameCategoriesTabs.roulette'),
              value: 'roulette',
            },
            {
              name: this.$t('gameCategoriesTabs.table'),
              value: 'table',
            },
            {
              name: this.$t('gameCategoriesTabs.card'),
              value: 'card',
            },
            {
              name: this.$t('gameCategoriesTabs.new'),
              value: 'new',
            },
            {
              name: this.$t('gameCategoriesTabs.jackpots'),
              value: 'jackpots',
            },
            {
              name: this.$t('gameCategoriesTabs.megaways'),
              value: 'megaways',
            },
            {
              name: this.$t('gameCategoriesTabs.buybonus'),
              value: 'buybonus',
            },
            {
              name: this.$t('gameCategoriesTabs.luckychoice'),
              value: 'luckychoice',
            },
            {
              name: this.$t('gameCategoriesTabs.DROP&WINS'),
              value: 'DROP&WINS',
            },
          ],
        },
        gameProducerList: {
          title: 'Producers',
          defaultValue: 'All producers',
          nameKey: 'name',
          valueKey: 'name',
          value: [],
          values: [],
        },
      },
      filtersAreOpen: false,
    };
  },
  computed: {
    ...mapState(['width', 'defaultCountry']),
    ...mapState('games', ['gameProducers']),
    selectedOneFilter() {
      return (
        (this.filters.categoriesList.value.length === 1 &&
          !this.filters.gameProducerList.value.length) ||
        this.filters.gameProducerList.value.length === 1
      );
    },
    pathToSelectedFilter() {
      let path = '';
      if (this.filters.gameProducerList.value.length === 1)
        path = `/providers/${this.filters.gameProducerList.value[0]}`;
      else if (this.filters.categoriesList.value.length === 1)
        path = `/games/${this.filters.categoriesList.value[0]}`;
      return path;
    },
    popularGames() {
      if (this.defaultCountry) {
        return this.defaultGames.filter(game => {
          const countryGames = gamesForCountries[this.defaultCountry] || gamesForCountries.default;
          return countryGames.includes(game.gameName);
        });
      }

      return [];
    },
    formattedGameProducerList() {
      return this.gameProducers.map(producer => {
        return { ...producer, name: producer.name.toLowerCase() };
      });
    },
    filteredGames() {
      if (!this.filters.gameProducerList.value.length && !this.filters.categoriesList.value.length)
        return this.searchedGames;

      return this.searchedGames.filter(game => {
        if (
          this.filters.gameProducerList.value.includes(game.gameProducer) &&
          !this.filters.categoriesList.value.length
        )
          return true;
        let gameIsSelected = false;
        for (let i = 0; i < this.filters.categoriesList.value.length; i++) {
          if (
            game.categoryList.includes(this.filters.categoriesList.value[i]) &&
            (this.filters.gameProducerList.value.includes(game.gameProducer) ||
              !this.filters.gameProducerList.value.length)
          ) {
            gameIsSelected = true;
            break;
          }
        }

        return gameIsSelected;
      });
    },
  },
  watch: {
    formattedGameProducerList: {
      immediate: true,
      handler() {
        if (this.formattedGameProducerList.length)
          this.filters.gameProducerList.values = this.formattedGameProducerList;
      },
    },
  },
  methods: {
    onClickOutsideFiltersBtn() {
      this.filtersAreOpen = false;
    },
  },
};
</script>

<style lang="scss">
.SearchBlock {
  margin-top: 20px;
  padding-bottom: 1px;
  background: rgba(5, 12, 36, 0.96);

  &-Header {
    position: relative;
    display: flex;

    @media (min-width: $screen-m) {
      display: block;
    }
  }

  &-Search {
    position: relative;
    flex-grow: 1;
    height: 50px;
    background: var(--color-bg-lighter);
    border: 2px solid var(--color-bg-mobnav-lighter);
    border-radius: var(--border-radius-default);

    @media (min-width: $screen-m) {
      position: relative;
    }
  }

  &-Providers {
    margin-bottom: 24px;
  }

  &-Popular {
    margin-top: 24px;
  }

  &-Text {
    font-size: 12px;
    line-height: 19px;
    color: var(--color-text-faded);
  }

  &-Btn {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-main1);
    text-transform: capitalize;
  }

  .Search-Close {
    @media (min-width: $screen-m) {
      right: 16px;
      left: initial;
    }
  }

  &-FiltersInner {
    position: absolute;
    top: 65px;
    left: 0;
    z-index: 1;
    width: 100%;
    background: var(--color-bg-lighter);
    border-radius: var(--border-radius-default);

    @media (min-width: $screen-m) {
      position: relative;
      top: initial;
      display: flex;
      margin-bottom: 24px;
      background: transparent;
      border-bottom: 1px solid var(--color-text-ghost);
      border-radius: 0;
    }
  }

  &-Arrow {
    fill: var(--color-text-main);
  }

  &-FiltersIconWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    margin-left: 6px;
    background: var(--color-bg-lighter);
    border: 2px solid var(--color-bg-mobnav-lighter);
    border-radius: var(--border-radius-default);

    @media (min-width: $screen-m) {
      display: none;
    }
  }

  &-FiltersIcon {
    fill: var(--color-main1);
  }

  &-Filter {
    @media (min-width: $screen-m) {
      flex-shrink: 0;
      margin-right: 56px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &-NotFound {
    font-size: 12px;
    font-weight: 300;
    line-height: 1.66;
    color: var(--color-text-main);

    @media (min-width: $screen-m) {
      padding: 0 18px 20px;
      border-bottom: 1px solid var(--color-text-ghost);
    }
  }

  &-Games {
    margin-top: 16px;

    @media (min-width: $screen-m) {
      margin-top: 0;
    }
  }

  .Games-Items {
    grid-template-columns: 1fr;
    justify-items: flex-start;
    grid-row-gap: 0;
    padding: 0 16px;
  }

  .Games-Btn {
    margin-left: 16px;
    text-align: left;
  }

  .Cards-Title {
    margin-left: 16px;
  }

  .Card {
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 6px;

    &:hover {
      background: var(--color-card-hover);

      .Card-PlayBtn {
        display: flex;
      }
    }
  }

  .Card-PlayBtn {
    position: relative;
    top: initial;
    height: 40px;
    margin-left: auto;
    padding: 0 27px;
    font-size: 10px;
    transform: none;
  }

  .Card-Main {
    flex-grow: 0;
    flex-basis: 0;
  }

  .Card-Image {
    width: 60px;
    height: 60px;
    margin-right: 12px;
    overflow: hidden;
    background-size: contain;
    border-radius: var(--border-radius-6);
  }

  .Card-Footer {
    flex-basis: 0;
    align-items: flex-start;
    background: transparent;
  }

  .Card-Name {
    white-space: nowrap;

    br {
      display: none;
    }
  }

  .Card-Provider {
    margin-top: 3px;
    margin-bottom: 0;
    font-size: 10px;
    font-weight: 500;
    color: var(--color-text-faded);
    text-transform: capitalize;
    white-space: nowrap;
  }
}
</style>
