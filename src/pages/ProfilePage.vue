<template>
  <div class="CabinetPage ProfilePage">
    <div class="CabinetPage-Title ProfilePage-Title">
      {{ title }}
    </div>
    <div class="Tabs">
      <router-link to="/cabinet/profile/general" class="Tabs-Tab">
        General
      </router-link>
      <router-link to="/cabinet/profile/security" class="Tabs-Tab">
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
