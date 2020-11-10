<template>
  <section class="Page CategoryPage">
    <div class="Title Title--type-h1 Page-Title CategoryPage-Title">
      Game category
    </div>
    <div class="CategoryPage-Filters">
      <div v-for="(filter, name) in filters" class="CategoriesFilter" v-click-outside="onClickOutside">
        <div class="CategoriesFilter-Title ">
          {{ filter.title }}
        </div>
        <div
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
        </div>
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
    </div>
    <ProvidersMenu :providerActive="providerActive" @chooseProvider="providerActive = $event" />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import ProvidersMenu from '@/components/ProvidersMenu';

export default {
  name: "CategoryPage",
  layout: 'page',
  components: {
    ProvidersMenu
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
    ...mapState(['width']),
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

  &-Filters {
    display: flex;
    flex-direction: column;
    width: 100%;

    @media(min-width: $screen-m) {
      flex-direction: row;
      margin-bottom: 6px;
    }

    @media(min-width: $screen-l) {
      margin-bottom: 7px;
    }

    @media(min-width: $screen-xl) {
      margin-bottom: 10px;
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
    margin-right: 6px;
    margin-bottom: 0;
    padding: 0 16px;
    background-color: var(--color-bg);

    &:last-child {
      margin-right: 0;
    }
  }

  @media(min-width: $screen-l) {
    height: 80px;
    margin-right: 7px;
    padding: 0 18px;
  }

  @media(min-width: $screen-xl) {
    height: 96px;
  }


  &-Title {
    display: flex;
    align-items: center;
    width: 120px;
    height: 100%;
    margin-right: 4px;
    padding: 0 10px 0 16px;
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

    @media(min-width: $screen-m) {
      height: auto;
      padding: 0;
    }

    &--center {
      justify-content: center;
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
}
</style>
