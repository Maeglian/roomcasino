<template>
  <div class="CabinetPage HistoryPage">
    <div class="CabinetPage-Title HistoryPage-Title">
      {{ title }}
    </div>
    <div class="CabinetPage-Tabs">
        <router-link to="/cabinet/history/transactions" class="CabinetPage-Tab">
        Transactions History
      </router-link>
      <router-link to="/cabinet/history/game" class="CabinetPage-Tab">
        Game History
      </router-link>
      <router-link to="/cabinet/history/bonus" class="CabinetPage-Tab">
        Bonus History
      </router-link>
    </div>
    <router-view :key="$route.path" />
    <div class="Table CabinetPage-Table HistoryPage-Table">
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell HistoryPage-Cell CabinetPage-Cell CabinetPage-Th">
          Date
        </div>
        <div class="Table-Cell HistoryPage-Cell CabinetPage-Cell CabinetPage-Th">
          Title
        </div>
        <div class="Table-Cell HistoryPage-Cell CabinetPage-Cell CabinetPage-Th">
          Stage
        </div>
        <div class="Table-Cell HistoryPage-Cell CabinetPage-Cell CabinetPage-Th">
          Amount
        </div>
        <div class="Table-Cell HistoryPage-Cell CabinetPage-Cell CabinetPage-Th">
          Wager
        </div>
        <div class="Table-Cell HistoryPage-Cell CabinetPage-Cell CabinetPage-Th">
          Valid until
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.HistoryPage {
  &-Title {
    margin-bottom: 36px;

    @media (min-width: $screen-m) {
      margin-bottom: 0;
    }
  }
}

</style>
