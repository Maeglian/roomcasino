<template>
  <nav class="MobileNav" :class="{ 'MobileNav--notLoggedIn': !isLoggedIn }">
    <template v-if="isLoggedIn">
      <button class="MobileNav-Item" @click="toggleNav()">
        <svg class="MobileNav-Toggle Toggle Toggle--colored">
          <use xlink:href="@/assets/img/icons.svg#toggle"></use>
        </svg>
        <div class="MobileNav-Name">{{ $t('menu.menu') }}</div>
      </button>
      <NuxtLink class="MobileNav-Item" :to="localePath('/promotions')">
        <svg width="17" height="16">
          <use xlink:href="@/assets/img/icons.svg#promotions"></use>
        </svg>
        <div class="MobileNav-Name">{{ $t('pages.promotion') }}</div>
      </NuxtLink>
      <button class="MobileNav-Item" @click="onClickBtn()">
        <svg width="18" height="15">
          <use xlink:href="@/assets/img/icons.svg#deposit"></use>
        </svg>
        <div class="MobileNav-Name">{{ $t('buttons.deposit') }}</div>
      </button>
      <button v-if="chatIsLoaded" class="MobileNav-Item" @click="onClickSupport">
        <svg width="18" height="15">
          <use xlink:href="@/assets/img/icons.svg#support"></use>
        </svg>
        <div class="MobileNav-Name">{{ $t('menu.support') }}</div>
      </button>
      <!--    <div class="MobileNav-Item" @click="toggleNotificationsPanel">-->
      <!--      <div class="MobileNav-Messages">-->
      <!--        <svg width="12" height="14">-->
      <!--          <use xlink:href="@/assets/img/icons.svg#messages"></use>-->
      <!--        </svg>-->
      <!--        <div v-show="isNewNotifications" class="MobileNav-MessagesNew"></div>-->
      <!--      </div>-->
      <!--      <div class="MobileNav-Name">-->
      <!--        Notification-->
      <!--      </div>-->
      <!--    </div>-->
    </template>
    <template v-else>
      <button class="MobileNav-Item--row" @click="showRegistrationDialog('login')">
        <img class="MobileNav-Icon2" src="@/assets/img/user.svg" width="15" />
        <div class="MobileNav-Name MobileNav-Name--large">{{ $t('buttons.logIn') }}</div>
      </button>
      <button class="MobileNav-Item--row" @click="showRegistrationDialog('registration')">
        <img class="MobileNav-Icon2" src="@/assets/img/arrow.svg" width="15" />
        <div class="MobileNav-Name MobileNav-Name--large">{{ $t('buttons.joinNow') }}</div>
      </button>
      <button class="MobileNav-Item MobileNav-Item--burger" @click="toggleNav()">
        <svg class="MobileNav-Toggle2 Toggle Toggle--colored">
          <use xlink:href="@/assets/img/icons.svg#toggle"></use>
        </svg>
      </button>
    </template>
  </nav>
</template>

<script>
import showAuthDialog from '@/mixins/showAuthDialog';
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'MobileNav',
  mixins: [showAuthDialog],
  computed: {
    ...mapState(['navIsOpen', 'notificationsPanelIsOpen', 'chatIsLoaded']),
    ...mapGetters(['isLoggedIn', 'activeAccount', 'isNewNotifications']),
  },
  methods: {
    ...mapMutations(['openNav', 'closeNav', 'openNotificationsPanel', 'closeNotificationsPanel']),
    toggleNav() {
      if (this.navIsOpen) this.closeNav();
      else this.openNav();
    },
    toggleNotificationsPanel() {
      if (this.notificationsPanelIsOpen) this.closeNotificationsPanel();
      else this.openNotificationsPanel();
    },
    onClickSupport() {
      window.LC_API.open_chat_window();
    },
  },
};
</script>

<style lang="scss">
.MobileNav {
  position: fixed;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 18px 24px 20px;
  background: var(--color-body);
  transform: translateZ(0);

  @media (min-width: $screen-xs) {
    display: none;
  }

  &--notLoggedIn {
    align-items: center;
    padding: 16px 0;
  }

  &-Item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &--row {
      display: flex;
      flex-grow: 1;
      justify-content: center;
      border-right: 1px solid var(--color-border2);
    }

    &--burger {
    }
  }

  &-Messages {
    position: relative;
  }

  &-Icon {
    width: 12px;
    height: 14px;
  }

  &-Icon2 {
    margin-right: 10px;
  }

  &-Name {
    font-size: 7px;
    font-weight: 400;
    line-height: 1.66;
    color: var(--color-text-main);
    text-transform: uppercase;

    &--large {
      font-size: 12px;
      font-weight: 700;
    }
  }

  &-MessagesNew {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: var(--color-error);
    border: 1px solid var(--color-body);
    border-radius: 50%;
  }

  &-Toggle {
    width: 17px;
    height: 17px;
  }

  &-Toggle2 {
    align-items: center;
    width: 20px;
    margin: 0 24px;
  }
}
</style>
