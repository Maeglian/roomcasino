<template>
  <nav class="CabinetMenu">
    <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/balance">
      <svg class="CabinetMenu-NavIcon" width="20" height="16">
        <use xlink:href="@/assets/img/icons.svg#deposit"></use>
      </svg>
      {{ $t('cabinet.pages.balance') }}
    </NuxtLink>
    <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/bonuses">
      <svg class="CabinetMenu-NavIcon" width="20" height="18">
        <use xlink:href="@/assets/img/icons.svg#promotions"></use>
      </svg>
      {{ $t('cabinet.pages.bonuses') }}
    </NuxtLink>
    <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/history/transaction">
      <svg class="CabinetMenu-NavIcon" width="22" height="20">
        <use xlink:href="@/assets/img/icons.svg#history"></use>
      </svg>
      {{ $t('cabinet.pages.history') }}
    </NuxtLink>
    <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/verification">
      <svg class="CabinetMenu-NavIcon" width="20" height="23">
        <use xlink:href="@/assets/img/icons.svg#verification"></use>
      </svg>
      {{ $t('cabinet.pages.verification') }}
    </NuxtLink>
    <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/profile/general">
      <svg class="CabinetMenu-NavIcon" width="20" height="22">
        <use xlink:href="@/assets/img/icons.svg#user"></use>
      </svg>
      {{ $t('cabinet.pages.profile') }}
    </NuxtLink>
    <NuxtLink class="CabinetMenu-NavLink" to="/cabinet/limits">
      <svg class="CabinetMenu-NavIcon" width="20" height="20">
        <use xlink:href="@/assets/img/icons.svg#options"></use>
      </svg>
      {{ $t('cabinet.pages.limits') }}
    </NuxtLink>
    <div class="CabinetMenu-NavLink" @click="onClickExitBtn()">
      <svg class="CabinetMenu-NavIcon" width="22" height="18">
        <use xlink:href="@/assets/img/icons.svg#exit"></use>
      </svg>
      {{ $t('cabinet.pages.exit') }}
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
  overflow: auto;
  background: var(--color-bg);

  @media (min-width: $screen-l) {
    display: block;
    flex-shrink: 0;
    width: 274px / $screen-xl * 100%;
    min-width: auto;
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

    @media (min-width: $screen-l) {
      flex-direction: row;
      justify-content: flex-start;
      margin-right: 0;
      padding: 10px 0 10px 37px;
      font-size: 12px;
    }

    &:last-child {
      margin-right: 0;
    }

    &.router-link-active {
      padding: 10px 5px 6px 5px;
      color: var(--color-main1);
      border-bottom: 4px solid var(--color-main1);

      @media (min-width: $screen-l) {
        padding: 10px 5px 10px 29px;
        border-bottom: none;
        border-left: 8px solid var(--color-main1);
      }
    }
  }

  &-NavIcon {
    margin-bottom: 6px;

    @media (min-width: $screen-l) {
      margin-right: 22px;
      margin-bottom: 0;
    }
  }
}
</style>
