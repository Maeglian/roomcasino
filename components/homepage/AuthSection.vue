<template>
  <div class="AuthSection" :class="{'AuthSection--authenticated': isLoggedIn}">
    <div v-if="isLoggedIn" class="AuthSection-UserSection">
      <div class="AuthSection-Sections">
        <NuxtLink class="AuthSection-UserInfo" to="/cabinet/balance">
          <div class="AuthSection-User">
            <span class="AuthSection-UserName">
              {{ user.firstName || user.email }}
            </span>
            <span class="AuthSection-Spent">
              8 PC /
            </span>
            <span class="AuthSection-Left">
               25 PC
            </span>
          </div>
          <div class="AuthSection-UserBalance">
            <div class="AuthSection-UserBalanceText">
              Your balance
            </div>
            {{ activeAccount.balance !== undefined ? activeAccount.balance : user.balance }} {{ activeAccount.currency || user.currency }}
          </div>
        </NuxtLink>
        <div class="AuthSection-UserLvl">
          2
        </div>
        <div class="AuthSection-UserMessages" @click="toggleNotificationsPanel">
          <svg class="AuthSection-UserMessagesIcon">
            <use xlink:href="@/assets/img/icons.svg#messages"></use>
          </svg>
          <div v-show="isNewNotifications" class="AuthSection-UserMessagesNew"></div>
        </div>
      </div>
      <button
        class="Btn AuthSection-Btn AuthSection-Btn--deposit"
        @click="$modal.show('cashier')"
      >
        Deposit
      </button>
    </div>
    <div v-else class="AuthSection-Login">
      <button
        class="Btn Btn--text AuthSection-Btn AuthSection-Btn--login"
        @click="showRegistrationDialog('login')"
      >
        Login
      </button>
      <button
        class="Btn AuthSection-Btn"
        @click="showRegistrationDialog('registration')"
      >
        Register
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'AuthSection',
  mixins: [showAuthDialog],
  computed: {
    ...mapState(['user', 'notificationsPanelIsOpen']),
    ...mapGetters(['isLoggedIn', 'activeAccount', 'isNewNotifications']),
  },
  methods: {
    ...mapMutations(['openNotificationsPanel', 'closeNotificationsPanel']),
    toggleNotificationsPanel() {
      if (this.notificationsPanelIsOpen) this.closeNotificationsPanel();
      else this.openNotificationsPanel();
    },
  }
};
</script>

<style lang="scss">
.AuthSection {
  &-Login {
    display: none;

    @media(min-width: $screen-m) {
      display: flex;
      align-items: center;
      margin-left: auto;
    }
  }

  &-Btn {
    @media(min-width: $screen-m) {
      display: block;
      padding: 25px;
      font-size: 10px;
    }

    @media(min-width: $screen-xl) {
      padding: 30px;
      font-size: 12px;
    }
  }

  &-Sections {
    display: flex;
    align-items: center;
  }

  &-UserSection {
    display: flex;
    align-items: center;
    padding-right: 18px;
    padding-left: 18px;
    text-transform: uppercase;

    @media(min-width: $screen-xs) {
      padding: 0;
    }
  }

  &-UserInfo {
    display: none;

    @media(min-width: $screen-m) {
      display: block;
      margin-right: 12px;
      text-align: right;
    }
  }

  &-User {
    font-size: 12px;
    font-weight: 700;
  }

  &-UserName {
    color: var(--color-main1);
  }

  &-Spent {
    color: var(--color-text-ghost);
  }

  &-Left {
    color: var(--color-text-main);
  }

  &-UserBalance {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-main);
  }

  &-UserBalanceText {
    display: none;
  }

  &-UserLvl {
    display: none;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    background: url(../../assets/img/level.png) no-repeat;
    background-size: cover;

    @media(min-width: $screen-m) {
      display: flex;
      width: 28px;
      height: 31px;
      margin-right: 26px;
      font-size: 11px;
      color: var(--color-text-main);
    }
  }

  &-UserMessages {
    flex-shrink: 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-right: 16px;
    background: linear-gradient(356.88deg, rgba(6, 14, 42, 0) -13.82%, #060E2A 105.97%);
    border-radius: 50%;
    cursor: pointer;

    @media(min-width: $screen-m) {
      margin-right: 30px;
      background: transparent;
    }
  }

  &-UserMessagesNew {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 10px;
    height: 10px;
    background: var(--color-error);
    border: 1px solid var(--color-body);
    border-radius: 50%;

    @media(min-width: $screen-l) {
      top: 5px;
      right: 5px;
      width: 14px;
      height: 14px;
    }
  }

  &-UserMessagesIcon {
    width: 14px;
    height: 16px;

    @media(min-width: $screen-l) {
      width: 21.4px;
      height: 24.8px;
    }
  }
}

.AuthSection--aside {
  &.AuthSection--authenticated {
    order: 0;

    @media(min-width: $screen-xs) {
      order: 1;
    }
  }

  .AuthSection-Login {
    display: block;
  }

  .AuthSection-Btn {
    display: block;
    width: 100%;
    padding: 18px 0;

    @media(min-width: $screen-m) {
      font-size: 18px;
    }
  }

  .AuthSection-Sections {
    justify-content: space-between;
    padding: 0 32px 18px;

    @media(min-width: $screen-xs) {
      flex-shrink: 0;
      flex-grow: 1;
      padding: 25px;
      background: var(--color-bg-lighter);
    }
  }

  .AuthSection-UserSection {
    order: 0;
    display: block;
    margin-bottom: 20px;

    @media(min-width: $screen-xs) {
      display: flex;
      align-items: stretch;
      margin-bottom: 0;
    }
  }

  .AuthSection-UserBalanceText {
    display: block;
    font-size: 12px;
    color: var(--color-text-ghost);

    @media(min-width: $screen-xs) {
      display: none;
    }
  }

  .AuthSection-UserBalance {
    margin-bottom: 16px;
    font-size: 16px;
  }

  .AuthSection-UserMessages {
    display: none;
  }

  .AuthSection-UserInfo {
    display: flex;
    flex-direction: column;
    text-align: left;

    @media(min-width: $screen-xs) {
      margin-right: auto;
    }
  }

  .AuthSection-UserName {
    display: none;
  }

  .AuthSection-User {
    order: 1;

    @media(min-width: $screen-xs) {
      font-size: 14px;
    }
  }

  .AuthSection-Btn--deposit {
    @media(min-width: $screen-xs) {
      width: auto;
      padding-left: 70px;
      padding-right: 70px;
    }
  }

  .AuthSection-UserLvl {
    display: flex;
    width: 56px;
    height: 63px;
    margin-right: 0;
    font-size: 16px;
    color: var(--color-text-main);
    background-size: cover;

    &:after {
      content: 'LV';
    }

    @media(min-width: $screen-xs) {
      width: 50px;
      height: 56px;

      &:after {
        display: none;
      }
    }
  }

  .AuthSection-Btn--login {
    margin-bottom: 8px;
    background: var(--color-bg-lighter);
  }
}
</style>
