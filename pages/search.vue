<template>
  <div class="SearchPage Wrapper">
    <h1 class="Title Title--center SearchPage-Title">{{ $t('search.findGame') }}</h1>
    <div v-click-outside="onClickOutsideFiltersBtn" class="SearchPage-Header">
      <Search v-model="searched" class="SearchPage-Search" />
      <div class="SearchPage-Filters">
        <div class="SearchPage-FiltersIconWrapper" @click="filtersAreOpen = !filtersAreOpen">
          <svg class="SearchPage-Icon" width="13" height="15">
            <use xlink:href="@/assets/img/icons.svg#filters"></use>
          </svg>
        </div>
        <div v-if="filtersAreOpen || width >= 768" class="SearchPage-FiltersInner">
          <div
            v-for="(filter, name) in filters"
            :key="name"
            v-click-outside="() => (filter.isOpen = false)"
            class="CheckboxFilter SearchPage-Filter"
          >
            <div class="CheckboxFilter-Title">
              {{ filter.title }}
            </div>
            <button class="CheckboxFilter-Footer" @click="filter.isOpen = !filter.isOpen">
              <div
                class="CheckboxFilter-Label CheckboxFilter-Default"
                :class="{ 'CheckboxFilter-Default--active': filter.isOpen }"
              >
                {{ filter.value.length ? filter.value.toString() : filter.defaultValue }}
              </div>
              <svg
                class="Arrow SearchPage-Arrow"
                :class="[filter.isOpen ? 'Arrow--up' : 'Arrow--down']"
                width="6"
                height="5"
              >
                <use xlink:href="@/assets/img/icons.svg#triangle"></use>
              </svg>
            </button>
            <div v-show="filter.isOpen || width < 768" class="CheckboxFilter-Inner">
              <BaseCheckbox
                v-for="val in filter.values"
                :key="val[filter.valueKey]"
                v-model="filter.value"
                class="CheckboxFilter-Checkbox"
                label-class="CheckboxFilter-Label"
                :value="val[filter.valueKey]"
              >
                {{ val[filter.nameKey] }}
              </BaseCheckbox>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="searched" class="SearchPage-Games">
      <div v-if="filteredGames.length" class="Title Title--type-h4 Cards-Title">
        {{ $t('search.searchResults') }} ({{ filteredGames.length }})
      </div>
      <Games
        class="SearchPage-Cards"
        :games="filteredGames"
        :games-to-show="7"
        start-game-on-click-card
        btn-class="SearchPage-Btn"
      >
        <template #notFound>
          <div class="SearchPage-NotFound ">
            {{ $t('search.nothingFound') }}.
            <br />
            {{ $t('search.try') }}
          </div>
        </template>
        <template v-if="selectedOneFilter" #btn>
          <NuxtLink
            :to="localePath({ path: pathToSelectedFilter, hash: '#games' })"
            class="SearchPage-Btn"
          >
            {{ $t('buttons.loadMoreGames') }}
          </NuxtLink>
        </template>
      </Games>
    </div>
    <div class="SearchPage-Popular">
      <div class="Title Title--type-h4 Cards-Title">
        {{ $t('search.popular') }}
      </div>
      <Games
        class="DefaultGames-Cards"
        :games="popularGames"
        :games-to-show="7"
        start-game-on-click-card
        btn-class="SearchPage-Btn"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import search from '@/mixins/search';
import Search from '@/components/Search';
import Games from '@/components/Games';
import BaseCheckbox from '@/components/base/BaseCheckbox';

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
    BaseCheckbox,
  },
  mixins: [search],
  layout: 'page',
  data() {
    return {
      filters: {
        categoriesList: {
          defaultValue: 'All categories',
          title: 'Categories',
          value: [],
          nameKey: 'name',
          valueKey: 'value',
          values: [
            {
              name: this.$t('gameCategories.top'),
              value: 'top',
            },
            {
              name: this.$t('gameCategories.all'),
              value: 'all',
            },
            {
              name: this.$t('gameCategories.slots'),
              value: 'slots',
            },
            {
              name: this.$t('gameCategories.roulette'),
              value: 'roulette',
            },
            {
              name: this.$t('gameCategories.table'),
              value: 'table',
            },
            {
              name: this.$t('gameCategories.card'),
              value: 'card',
            },
            {
              name: this.$t('gameCategories.new'),
              value: 'new',
            },
            {
              name: this.$t('gameCategories.buybonus'),
              value: 'buybonus',
            },
          ],
          isOpen: false,
        },
        gameProducerList: {
          defaultValue: 'All producers',
          title: 'Producers',
          value: [],
          nameKey: 'name',
          valueKey: 'name',
          values: [],
          isOpen: false,
        },
      },
      filtersAreOpen: false,
    };
  },
  computed: {
    ...mapState(['width', 'defaultCountry']),
    ...mapState('games', ['defaultGames', 'gameProducers']),
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
        if (this.filters.gameProducerList.value.includes(game.gameProducer)) return true;
        let gameIsSelected = false;
        for (let i = 0; i < this.filters.categoriesList.value.length; i++) {
          if (game.categoryList.includes(this.filters.categoriesList.value[i])) {
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
.SearchPage {
  max-width: 600px;
  padding-bottom: 100px;

  &-Title {
    margin: 18px 0;
    font-size: 20px;
  }

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

  &-Filter {
    @media (min-width: $screen-m) {
      flex-shrink: 0;
      margin-right: 56px;

      &:last-child {
        margin-right: 0;
      }
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
    grid-row-gap: 12px;
  }

  .Games-Btn {
    text-align: left;
  }

  .Card {
    flex-direction: row;
    width: auto;
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
  }
}

.CheckboxFilter {
  position: relative;
  padding: 23px 18px;

  @media (min-width: $screen-m) {
    display: flex;
  }

  &-Title {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-faded);

    @media (min-width: $screen-m) {
      display: none;
    }
  }

  &-Footer {
    display: none;

    @media (min-width: $screen-m) {
      display: flex;
      align-items: center;
    }
  }

  &-Inner {
    column-count: 2;

    @media (min-width: $screen-m) {
      position: absolute;
      top: 55px;
      left: 0;
      z-index: 6;
      padding: 30px 25px;
      column-count: 3;
      background-color: var(--color-bg-lighter);
      border-radius: var(--border-radius-default);
    }
  }

  &-Checkbox {
    break-inside: avoid;
    margin-bottom: 17px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .BaseCheckbox-Checkbox:checked + &-Label:before {
    background-color: transparent;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' rx='2' fill='%23E45809'/%3E%3C/svg%3E%0A");
  }

  &-Label {
    padding-left: 30px;
    font-size: 12px;
    font-weight: 700;
    line-height: 15px;
    color: var(--color-text-main);
    text-transform: capitalize;
    white-space: nowrap;

    &:before {
      top: 0;
      left: 0;
      border-radius: var(--border-radius-4);
    }
  }

  &-Default {
    width: 100px;
    margin-right: 8px;
    padding-left: 0;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;

    &--active {
      color: var(--color-text-faded);
    }
  }

  &-ChosenProvider {
    display: flex;
    height: 100%;

    .ThinArrow {
      margin-left: auto;
    }
  }

  &-Submit {
    width: 100%;
    height: 55px;
    font-size: 12px;
    font-weight: 700;
    line-height: 55px;
    text-align: center;
    color: var(--color-main1);
    text-transform: uppercase;
    background: var(--color-bg-lighter);

    @media (min-width: $screen-m) {
      display: none;
    }
  }
}
</style>
