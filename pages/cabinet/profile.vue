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
    margin-top: 18px;
    width: 100%;

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
    padding: 20px 30px;
    font-size: 12px;
    background: rgba(235, 28, 42, 0.4);
  }
}

</style>
