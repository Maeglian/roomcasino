<template>
  <div class="HistoryPage-Content">
    <CabinetFilters
      :filters="historyTables[$route.params.historyType].filters"
      @set-value="setValue"
      @filter="onFilter"
    />
    <CabinetTable
      :cols="historyTables[$route.params.historyType].cols"
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
import CabinetFilters from '@/components/profile/CabinetFilters.vue';
import CabinetTable from '@/components/profile/CabinetTable.vue';
import { mapActions, mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'HistoryContent',
  components: {
    CabinetFilters,
    CabinetTable,
  },
  layout: 'profile',
  data() {
    return {
      maxRowsPerPage: 12,
      limit: 6,
      currentPage: 1,
      historyTables: {
        transaction: {
          cols: [
            {
              label: this.$t('common.date'),
              field: 'actionTime',
              format(x) {
                return moment.unix(x).format('DD MMM YYYY, H:mm:ss');
              },
            },
            {
              label: this.$t('profile.history.table.paymentSystem'),
              field: 'paymentSystem',
            },
            {
              label: this.$t('profile.history.table.action'),
              field: 'action',
            },
            {
              label: this.$t('common.status'),
              field: 'status',
              colClasses(x) {
                if (x === 'done') return 'CabinetTable-Cell--success';
                if (x === 'cancel') return 'CabinetTable-Cell--error';
                return '';
              },
            },
            {
              label: this.$t('common.amount'),
              field: 'amount',
            },
            {
              label: this.$t('common.currency'),
              field: 'currency',
            },
          ],
          filters: {
            currency: {
              label: this.$t('common.currency'),
              type: 'dropdown',
              value: { name: this.$t('filters.allCurrencies'), value: '' },
            },
            status: {
              label: this.$t('common.status'),
              type: 'dropdown',
              values: [
                { name: this.$t('filters.allStatuses'), value: '' },
                { name: 'Done', value: 'done' },
                { name: 'Waiting', value: 'wait' },
                { name: 'Cancelled', value: 'cancel' },
              ],
              value: { name: this.$t('filters.allStatuses'), value: '' },
            },
            from: {
              label: this.$t('filters.until'),
              type: 'date',
              value: '',
            },
          },
        },
        game: {
          cols: [
            {
              label: this.$t('common.date'),
              field: 'actionTime',
              format(x) {
                return moment.unix(x).format('DD MMM YYYY, H:mm:ss');
              },
            },
            {
              label: this.$t('profile.history.table.gameName'),
              field: 'name',
            },
            {
              label: this.$t('profile.history.table.betSum'),
              field: 'betSum',
            },
            {
              label: this.$t('profile.history.table.win'),
              field: 'winSum',
            },
            {
              label: this.$t('common.currency'),
              field: 'currency',
            },
          ],
          filters: {
            currency: {
              label: 'currency',
              type: 'dropdown',
              value: { name: this.$t('filters.allCurrencies'), value: '' },
            },
            from: {
              label: this.$t('filters.until'),
              type: 'date',
              value: '',
            },
          },
        },
        bonus: {
          cols: [
            {
              label: this.$t('common.date'),
              field: 'actionTime',
              format(x) {
                return moment.unix(x).format('DD MMM YYYY, H:mm:ss');
              },
            },
            {
              label: this.$t('common.title'),
              field: 'title',
            },
            {
              label: this.$t('common.status'),
              field: 'status',
            },
            {
              label: this.$t('common.type'),
              field: 'bonusType',
            },
            {
              label: this.$t('common.amount'),
              field: 'amount',
            },
            {
              label: this.$t('common.currency'),
              field: 'currency',
            },
            {
              label: this.$t('common.wager'),
              field: 'wagerRemains',
            },
            {
              label: this.$t('profile.history.table.validUntil'),
              field: 'expireAt',
              format(x) {
                return moment.unix(x).format('DD MMM YYYY, H:mm:ss');
              },
            },
          ],
          filters: {
            currency: {
              label: this.$t('common.currency'),
              type: 'dropdown',
              value: { name: this.$t('filters.allCurrencies'), value: '' },
            },
            status: {
              label: this.$t('common.status'),
              type: 'dropdown',
              values: [
                { name: this.$t('filters.allStatuses'), value: '' },
                { name: 'Active', value: 'active' },
                { name: 'Run out', value: 'runOut' },
                { name: 'Waiting', value: 'hold' },
                { name: 'Paused', value: 'pause' },
                { name: 'Cancelled', value: 'cancel' },
                { name: 'Finished', value: 'wagerDone' },
                { name: 'Not active', value: 'notActive' },
                { name: 'Played', value: 'played' },
              ],
              value: { name: this.$t('filters.allStatuses'), value: '' },
            },
            from: {
              label: this.$t('filters.until'),
              type: 'date',
              value: '',
            },
          },
        },
      },
      currentFilters: {},
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
      const { filters } = this.historyTables[this.$route.params.historyType];
      for (const key in filters) {
        if (typeof filters[key].value === 'object') {
          if (filters[key].value.value) payload[key] = filters[key].value.value;
        } else if (filters[key].value) payload[key] = filters[key].value;
      }
      return payload;
    },
    totalPages() {
      return Math.ceil(this.pageRowsCount / this.limit);
    },
  },
  watch: {
    currentPage() {
      this.getData({ ...this.filterPayload, offset: this.offset, limit: this.limit });
    },
  },
  created() {
    this.getData({ ...this.filterPayload, offset: this.offset, limit: this.limit });
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
      this.historyTables[this.$route.params.historyType].filters[name].value = val;
    },
    onFilter() {
      if (JSON.stringify(this.filterPayload) !== JSON.stringify(this.currentFilters)) {
        this.currentFilters = { ...this.filterPayload };
        this.limit = 6;
        if (this.currentPage !== 1) {
          this.currentPage = 1;
          return;
        }
      }

      this.getData({ ...this.filterPayload, offset: this.offset, limit: this.limit });
    },
    onShowMore() {
      this.limit += this.limit;
      this.getData({ ...this.filterPayload, offset: this.offset, limit: this.limit });
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
