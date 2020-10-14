<template>
  <div class="HistoryPage-Content">
    <CabinetFilters :filters="filters" @set-value="setValue" />
  </div>
</template>

<script>
import CabinetFilters from '@/components/CabinetFilters.vue';

export default {
  name: 'HistoryContent',
  components: {
    CabinetFilters,
  },
  data() {
    return {
      activeFilters: [],
      filterValues: {},
    };
  },
  computed: {
    filters() {
      const currency = {
        name: 'currency',
        type: 'dropdown',
        values: [
          'SEK - Swedish krona',
          'CNY - Chinese Renminbi Yuan',
          'BTC - Bitcoin',
          'CAD - Canadian dollar',
          'USD - American dollar',
          'EUR - Euro',
        ],
      };

      const actions = {
        name: 'action',
        type: 'dropdown',
        values: [
          'Deposit',
          'Affiliatere ward',
        ],
      };

      const status = {
        name: 'status',
        type: 'dropdown',
        values: ['Accepted', 'Discarded'],
      };

      if (this.$route.path === '/cabinet/history/transactions') {
        return [currency, actions, status];
      }

      if (this.$route.path === '/cabinet/history/game') {
        return [
          currency,
          { name: 'from', type: 'date' },
          { name: 'to', type: 'date' },
        ];
      }

      if (this.$route.path === '/cabinet/history/bonus') {
        return [
          currency,
          status,
          { name: 'from', type: 'date' },
        ];
      }

      return [];
    },
  },
  methods: {
    setValue(value) {
      console.log(value);
      const { name, val } = value;
      this.filterValues[name] = val;
    },
  },
};
</script>

<style lang="scss">
.HistoryPage {
  &-Content {
    width: 100%;
  }
}

</style>
