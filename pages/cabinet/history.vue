<template>
  <div class="CabinetPage HistoryPage">
    <div class="CabinetPage-Title HistoryPage-Title">{{ $t('cabinet.pages.history') }}</div>
    <div class="Tabs">
      <NuxtLink to="/cabinet/history/transaction" class="Tabs-Tab">
        {{ $t('cabinet.history.tabs.transactions') }}
      </NuxtLink>
      <NuxtLink to="/cabinet/history/game" class="Tabs-Tab">
        {{ $t('cabinet.history.tabs.game') }}
      </NuxtLink>
      <NuxtLink to="/cabinet/history/bonus" class="Tabs-Tab">
        {{ $t('cabinet.history.tabs.bonus') }}
      </NuxtLink>
    </div>
    <Nuxt :key="$route.path" />
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
