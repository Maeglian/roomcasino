<template>
  <div class="CabinetPage ProfilePage">
    <div class="CabinetPage-Title ProfilePage-Title">{{ $t('cabinet.profile.title') }}</div>
    <div class="Tabs">
      <NuxtLink :to="localePath('/cabinet/profile/general')" class="Tabs-Tab">
        {{ $t('cabinet.profile.tabs.general') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/cabinet/profile/security')" class="Tabs-Tab">
        {{ $t('cabinet.profile.tabs.security') }}
      </NuxtLink>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
};
</script>

<style lang="scss">
.ProfilePage {
  &-Content {
    width: 100%;
    margin-top: 18px;

    @media (min-width: $screen-m) {
      margin-top: 24px;
    }
  }

  &-Title {
    margin-bottom: 36px;

    @media (min-width: $screen-m) {
      margin-bottom: 0;
    }
  }

  &-Btn {
    height: 55px;
    margin-left: auto;
    padding-right: 30px;
    padding-left: 30px;
    font-size: 12px;
    text-transform: uppercase;
  }
}
</style>
