<template>
  <div class="CabinetPage HistoryPage">
    <div class="CabinetPage-Title HistoryPage-Title">
      History
    </div>
    <div class="Tabs">
      <NuxtLink to="/cabinet/history/transactions" class="Tabs-Tab">
        Transactions History
      </NuxtLink>
      <NuxtLink to="/cabinet/history/game" class="Tabs-Tab">
        Game History
      </NuxtLink>
      <NuxtLink to="/cabinet/history/bonus" class="Tabs-Tab">
        Bonus History
      </NuxtLink>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
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
