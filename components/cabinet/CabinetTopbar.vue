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
    <template v-if="Object.keys(user).length">
      <div class="CabinetTopbar-User">
        <UserAccounts class="CabinetTopbar-UserAccounts" />
        <div class="CabinetTopbar-UserDetails">
          <div class="CabinetTopbar-UserLvl">
            Level 2
          </div>
          <div class="CabinetTopbar-LvlDetails">
            <span class="CabinetTopbar-Spent">
              1000 PC /
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
    </template>
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
  max-width: 100%;
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
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 120px;
    margin-right: 15px;

    @media (min-width: $screen-l) {
      width: 274px / $screen-xl * 100%;
      height: 66px;
      margin-right: 46px;
      padding-left: 37px;
      background: var(--color-bg);
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
    margin-left: auto;
    padding: 13px 0;
    font-size: 10px;
    line-height: 1.2;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      justify-content: flex-start;
      margin-right: 24px;
    }

    @media (min-width: $screen-l) {
      justify-content: flex-end;

      padding: 0;
    }
  }

  &-Spent {
    color: var(--color-text-ghost);
    white-space: nowrap;
  }

  &-Left {
    white-space: nowrap;
  }

  &-Btn {
    display: none;

    @media (min-width: $screen-m) {
      display: inline-flex;
      align-self: stretch;
      padding: 0 18px;
      font-size: 10px;
      text-transform: uppercase;
    }

    @media (min-width: $screen-l) {
      padding: 22px 30px;
    }
  }

  &-UserAccounts {
    @media (min-width: $screen-m) {
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid var(--color-text-ghost);
    }

    .UserAccounts-UserFullname {
      overflow: hidden;
      text-align: right;
      text-overflow: ellipsis;
    }

    .UserAccounts-Value,
    .UserAccounts-Currency {
      color: var(--color-main1);
    }

    .UserAccounts-Balance {
      justify-content: flex-end;
    }

    .AttachedPopup-Popup {
      min-width: auto;
    }
  }

  &-UserDetails {
    display: none;

    @media (min-width: $screen-m) {
      display: block;
    }
  }
}
</style>
