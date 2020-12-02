<template>
  <div class="CabinetPage ProfilePage">
    <div class="CabinetPage-Title ProfilePage-Title">
      User profile
    </div>
    <div class="Tabs">
      <NuxtLink to="/cabinet/profile/general" class="Tabs-Tab">
        General
      </NuxtLink>
      <NuxtLink to="/cabinet/profile/security" class="Tabs-Tab">
        Security
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
    font-size: 12px;
  }
}
</style>
