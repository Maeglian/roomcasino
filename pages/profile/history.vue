<template>
  <div class="CabinetPage HistoryPage">
    <div class="CabinetPage-Title HistoryPage-Title">{{ $t('profile.pages.history') }}</div>
    <div class="Tabs">
      <NuxtLink :to="localePath('/profile/history/transaction')" class="Tabs-Tab">
        {{ $t('profile.history.tabs.transactions') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/profile/history/game')" class="Tabs-Tab">
        {{ $t('profile.history.tabs.game') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/profile/history/bonus')" class="Tabs-Tab">
        {{ $t('profile.history.tabs.bonus') }}
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
