<template>
  <nav class="MobileNav">
    <div
      :class="['MobileNav-Item', { 'route-promotions': menuItems.promotions }]"
      @click="focusMenu('promotions', 'effect')"
    >
      <svg class="MobileNav-Icon" width="17" height="16">
        <use xlink:href="@/assets/img/icons.svg#promotions"></use>
      </svg>
      <div class="MobileNav-Name">{{ $t('pages.promotion') }}</div>
    </div>
    <button :class="['MobileNav-Item', { 'route-promotions': menuItems.promotions }]"
             v-if="chatIsLoaded" class="MobileNav-Item" @click="onClickSupport">
      <svg class="MobileNav-Icon" width="18" height="15">
        <use xlink:href="@/assets/img/icons.svg#support"></use>
      </svg>
      <div class="MobileNav-Name">{{ $t('menu.support') }}</div>
    </button>
    <div
      :class="['MobileNav-Item', { 'route-home': menuItems.home }]"
      @click="focusMenu('home', 'effect')"
    >
      <svg class="MobileNav-Icon" width="17" height="16">
        <use xlink:href="@/assets/img/icons.svg#dice"></use>
      </svg>
      <div class="MobileNav-Name">{{ $t('pages.lobby') }}</div>
    </div>
    <div :class="['MobileNav-Item', { 'route-search': menuItems.search }]">
      <svg class="MobileNav-Icon" width="17" height="16" fill="#F3B233">
        <use xlink:href="@/assets/img/icons.svg#search"></use>
      </svg>
      <div class="MobileNav-Name">{{ $t('pages.search') }}</div>
    </div>
    <button class="MobileNav-Item MobileNav-Item--burger" @click="toggleNav()">
      <svg class="MobileNav-Icon Toggle Toggle--colored">
        <use xlink:href="@/assets/img/icons.svg#toggle"></use>
      </svg>
      <div class="MobileNav-Name">{{ $t('menu.menu') }}</div>
    </button>
  </nav>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'MobileNav',
  mixins: [showAuthDialog],
  data() {
    return {
      menuItems: {
        promotions: true,
        home: false,
        search: false,
      },
    };
  },
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
    /**
     * Touch menu
     * */
    focusMenu(route, effect) {
      setTimeout(() => {
        this.menuItems?.[route] === true; // !this.menuItems?.[route];
      }, 2000);
      // this.changeRoute(route);
    },
    changeRoute(route) {
      if (route === 'home') {
        route = '';
      }
      this.$router.push(this.localePath(`/${route}`));
    },
  },
};
</script>

<style lang="scss" scoped>
@import './MobileNavEffects.scss';

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
    justify-content: flex-start;
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

  &-Name {
    font-size: 7px;
    font-weight: 700;
    line-height: 1.66;
    text-align: center;
    color: var(--color-text-main);
    text-transform: uppercase;
    word-break: break-word;

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

  &-Icon {
    flex-shrink: 0;
    align-items: center;
    width: 17px;
    height: 17px;
    margin: 0 0 6px;
  }
}

.route-home,
.route-search,
.route-promotions {
  // background-color: #0e152f !important;
  @include touch-btn-1();
}
</style>
