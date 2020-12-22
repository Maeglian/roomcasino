<template>
  <div class="CabinetTopbar">
    <NuxtLink class="CabinetTopbar-Logo" to="/">
      <img src="@/assets/img/logo.svg" />
    </NuxtLink>
    <NuxtLink class="CabinetTopbar-Link CabinetTopbar-Profile" to="/cabinet/profile/general">
      Profile
    </NuxtLink>
    <div class="Nav CabinetTopbar-Nav">
      <NuxtLink class="CabinetTopbar-Link" to="/" exact>Home</NuxtLink>
      <NuxtLink class="CabinetTopbar-Link" to="/category">All games</NuxtLink>
      <NuxtLink class="CabinetTopbar-Link" to="/promotions">Promotions</NuxtLink>
      <NuxtLink class="CabinetTopbar-Link" to="/tournaments">Tournaments</NuxtLink>
    </div>
    <UserAccounts class="CabinetTopbar-User" />
    <button class="CabinetTopbar-Btn Btn Btn--color" @click="$modal.show('cashier')">
      Deposit
    </button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import UserAccounts from '@/components/UserAccounts';

export default {
  name: 'CabinetTopbar',
  components: {
    UserAccounts,
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['activeAccount']),
  },
};
</script>

<style lang="scss">
.CabinetTopbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 16px;
  padding-bottom: 8px;
  padding-left: 16px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
  background: var(--color-bg);

  @media (min-width: $screen-l) {
    padding: 0;
    background: var(--color-body);
  }

  &-Logo {
    display: none;
    background: var(--color-bg);

    @media (min-width: $screen-l) {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      width: 274px / $screen-xl * 100%;
      height: 66px;
      margin-right: 46px;
      padding-left: 37px;
    }
  }

  &-Profile {
    @media (min-width: $screen-l) {
      display: none;
    }
  }

  &-Nav {
    display: none;

    @media (min-width: $screen-l) {
      display: flex;
    }
  }

  &-Link {
    margin-right: 30px;
    color: var(--color-text-main);

    &:last-child {
      margin-right: 0;
    }
  }

  &-User {
    display: none;

    @media (min-width: $screen-l) {
      display: flex;
      margin-right: 32px;
      margin-left: auto;
      color: var(--color-text-main);
    }
  }

  &-UserName {
    margin-right: 20px;
  }

  &-Currency {
    color: var(--color-text-ghost);
  }

  &-Btn {
    margin-left: auto;
    padding: 11px 18px;
    font-size: 10px;
    text-transform: uppercase;

    @media (min-width: $screen-l) {
      align-self: stretch;
      margin-left: 0;
      padding: 22px 30px;
    }
  }
}
</style>
