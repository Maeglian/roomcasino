<template>
  <section class="Page CategoryPage">
    <div class="Title Title--type-h1 Page-Title CategoryPage-Title">
      Game category
    </div>
    <div class="CategoryPage-Filters">
      <template v-for="filter in filters">
        <CheckboxFilter
          v-if="filter.type === 'dropdown'"
          v-model="filter.value"
          :title="filter.title"
          :defaultValue="filter.defaultValue"
          :values="filter.values"
          @change="filter.value = $event"
        />
      </template>
    </div>
  </section>
</template>

<script>
import CheckboxFilter from '@/components/CheckboxFilter.vue';

export default {
  name: "CategoryPage",
  layout: 'page',
  components: {
    CheckboxFilter,
  },
  data() {
    return {
      filters: {
        game: {
          title: 'Game',
          value: [],
          defaultValue: 'All games',
          type: 'dropdown',
          values: [
            'All games', 'Popular', 'New', 'Table games', 'Exclusive', 'Live Casino', 'Top winners', 'Jackpots'
          ]
        },
        hit: {
          title: 'Hit rate',
          value: [],
          type: 'range',
        },
        rtp: {
          title: 'Rtp',
          value: [],
          type: 'range',
        },
        lines: {
          title: 'Lines (ways)',
          value: [],
          defaultValue: 'All line',
          type: 'dropdown',
          values: [1, 5, 9, 10, 15, 20, 25]
        },
        rating: {
          title: 'Volatility rating',
          value: [],
          defaultValue: 'All rating',
          type: 'dropdown',
          values: ['All rating', 'High', 'Medium-High']
        },
      }
    }
  }
}
</script>

<style lang="scss">
.CategoryPage {
  &-Filters {
    display: flex;
    flex-direction: column;
    width: 100%;

    @media(min-width: $screen-m) {
      flex-direction: row;
    }
  }
}

</style>
