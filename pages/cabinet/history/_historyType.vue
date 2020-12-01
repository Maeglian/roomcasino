<template>
  <div class="HistoryPage-Content">
    <CabinetFilters :filters="filters" @set-value="setValue" />
    <CabinetTable
      :cols="columns"
      :rows="rowsInPage"
      :pagination="{
        enabled: true,
        currentPage: currentPage,
        totalPages: totalPages,
        count: rows.length,
      }"
      @changePage="currentPage = $event"
      @showMore="rowsPerPage += rowsPerPage"
    />
  </div>
</template>

<script>
import CabinetFilters from '@/components/cabinet/CabinetFilters.vue';
import CabinetTable from '@/components/cabinet/CabinetTable.vue';

export default {
  name: 'HistoryContent',
  components: {
    CabinetFilters,
    CabinetTable,
  },
  layout: 'cabinet',
  async asyncData({ params }) {
    const type = params.historyType;
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
      values: ['Deposit', 'Affiliatere ward'],
    };
    const status = {
      name: 'status',
      type: 'dropdown',
      values: ['Accepted', 'Discarded'],
    };
    let filters;
    if (type === '/cabinet/history/transactions') {
      filters = [currency, actions, status];
    } else if (type === '/cabinet/history/game') {
      filters = [currency, { name: 'from', type: 'date' }, { name: 'to', type: 'date' }];
    } else {
      filters = [currency, status, { name: 'from', type: 'date' }];
    }

    return { filters };
  },
  data() {
    return {
      activeFilters: [],
      filterValues: {},
      rowsPerPage: 6,
      currentPage: 1,
    };
  },
  computed: {
    columns() {
      const transactionColumns = [
        {
          label: 'Date',
          field: 'date',
        },
        {
          label: 'Payment system',
          field: 'payment',
        },
        {
          label: 'Action',
          field: 'action',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Amount',
          field: 'amount',
        },
      ];
      const gamesColumns = [
        {
          label: 'Date',
          field: 'date',
        },
        {
          label: 'Game name',
          field: 'name',
        },
        {
          label: 'Bet sum',
          field: 'bet',
        },
        {
          label: 'Win',
          field: 'win',
        },
      ];
      const bonusColumns = [
        {
          label: 'Date',
          field: 'date',
        },
        {
          label: 'Title',
          field: 'title',
        },
        {
          label: 'Stage',
          field: 'stage',
        },
        {
          label: 'Amount',
          field: 'amount',
        },
        {
          label: 'Wager',
          field: 'wager',
        },
        {
          label: 'Valid until',
          field: 'validUntil',
        },
      ];

      if (this.$route.path === '/cabinet/history/game') return gamesColumns;
      if (this.$route.path === '/cabinet/history/bonus') return bonusColumns;

      return transactionColumns;
    },
    rows() {
      const transactionRows = [
        {
          date: '11 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '18 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '11 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '18 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '11 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '18 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '11 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Credit card',
          action: 'Affiliatere ward',
          status: 'Discarded',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
        {
          date: '18 Jun 2020, 16:33:48',
          payment: 'Yandex money',
          action: 'Deposit',
          status: 'Accepted',
          amount: '316.00 USD',
        },
      ];
      const gamesRows = [
        {
          date: '10 Jun 2020, 16:33:48',
          name: 'Dynamite Riches',
          bet: '36.0 USD',
          win: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          name: 'Dynamite Riches',
          bet: '36.0 USD',
          win: '0 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          name: 'Dynamite Riches',
          bet: '36.0 USD',
          win: '0 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          name: 'Dynamite Riches',
          bet: '36.0 USD',
          win: '0 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          name: 'Dynamite Riches',
          bet: '36.0 USD',
          win: '0 USD',
        },
      ];
      const bonusRows = [
        {
          date: '10 Jun 2020, 16:33:48',
          title: 'Dynamite Riches',
          stage: 'Dynamite Riches',
          amount: '316.00 USD',
          wager: '316.00 USD',
          validUntil: '316.00 USD',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          title: 'Dynamite Riches',
          stage: 'Dynamite Riches',
          amount: '316.00 USD',
          wager: '316.00 USD',
          validUntil: '0',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          title: 'Dynamite Riches',
          stage: 'Dynamite Riches',
          amount: '316.00 USD',
          wager: '316.00 USD',
          validUntil: '0',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          title: 'Dynamite Riches',
          stage: 'Dynamite Riches',
          amount: '316.00 USD',
          wager: '316.00 USD',
          validUntil: '0',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          title: 'Dynamite Riches',
          stage: 'Dynamite Riches',
          amount: '316.00 USD',
          wager: '316.00 USD',
          validUntil: '0',
        },
        {
          date: '10 Jun 2020, 16:33:48',
          title: 'Dynamite Riches',
          stage: 'Dynamite Riches',
          amount: '316.00 USD',
          wager: '316.00 USD',
          validUntil: '0',
        },
      ];

      if (this.$route.path === '/cabinet/history/game') return gamesRows;
      if (this.$route.path === '/cabinet/history/bonus') return bonusRows;

      return transactionRows;
    },
    rowsInPage() {
      const start = this.rowsPerPage * (this.currentPage - 1);
      const end = start + this.rowsPerPage;

      return this.rows.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.rows.length / this.rowsPerPage);
    },
  },
  methods: {
    setValue(value) {
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
