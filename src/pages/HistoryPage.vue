<template>
  <div class="CabinetPage HistoryPage">
    <div class="CabinetPage-Title HistoryPage-Title">
      {{ title }}
    </div>
    <div class="Tabs">
        <router-link to="/cabinet/history/transactions" class="Tabs-Tab">
        Transactions History
      </router-link>
      <router-link to="/cabinet/history/game" class="Tabs-Tab">
        Game History
      </router-link>
      <router-link to="/cabinet/history/bonus" class="Tabs-Tab">
        Bonus History
      </router-link>
    </div>
    <router-view :key="$route.path" />
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
