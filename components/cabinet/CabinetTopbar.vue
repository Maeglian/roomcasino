<template>
  <div class="CabinetTopbar">
    <NuxtLink class="CabinetTopbar-Logo" to="/">
      <img src="@/assets/img/logo.svg" />
    </NuxtLink>
    <div class="Nav CabinetTopbar-Nav">
      <NuxtLink class="CabinetTopbar-Link" to="/" exact>Home</NuxtLink>
      <NuxtLink class="CabinetTopbar-Link" to="/promotions">Promotions</NuxtLink>
      <NuxtLink class="CabinetTopbar-Link" to="/tournaments">Tournaments</NuxtLink>
    </div>
    <div class="CabinetTopbar-User">
      <UserAccounts class="CabinetTopbar-UserAccounts" />
      <div class="CabinetTopbar-UserDetails">
        <div class="CabinetTopbar-UserLvl">
          Level 2
        </div>
        <div class="CabinetTopbar-LvlDetails">
          <span class="CabinetTopbar-Spent">
            1000 pc /
          </span>
          <span class="CabinetTopbar-Left">
            4 999 PC
          </span>
        </div>
      </div>
    </div>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 13px 0;
    font-size: 10px;
    line-height: 1.2;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      justify-content: flex-start;
    }

    @media (min-width: $screen-l) {
      justify-content: flex-end;
      margin-right: 24px;
      padding: 0;
    }
  }

  &-UserLvl {
    text-align: right;

    @media (min-width: $screen-m) {
      text-align: left;
    }
  }

  &-Spent {
    color: var(--color-text-ghost);
  }

  &-Btn {
    display: none;

    @media (min-width: $screen-m) {
      display: inline-flex;
      align-self: stretch;
      margin-left: auto;
      padding: 0 18px;
      font-size: 10px;
      text-transform: uppercase;
    }

    @media (min-width: $screen-l) {
      margin-left: 0;
      padding: 22px 30px;
    }
  }

  &-UserAccounts {
    @media (min-width: $screen-m) {
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid var(--color-text-ghost);
    }

    .UserAccounts-Value,
    .UserAccounts-Currency {
      color: var(--color-main1);
    }

    .UserAccounts-Balance {
      @media (min-width: $screen-m) {
        text-align: right;
      }
    }

    .AttachedPopup-Popup {
      min-width: auto;
    }
  }
}
</style>
