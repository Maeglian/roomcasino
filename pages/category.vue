<template>
  <section class="CategoryPage">
    <div class="Title Title--type-h1 Page-Title CategoryPage-Title">
      Game category
    </div>
    <div class="ProvidersSection CategoryPage-ProvidersSection">
      <BaseDropdownContainer
        outer-class="CategoryPage-FiltersTitle"
        inner-class="CategoryPage-FiltersDropdown"
        :before-width="768"
        class="CategoryPage-Filters"
        overlay
      >
        <template #outerContent>
          Filtered by
          <svg class="CabinetFilters-Icon" width="13" height="15">
            <use xlink:href="@/assets/img/icons.svg#filters"></use>
          </svg>
        </template>
        <div
          v-for="(filter, name) in filters"
          :key="name"
          v-click-outside="onClickOutside"
          class="CategoriesFilter"
        >
          <div class="CategoriesFilter-Title ">
            {{ filter.title }}
          </div>
          <button
            v-if="filter.type === 'dropdown'"
            class="CategoriesFilter-Footer"
            @click="toggleFilterDropdown(name)"
          >
            <div class="CategoriesFilter-Default">
              {{ filter.defaultValue }}
            </div>
            <i class="ThinArrow" :class="[filter.isOpen ? 'ThinArrow--up' : 'ThinArrow--down']"></i>
          </button>
          <div
            v-if="filter.type === 'range'"
            class="CategoriesFilter-Footer CategoriesFilter-Footer--center"
          >
            <VueRange v-model="filter.value" class="CategoriesFilter-Range" />
          </div>
          <div
            v-if="filter.type === 'dropdown'"
            v-show="filter.isOpen"
            class="CategoriesFilter-Inner"
          >
            <BaseCheckbox
              v-for="val in filter.values"
              :key="val"
              v-model="filter.value"
              class="CategoriesFilter-Checkbox"
              label-class="CategoriesFilter-Label"
              :value="val"
            >
              {{ val }}
            </BaseCheckbox>
          </div>
        </div>
        <ProvidersMenu
          v-if="gameProducerList.length"
          class="CategoryPage-ProvidersMenu"
          :provider-active="providerActive"
          :inside-filters="true"
          @choose-provider="onChooseProvider"
        />
        <button class="CategoriesFilter-Submit">
          Filter
        </button>
      </BaseDropdownContainer>
      <Search
        class="ProvidersSection-Search CategoryPage-Search"
        :class="{ 'CategoryPage-Search--firstLayer': width >= 768 && !this.filters.rating.isOpen }"
      />
    </div>
    <Games :games="games" :games-to-show="30" />
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProvidersMenu from '@/components/ProvidersMenu';
import BaseDropdownContainer from '@/components/base/BaseDropdownContainer';
import Search from '@/components/Search';
import Games from '@/components/Games';
import { DEFAULT_PROVIDER } from '@/config';

export default {
  name: 'CategoryPage',
  components: {
    ProvidersMenu,
    Search,
    BaseDropdownContainer,
    Games,
  },
  layout: 'page',
  data() {
    return {
      filters: {
        game: {
          title: 'Game',
          value: [],
          isOpen: false,
          defaultValue: 'All games',
          type: 'dropdown',
          values: [
            'All games',
            'Popular',
            'New',
            'Table games',
            'Exclusive',
            'Live Casino',
            'Top winners',
            'Jackpots',
          ],
        },
        hit: {
          title: 'Hit rate',
          value: [0, 100],
          min: 0,
          max: 100,
          type: 'range',
        },
        rtp: {
          title: 'Rtp',
          value: [0, 100],
          min: 0,
          max: 100,
          type: 'range',
        },
        lines: {
          title: 'Lines (ways)',
          value: [],
          isOpen: false,
          defaultValue: 'All line',
          type: 'dropdown',
          values: [1, 5, 9, 10, 15, 20, 25],
        },
        rating: {
          title: 'Volatility rating',
          value: [],
          isOpen: false,
          defaultValue: 'All rating',
          type: 'dropdown',
          values: ['All rating', 'High', 'Medium-High'],
        },
      },
      providerActive: DEFAULT_PROVIDER,
    };
  },
  computed: {
    ...mapState(['width', 'games', 'gameProducerList']),
    gamesParams() {
      const params = {};
      if (this.providerActive.name !== 'All providers')
        params.gameProducer = this.providerActive.name;
      return params;
    },
  },
  created() {
    this.getGames();
  },
  methods: {
    ...mapActions(['getGames']),
    onClickOutside(e) {
      if (!e.target.closest('.CategoriesFilter')) {
        for (const key in this.filters) {
          this.filters[key].isOpen = false;
        }
      }
    },
    onChooseProvider(e) {
      this.providerActive = e;
      this.getGames(this.gamesParams);
    },
    toggleFilterDropdown(name) {
      if (this.width < 768) {
        if (!this.filters[name].isOpen) {
          for (const key in this.filters) {
            if (key !== 'name') this.filters[key].isOpen = false;
          }
        }
      }
      this.filters[name].isOpen = !this.filters[name].isOpen;
    },
  },
};
</script>

<style lang="scss">
.CategoryPage {
  margin-bottom: 60px;

  @media (min-width: $screen-m) {
    margin-bottom: 80px;
  }

  @media (min-width: $screen-xl) {
    margin-bottom: 100px;
  }

  &-Title {
    margin-top: 16px;
    margin-bottom: 28px;
    text-align: center;

    @media (min-width: $screen-s) {
      margin-top: 42px;
      margin-bottom: 40px;
    }

    @media (min-width: $screen-l) {
      margin-top: 56px;
    }

    @media (min-width: $screen-xl) {
      margin-top: 64px;
      margin-bottom: 60px;
    }
  }

  &-FiltersTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 16px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      display: none;
    }
  }

  &-Filters {
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (min-width: $screen-m) {
      flex-direction: row;
    }
  }

  &-FiltersDropdown {
    @media (min-width: $screen-m) {
      top: auto !important;
      display: flex;
      flex-wrap: wrap;
    }

    &.BaseDropdownContainer-Inner {
      @media (min-width: $screen-m) {
        position: relative;
      }
    }
  }

  &-ProvidersMenu {
    @media (min-width: $screen-m) {
      width: 100%;
      margin-top: 6px;
    }

    @media (min-width: $screen-l) {
      margin-top: 7px;
    }

    @media (min-width: $screen-xl) {
      margin-top: 10px;
    }
  }

  &-Search {
    @media (min-width: $screen-m) {
      height: 32px;
    }

    @media (min-width: $screen-l) {
      height: 42px;
    }

    @media (min-width: $screen-xl) {
      height: 50px;
    }

    &--firstLayer {
      z-index: 1;
    }
  }

  &-ProvidersSection {
    margin-bottom: 32px;

    @media (min-width: $screen-m) {
      margin-bottom: 30px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 40px;
    }
  }
}

.CategoriesFilter {
  position: relative;
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: 60px;
  margin-bottom: 4px;

  @media (min-width: $screen-m) {
    flex-direction: column;
    justify-content: center;
    width: auto;
    min-width: 100px;
    margin-bottom: 0;
    margin-left: 6px;
    padding: 0 16px;
    background-color: var(--color-bg);

    &:first-child {
      margin-left: 0;
    }
  }

  @media (min-width: $screen-l) {
    height: 80px;
    margin-left: 7px;
    padding: 0 18px;
  }

  @media (min-width: $screen-xl) {
    height: 96px;
  }

  &-Title {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 90px;
    height: 100%;
    margin-right: 4px;
    padding-right: 10px;
    padding-left: 16px;
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
    background-color: var(--color-bg);

    @media (min-width: $screen-m) {
      width: auto;
      height: auto;
      margin-right: 0;
      margin-bottom: 11px;
      padding: 0;
      font-size: 9px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 14px;
      font-size: 10px;
    }

    @media (min-width: $screen-xl) {
      font-size: 12px;
    }
  }

  &-Footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    background-color: var(--color-bg);
    outline: none;

    @media (min-width: $screen-m) {
      height: auto;
      padding: 0;
    }

    &:focus-visible {
      outline: -webkit-focus-ring-color auto 1px;
    }

    &--full {
      padding: 0;
    }

    &--center {
      justify-content: center;
    }

    &:-moz-focusring {
    }
  }

  &-Default {
    font-size: 12px;
    color: var(--color-text-ghost);

    @media (min-width: $screen-m) {
      font-size: 10px;
    }

    @media (min-width: $screen-l) {
      font-size: 12px;
    }

    @media (min-width: $screen-xl) {
      font-size: 14px;
    }
  }

  &-Inner {
    position: absolute;
    top: 66px;
    left: 0;
    z-index: 6;
    width: 100%;
    padding: 20px 16px;
    background-color: var(--color-bg);

    @media (min-width: $screen-l) {
      top: 87px;
    }

    @media (min-width: $screen-xl) {
      top: 103px;
    }
  }

  &-Checkbox {
    margin-bottom: 17px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-Label {
    padding-left: 30px;
    font-size: 12px;
    line-height: 17px;
    color: var(--color-text-ghost);

    @media (min-width: $screen-m) {
      font-size: 10px;
    }

    @media (min-width: $screen-l) {
      font-size: 12px;
    }

    @media (min-width: $screen-l) {
      font-size: 14px;
    }

    &:before {
      top: 0;
      left: 0;
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
