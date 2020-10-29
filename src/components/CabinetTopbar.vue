<template>
  <div class="CabinetTopbar">
    <router-link class="CabinetTopbar-Logo" to="/">
      <img src="@/assets/img/logo.svg" />
    </router-link>
    <button class="CabinetTopbar-Toggle">
      <svg class="Toggle">
        <use xlink:href="@/assets/img/icons.svg#toggle"></use>
      </svg>
    </button>
    <router-link
      class="CabinetTopbar-Link CabinetTopbar-Profile"
      to="/cabinet/profile"
    >
      Profile
    </router-link>
    <div class="Nav CabinetTopbar-Nav">
      <router-link class="CabinetTopbar-Link" to="/" exact>Home</router-link>
      <router-link class="CabinetTopbar-Link" to="#">All games</router-link>
      <router-link class="CabinetTopbar-Link" to="#">Promotions</router-link>
      <router-link class="CabinetTopbar-Link" to="#">Tournaments</router-link>
    </div>
    <div class="CabinetTopbar-User">
      <div class="CabinetTopbar-UserName">
        {{ user.firstName || '' }} {{ user.lastName || user.email }}
      </div>
      <div class="CabinetTopbar-UserBalance">
        {{ user.balance }} <span class="CabnetTopbar-Currency">{{ user.currency }}</span>
      </div>
    </div>
    <button
      class="CabinetTopbar-Btn Btn Btn--color"
      @click="$modal.show('cashier')"
    >
      Deposit
    </button>
    <CashierForm />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CashierForm from '@/components/CashierForm.vue';

export default {
  name: 'CabinetTopbar',
  components: {
    CashierForm,
  },
  computed: {
    ...mapState(['user']),
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

  @media(min-width: $screen-l) {
    padding: 0;
    background: var(--color-body);
  }

  &-Logo {
    display: none;
    background: var(--color-bg);

    @media(min-width: $screen-l) {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 37px;
      width: 274px / $screen-xl * 100%;
      height: 66px;
      margin-right: 46px;
    }
  }

  &-Toggle {
    margin-right: 10px;

    @media(min-width: $screen-l) {
      display: none;
    }
  }

  &-Profile {
    @media(min-width: $screen-l) {
      display: none;
    }
  }

  &-Nav {
    display: none;

    @media(min-width: $screen-l) {
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

    @media(min-width: $screen-l) {
      display: flex;
      margin-left: auto;
      margin-right: 32px;
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

    @media(min-width: $screen-l) {
      align-self: stretch;
      margin-left: 0;
      padding: 22px 30px;
    }
  }
}

</style>
