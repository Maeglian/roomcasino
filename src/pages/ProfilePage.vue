<template>
  <div class="CabinetPage ProfilePage">
    <div class="CabinetPage-Title ProfilePage-Title">
      {{ title }}
    </div>
    <div class="CabinetPage-Tabs">
      <router-link to="/cabinet/profile/general" class="CabinetPage-Tab">
        General
      </router-link>
      <router-link to="/cabinet/profile/security" class="CabinetPage-Tab">
        Security
      </router-link>
    </div>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
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
.ProfilePage {
  &-Content {
    margin-top: 18px;
    width: 100%;

    @media (min-width: $screen-m) {
      margin-top: 24px;
    }
  }
}

</style>
