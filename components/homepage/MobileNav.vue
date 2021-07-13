<template>
  <nav class="MobileNav">
    <NuxtLink class="MobileNav-Item" :to="localePath('/promotions')">
      <svg class="MobileNav-Toggle2" width="17" height="16">
        <use xlink:href="@/assets/img/icons.svg#promotions"></use>
      </svg>
      <div class="MobileNav-Name">{{ $t('pages.promotion') }}</div>
    </NuxtLink>
    <button v-if="chatIsLoaded" class="MobileNav-Item" @click="onClickSupport">
      <svg class="MobileNav-Toggle2" width="18" height="15">
        <use xlink:href="@/assets/img/icons.svg#support"></use>
      </svg>
      <div class="MobileNav-Name">{{ $t('menu.support') }}</div>
    </button>
    <NuxtLink class="MobileNav-Item" :to="localePath('/')">
      <svg class="MobileNav-Toggle2" width="17" height="16">
        <use xlink:href="@/assets/img/icons.svg#dice"></use>
      </svg>
      <div class="MobileNav-Name">{{ $t('pages.lobby') }}</div>
    </NuxtLink>
    <NuxtLink class="MobileNav-Item" :to="localePath('/search')">
      <svg class="MobileNav-Toggle2" width="17" height="16" fill="#F3B233">
        <use xlink:href="@/assets/img/icons.svg#search"></use>
      </svg>
      <div class="MobileNav-Name">{{ $t('pages.search') }}</div>
    </NuxtLink>
    <button class="MobileNav-Item MobileNav-Item--burger" @click="toggleNav()">
      <svg class="MobileNav-Toggle2 Toggle Toggle--colored">
        <use xlink:href="@/assets/img/icons.svg#toggle"></use>
      </svg>
      <div class="MobileNav-Name">{{ $t('menu.menu') }}</div>
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
  padding: 10px 3px 18px;
  background: var(--color-bg-mobnav);
  transform: translateZ(0);

  @media (min-width: $screen-xs) {
    display: none;
  }

  &-Item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 61px;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      right: -11px;
      width: 1px;
      height: 25px;
      background-color: var(--color-bg-mobnav-lighter);
      transform: translate(0, -50%);
    }

    &:last-child {
      &:before {
        display: none;
      }
    }

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
    font-weight: 700;
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
    width: 17px;
    height: 17px;
    margin: 0 0 4px;
  }
}
</style>
