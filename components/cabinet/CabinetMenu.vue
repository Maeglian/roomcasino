<template>
<nav class="CabinetMenu">
  <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/balance">
    <svg class="CabinetMenu-NavIcon" width="20" height="16" >
      <use xlink:href="@/assets/img/icons.svg#deposit"></use>
    </svg>
      Balance
  </NuxtLink>
  <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/bonuses">
    <svg class="CabinetMenu-NavIcon" width="20" height="18" >
      <use xlink:href="@/assets/img/icons.svg#promotions"></use>
    </svg>
      Bonuses
  </NuxtLink>
  <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/history/transactions">
    <svg class="CabinetMenu-NavIcon" width="22" height="20" >
      <use xlink:href="@/assets/img/icons.svg#history"></use>
    </svg>
    History
  </NuxtLink>
  <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/verification">
    <svg class="CabinetMenu-NavIcon" width="20" height="23" >
      <use xlink:href="@/assets/img/icons.svg#verification"></use>
    </svg>
    Verification
  </NuxtLink>
  <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/profile/general">
    <svg class="CabinetMenu-NavIcon" width="20" height="22" >
      <use xlink:href="@/assets/img/icons.svg#user"></use>
    </svg>
    Profile
  </NuxtLink>
  <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/limits">
    <svg class="CabinetMenu-NavIcon" width="20" height="20" >
      <use xlink:href="@/assets/img/icons.svg#options"></use>
    </svg>
    Gambling limits
  </NuxtLink>
  <div class="CabinetMenu-NavLink" @click="onClickExitBtn()">
    <svg class="CabinetMenu-NavIcon" width="22" height="18" >
      <use xlink:href="@/assets/img/icons.svg#exit"></use>
    </svg>
    Exit
  </div>
</nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CabinetMenu',
  methods: {
    ...mapActions(['logout']),
    onClickExitBtn() {
      this.logout().then(() => this.$router.push('/'));
    },
  },
};
</script>

<style lang="scss">
.CabinetMenu {
  display: flex;
  justify-content: space-between;
  min-width: 100%;
  margin-bottom: 36px;
  padding: 0 11px;
  background: var(--color-bg);
  overflow: auto;

  @media(min-width: $screen-l) {
    flex-shrink: 0;
    display: block;
    min-width: auto;
    width: 274px / $screen-xl * 100%;
    height: 100vh;
    padding: 0;
  }

  &-NavLink {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 19px;
    margin-bottom: 0;
    padding: 10px 5px;
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    @media(min-width: $screen-l) {
      flex-direction: row;
      justify-content: flex-start;
      margin-right: 0;
      padding: 10px 0 10px 37px;
      font-size: 12px;
    }

    &.router-link-active {
      padding: 10px 5px 6px 5px;
      border-bottom: 4px solid var(--color-main1);
      color: var(--color-main1);

      @media(min-width: $screen-l) {
        padding: 10px 5px 10px 29px;
        border-left: 8px solid var(--color-main1);
        border-bottom: none;
      }
    }
  }

  &-NavIcon {
    margin-bottom: 6px;

    @media(min-width: $screen-l) {
      margin-right: 22px;
      margin-bottom: 0;
    }
  }
}

</style>
