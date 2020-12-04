<template>
  <div class="HistoryPage-Content">
    <CabinetFilters :key="$route.path" :filters="filters" @set-value="setValue" />
    <CabinetTable
      :cols="columns"
      :rows="rowsInPage"
      :loading="historyListIsLoading"
      :pagination="{
        enabled: true,
        currentPage: currentPage,
        totalPages: totalPages,
        count: historyList.length,
      }"
      @changePage="currentPage = $event"
      @showMore="rowsPerPage += rowsPerPage"
    />
  </div>
</template>

<script>
import CabinetFilters from '@/components/cabinet/CabinetFilters.vue';
import CabinetTable from '@/components/cabinet/CabinetTable.vue';
import { mapActions, mapState, mapGetters } from 'vuex';
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
    ]),
    ...mapGetters(['currencyAccounts']),
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
    rowsInPage() {
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
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapActions(['getTransactionHistoryList', 'getBonusHistoryList', 'getGameHistoryList']),
    setValue(value) {
      const { name, val } = value;
      this.filters[name].value = val;
    },
    getData() {
      // const actionType = `get${this.$route.params.historyType[0].toUpperCase()}${this.$route.params.historyType.slice(
      //   1,
      // )}`;
      // console.log(actionType);
      switch (this.$route.params.historyType) {
        case 'game':
          this.getGameHistoryList();
          break;
        case 'bonus':
          this.getBonusHistoryList();
          break;
        default:
          this.getTransactionHistoryList();
      }
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
