<template>
  <div class="HistoryPage-Content">
    <CabinetFilters :filters="filters" @set-value="setValue" @filter="onFilter" />
    <CabinetTable
      :cols="columns"
      thead
      :rows="historyList"
      :loading="historyListIsLoading"
      :show-more-btn="pageRowsCount > limit && !needsPagination"
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
      maxRowsPerPage: 12,
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
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
    needsPagination() {
      return this.historyList.length >= this.maxRowsPerPage || this.currentPage > 1;
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

      payload.offset = this.offset;
      payload.limit = this.limit;
      return payload;
    },
    totalPages() {
      return Math.ceil(this.pageRowsCount / this.limit);
    },
  },
  watch: {
    currentPage() {
      this.getData(this.filterPayload);
    },
  },
  created() {
    this.getData(this.filterPayload);
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
      this.limit += this.limit;
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
