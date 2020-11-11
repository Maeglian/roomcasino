<template>
  <section class="Page CategoryPage">
    <div class="Title Title--type-h1 Page-Title CategoryPage-Title">
      Game category
    </div>
    <div class="ProvidersSection CategoryPage-ProvidersSection">
      <BaseDropdownContainer
        outerClass="CategoryPage-FiltersTitle"
        innerClass="CategoryPage-FiltersDropdown"
        :beforeWidth.num="768"
        class="CategoryPage-Filters"
        overlay
      >
        <template v-slot:outerContent>
          Filtered by
          <svg class="CabinetFilters-Icon" width="13" height="15">
            <use xlink:href="@/assets/img/icons.svg#filters"></use>
          </svg>
        </template>
        <div v-for="(filter, name) in filters" class="CategoriesFilter" v-click-outside="onClickOutside">
          <div class="CategoriesFilter-Title ">
            {{ filter.title }}
          </div>
          <button
            v-if="filter.type === 'dropdown'"
            class="CategoriesFilter-Footer"
            @click="toggleFilterDropdown(name)">
            <div class="CategoriesFilter-Default">
              {{ filter.defaultValue }}
            </div>
            <i
              class="ThinArrow"
              :class="[ filter.isOpen ? 'ThinArrow--up' : 'ThinArrow--down' ]"
            ></i>
          </button>
          <div
            v-if="filter.type === 'range'"
            class="CategoriesFilter-Footer CategoriesFilter-Footer--center"
          >
            <VueRange
              class="CategoriesFilter-Range"
              v-model="filter.value"
            />
          </div>
          <div v-if="filter.type === 'dropdown'" v-show="filter.isOpen" class="CategoriesFilter-Inner">
            <BaseCheckbox
              class="CategoriesFilter-Checkbox"
              labelClass="CategoriesFilter-Label"
              v-for="val in filter.values"
              v-model="filter.value"
              :value="val"
              :key="val"
            >
              {{ val }}
            </BaseCheckbox>
          </div>
        </div>
        <ProvidersMenu
          class="CategoryPage-ProvidersMenu"
          :providerActive="providerActive"
          :insideFilters="true"
          @chooseProvider="providerActive = $event"
        />
        <button class="CategoriesFilter-Submit">
          Filter
        </button>
      </BaseDropdownContainer>
      <Search class="ProvidersSection-Search CategoryPage-Search" />
    </div>
    <Games :games="games" :gamesToShow="30" />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import ProvidersMenu from '@/components/ProvidersMenu';
import BaseDropdownContainer from '@/components/base/BaseDropdownContainer';
import Search from '@/components/Search';
import Games from '@/components/Games';

export default {
  name: "CategoryPage",
  layout: 'page',
  components: {
    ProvidersMenu,
    Search,
    BaseDropdownContainer,
    Games
  },
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
            'All games', 'Popular', 'New', 'Table games', 'Exclusive', 'Live Casino', 'Top winners', 'Jackpots'
          ]
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
          values: [1, 5, 9, 10, 15, 20, 25]
        },
        rating: {
          title: 'Volatility rating',
          value: [],
          isOpen: false,
          defaultValue: 'All rating',
          type: 'dropdown',
          values: ['All rating', 'High', 'Medium-High']
        },
      },
      providerActive: {
        name: 'All providers',
      },
    }
  },
  computed: {
    ...mapState(['width', 'games']),
  },
  methods: {
    onClickOutside(e) {
      if (!e.target.closest('.CategoriesFilter')) {
        for (const key in this.filters) {
          this.filters[key].isOpen = false;
        }
      }
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
    }
  }
}
</script>

<style lang="scss">
.CategoryPage {
  margin-bottom: 60px;

  @media(min-width: $screen-m) {
    margin-bottom: 80px;
  }

  @media(min-width: $screen-xl) {
    margin-bottom: 100px;
  }

  &-Title {
    margin-top: 16px;
    margin-bottom: 28px;
    text-align: center;

    @media(min-width: $screen-s) {
      margin-top: 42px;
      margin-bottom: 40px;
    }

    @media(min-width: $screen-l) {
      margin-top: 56px;
    }

    @media(min-width: $screen-xl) {
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
    text-transform: uppercase;
    color: var(--color-text-main);
    background: var(--color-bg);

    @media(min-width: $screen-m) {
      display: none;
    }
  }

  &-Filters {
    display: flex;
    flex-direction: column;
    width: 100%;

    @media(min-width: $screen-m) {
      flex-direction: row;
    }
  }

  &-FiltersDropdown {
    @media(min-width: $screen-m) {
      top: auto !important;
      display: flex;
      flex-wrap: wrap;
    }

    &.BaseDropdownContainer-Inner {
      @media(min-width: $screen-m) {
        position: relative;
      }
    }
  }

  &-ProvidersMenu {
    @media(min-width: $screen-m) {
      width: 100%;
      margin-top: 6px;
    }

    @media(min-width: $screen-l) {
      margin-top: 7px;
    }

    @media(min-width: $screen-xl) {
      margin-top: 10px;
    }
  }

  &-Search {
    @media(min-width: $screen-m) {
      height: 32px;
    }

    @media(min-width: $screen-l) {
      height: 42px;
    }

    @media(min-width: $screen-xl) {
      height: 50px;
    }
  }

  &-ProvidersSection {
    margin-bottom: 32px;

    @media(min-width: $screen-m) {
      margin-bottom: 30px;
    }

    @media(min-width: $screen-l) {
      margin-bottom: 40px;
    }
  }
}

.CategoriesFilter {
  position: relative;
  flex-grow: 1;
  display: flex;
  width: 100%;
  height: 60px;
  margin-bottom: 4px;

  @media(min-width: $screen-m) {
    flex-direction: column;
    justify-content: center;
    min-width: 100px;
    width: auto;
    margin-left: 6px;
    margin-bottom: 0;
    padding: 0 16px;
    background-color: var(--color-bg);

    &:first-child {
      margin-left: 0;
    }
  }

  @media(min-width: $screen-l) {
    height: 80px;
    margin-left: 7px;
    padding: 0 18px;
  }

  @media(min-width: $screen-xl) {
    height: 96px;
  }

  &-Title {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    width: 90px;
    height: 100%;
    margin-right: 4px;
    padding-left: 16px;
    padding-right: 10px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-main);
    background-color: var(--color-bg);

    @media(min-width: $screen-m) {
      width: auto;
      height: auto;
      margin-right: 0;
      margin-bottom: 11px;
      padding: 0;
      font-size: 9px;
    }

    @media(min-width: $screen-l) {
      margin-bottom: 14px;
      font-size: 10px;
    }

    @media(min-width: $screen-xl) {
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

    @media(min-width: $screen-m) {
      height: auto;
      padding: 0;
    }

    &--full {
      padding: 0;
    }

    &--center {
      justify-content: center;
    }

    &:focus-visible {
      outline: -webkit-focus-ring-color auto 1px;
    }

    &:-moz-focusring {

    }
  }

  &-Default {
    font-size: 12px;
    color: var(--color-text-ghost);

    @media(min-width: $screen-m) {
      font-size: 10px;
    }

    @media(min-width: $screen-l) {
      font-size: 12px;
    }

    @media(min-width: $screen-xl) {
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

    @media(min-width: $screen-l) {
      top: 87px;
    }

    @media(min-width: $screen-xl) {
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
    font-size: 12px;
    color: var(--color-text-ghost);

    @media(min-width: $screen-m) {
      font-size: 10px;
    }

    @media(min-width: $screen-l) {
      font-size: 12px;
    }

    @media(min-width: $screen-l) {
      font-size: 14px;
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
    text-transform: uppercase;
    color: var(--color-main1);
    background: var(--color-bg-lighter);

    @media(min-width: $screen-m) {
      display: none;
    }
  }
}
</style>
