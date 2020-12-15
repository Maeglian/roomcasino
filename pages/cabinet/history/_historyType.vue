<template>
  <div class="HistoryPage-Content">
    <CabinetFilters
      :key="$route.path"
      :filters="filters"
      @set-value="setValue"
      @filter="onFilter"
    />
    <CabinetTable
      :cols="columns"
      thead
      :rows="rowsInPage"
      :loading="historyListIsLoading"
      :show-more-btn="!needsPagination"
      :pagination="{
        enabled: needsPagination,
        currentPage: currentPage,
        totalPages: totalPages,
        count: historyList.length,
      }"
      @change-page="currentPage = $event"
      @show-more="onShowMore"
    />
  </div>
</template>

<script>
import CabinetFilters from '@/components/cabinet/CabinetFilters.vue';
import CabinetTable from '@/components/cabinet/CabinetTable.vue';
import { mapActions, mapState } from 'vuex';
import { HISTORY_TABLES } from '@/config';

export default {
  name: 'HistoryContent',
  components: {
    CabinetFilters,
    CabinetTable,
  },
  layout: 'cabinet',
  data() {
    return {
      activeFilters: [],
      rowsPerPage: 6,
      limit: 6,
      currentPage: 1,
      columns: HISTORY_TABLES[this.$route.params.historyType].cols,
      filters: HISTORY_TABLES[this.$route.params.historyType].filters,
    };
  },
  computed: {
    ...mapState([
      'transactionHistoryList',
      'gameHistoryList',
      'bonusHistoryList',
      'historyListIsLoading',
      'pageRowsCount',
    ]),
    needsPagination() {
      return this.historyList.length > 6;
    },
    historyList() {
      switch (this.$route.params.historyType) {
        case 'game':
          return this.gameHistoryList;
        case 'bonus':
          return this.bonusHistoryList;
        default:
          return this.transactionHistoryList;
      }
    },
    filterPayload() {
      const payload = {};
      for (const key in this.filters) {
        if (typeof this.filters[key].value === 'object') {
          if (this.filters[key].value.value) payload[key] = this.filters[key].value.value;
        } else if (this.filters[key].value) payload[key] = this.filters[key].value;
      }

      payload.limit = this.limit;
      return payload;
    },
    rowsInPage() {
      if (!this.needsPagination) return this.historyList;
      const start = this.rowsPerPage * (this.currentPage - 1);
      const end = start + this.rowsPerPage;

      return this.historyList.slice(start, end);
    },
    totalPages() {
      if (!this.historyList.length) return 0;
      return Math.ceil(this.historyList.length / this.rowsPerPage);
    },
  },
  watch: {
    $route() {
      this.getData();
    },
    historyList() {
      if (this.historyList.length > 12) this.rowsPerPage = 12;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapActions(['getTransactionHistoryList', 'getBonusHistoryList', 'getGameHistoryList']),
    getData(payload = {}) {
      switch (this.$route.params.historyType) {
        case 'game':
          this.getGameHistoryList(payload);
          break;
        case 'bonus':
          this.getBonusHistoryList(payload);
          break;
        default:
          this.getTransactionHistoryList(payload);
      }
    },
    setValue(value) {
      const { name, val } = value;
      this.filters[name].value = val;
    },
    onFilter() {
      this.getData(this.filterPayload);
    },
    onShowMore() {
      this.limit += this.rowsPerPage;
      this.getData(this.filterPayload);
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
