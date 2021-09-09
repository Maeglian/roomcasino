<template>
  <div class="AuthSection" :class="{ 'AuthSection--authenticated': isLoggedIn }">
    <div v-if="isLoggedIn" class="AuthSection-UserSection">
      <NuxtLink class="AuthSection-UserInfo" :to="localePath('/profile/balance')">
        <div class="AuthSection-User">
          <span class="AuthSection-UserName">
            {{ user.firstName || user.email }}
          </span>
          <!--            <span class="AuthSection-Spent">-->
          <!--              8 PC /-->
          <!--            </span>-->
          <!--            <span class="AuthSection-Left">-->
          <!--              25 PC-->
          <!--            </span>-->
        </div>
        <div class="AuthSection-UserBalance">
          <div class="AuthSection-UserBalanceText">{{ $t('menu.yourAccount') }}</div>
          {{ activeAccount.balance !== undefined ? activeAccount.balance : user.balance }}
          {{ activeAccount.currency || user.currency }}
        </div>
      </NuxtLink>
      <NuxtLink v-if="!myAccount" class="AuthSection-UserInfo" :to="localePath('/profile/balance')">
        <BaseIcon class="Icon--fill" name="user" width="20" height="23" />
      </NuxtLink>
    </div>
    <div v-else class="AuthSection-Login">
      <button
        class="Btn Btn--outline AuthSection-Btn AuthSection-Btn--mobile AuthSection-Btn--login"
        @click="showRegistrationDialog('login')"
      >
        {{ $t('buttons.login') }}
      </button>
      <button
        class="Btn Btn--color1 AuthSection-Btn AuthSection-Btn--registration"
        @click="showRegistrationDialog('registration')"
      >
        {{ $t('buttons.signUp') }}
      </button>
    </div>
    <button
      v-if="isLoggedIn"
      class="AuthSection-Btn AuthSection-Btn--mobile AuthSection-Btn--deposit"
      @click="$modal.show('cashier')"
    >
      {{ $t('buttons.deposit') }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';
import BaseIcon from '@/components/base/BaseIcon';

export default {
  name: 'AuthSection',
  components: {
    BaseIcon,
  },
  mixins: [showAuthDialog],
  props: {
    myAccount: {
      type: Boolean,
      required: false,
    },
  },
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
  },
};
</script>

<style lang="scss">
.AuthSection {
  height: 100%;

  &--authenticated {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    @media (min-width: $screen-s) {
      display: flex;
      align-items: center;
    }
  }

  &-Login {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  &-Btn--mobile {
    justify-self: flex-end;
    height: 100%;
    padding: 8px 14px;
    background: var(--color-main1);

    @media (min-width: $screen-s) {
      padding: 9px 21px;
    }
  }

  &-Btn {
    height: 30px;
    font-size: 10px;
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      display: block;
      padding: 0 20px;
    }

    @media (min-width: $screen-xl) {
      height: 47px;
      padding: 0 30px;
      font-size: 12px;
    }

    &--login {
      margin-right: 8px;
    }
  }

  &-Btn--registration.Btn {
    display: none;

    @media (min-width: $screen-m) {
      display: initial;
      background: var(--color-main1);
    }
  }

  &-Btn--deposit {
    margin-left: 12px;
    font-weight: 700;
    color: var(--color-text-main);
    background: var(--color-main1);
    border-radius: 60px;
    cursor: pointer;

    @media (min-width: $screen-xl) {
      margin-left: 24px;
    }

    &:hover {
      background: var(--color-hover2);
    }
  }

  &-Sections {
    display: flex;
    align-items: center;
  }

  &-UserSection {
    justify-self: center;
    display: flex;
    align-items: center;
    height: 100%;
    text-transform: uppercase;
  }

  &-UserInfo {
    display: block;
    margin-right: 12px;
    text-align: right;

    @media (min-width: $screen-m) {
      &:last-child {
        margin-right: 12px;
      }
    }

    &:last-child {
      margin-right: 0;
    }

    img {
      width: 14px;
      @media (min-width: $screen-s) {
        width: 20px;
      }
    }
  }

  &-User {
    font-size: 10px;
    font-weight: 700;

    @media (min-width: $screen-s) {
      font-size: 12px;
    }
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

  &-Box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
  }

  &-UserBalance {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-main);
  }

  &-UserBalanceText {
    display: none;
    margin-bottom: 9px;
  }

  &-UserLvl {
    display: none;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    background: url(../../assets/img/level.png) no-repeat;
    background-size: cover;

    @media (min-width: $screen-m) {
      display: flex;
      width: 28px;
      height: 31px;
      margin-right: 26px;
      font-size: 11px;
      color: var(--color-text-main);
    }
  }

  &-UserMessages {
    position: relative;
    display: none;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-right: 16px;
    background: linear-gradient(356.88deg, rgba(6, 14, 42, 0) -13.82%, #060e2a 105.97%);
    border-radius: 50%;
    cursor: pointer;

    @media (min-width: $screen-s) {
      display: flex;
    }

    @media (min-width: $screen-m) {
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

    @media (min-width: $screen-l) {
      top: 5px;
      right: 5px;
      width: 14px;
      height: 14px;
    }
  }

  &-UserMessagesIcon {
    width: 14px;
    height: 16px;

    @media (min-width: $screen-l) {
      width: 21.4px;
      height: 24.8px;
    }
  }
}

.AuthSection--aside {
  &.AuthSection--authenticated {
    display: grid;
    grid-template-columns: 1fr 1fr;
    order: 0;
    height: auto;

    @media (min-width: $screen-xs) {
      order: 1;
    }
  }

  .AuthSection-Btn {
    width: 100%;
    height: 50px;
    font-size: 14px;
    background: var(--color-main1);
  }

  .AuthSection-Btn--login {
    display: none;
  }

  .AuthSection-Btn--registration {
    display: block;
  }

  .AuthSection-Sections {
    justify-content: space-between;
    padding: 0 32px 18px;

    @media (min-width: $screen-xs) {
      flex-grow: 1;
      flex-shrink: 0;
      padding: 25px;
      background: var(--color-bg-lighter);
    }
  }

  .AuthSection-UserSection {
    justify-self: flex-start;
    display: block;
    order: 0;
    height: auto;

    @media (min-width: $screen-xs) {
      justify-self: center;
      display: flex;
      align-items: stretch;
    }
  }

  .AuthSection-UserBalanceText {
    display: block;
    font-size: 12px;
    color: var(--color-text-ghost);

    @media (min-width: $screen-xs) {
      display: none;
    }
  }

  .AuthSection-UserBalance {
    font-size: 16px;
  }

  .AuthSection-UserMessages {
    display: none;
  }

  .AuthSection-UserInfo {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .AuthSection-UserName {
    display: none;
  }

  .AuthSection-User {
    order: 1;

    @media (min-width: $screen-xs) {
      font-size: 14px;
    }
  }

  .AuthSection-Btn--deposit {
    @media (min-width: $screen-xs) {
      justify-self: center;
      width: auto;
      padding-right: 70px;
      padding-left: 70px;
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

    @media (min-width: $screen-xs) {
      width: 50px;
      height: 56px;

      &:after {
        display: none;
      }
    }

    &:after {
      content: 'LV';
    }
  }
}
</style>
