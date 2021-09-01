<template>
  <nav class="MobileNav">
    <NuxtLink
      :class="['MobileNav-Item', { 'route-promotions': menuItems.promotions }]"
      :to="localePath('/promotions')"
      @click.native="focusMenu('promotions', 'effect')"
    >
      <div class="MobileNav-IconWrapper">
        <svg class="MobileNav-Icon MobileNav-Icon--fill" width="22" height="23">
          <use xlink:href="@/assets/img/icons.svg#promotions"></use>
        </svg>
      </div>
      <div class="MobileNav-Name">{{ $t('pages.promotion') }}</div>
    </NuxtLink>
    <button
      v-if="chatIsLoaded"
      :class="['MobileNav-Item', { 'route-support': menuItems.support }]"
      @click="focusMenu('support', 'effect')"
    >
      <div class="MobileNav-IconWrapper">
        <svg
          class="MobileNav-Icon MobileNav-Icon--stroke MobileNav-Icon--fill"
          width="22"
          height="22"
        >
          <use xlink:href="@/assets/img/icons.svg#support"></use>
        </svg>
      </div>
      <div class="MobileNav-Name">{{ $t('menu.support') }}</div>
    </button>
    <NuxtLink
      :to="localePath('/')"
      :class="['MobileNav-Item', { 'route-home': menuItems.home }]"
      @click.native="focusMenu('home', 'effect')"
    >
      <div class="MobileNav-IconWrapper">
        <svg
          class="MobileNav-Icon MobileNav-Icon--stroke MobileNav-Icon--fill"
          width="36"
          height="34"
        >
          <use xlink:href="@/assets/img/icons.svg#dice"></use>
        </svg>
      </div>
      <div class="MobileNav-Name">{{ $t('pages.lobby') }}</div>
    </NuxtLink>
    <NuxtLink
      ref="search"
      :class="['MobileNav-Item', { 'route-search': menuItems.search }]"
      :to="localePath('/search')"
      @click.native="focusMenu('search', 'effect')"
    >
      <div class="MobileNav-IconWrapper">
        <svg class="MobileNav-Icon MobileNav-Icon--fill" width="17" height="16" fill="#F3B233">
          <use xlink:href="@/assets/img/icons.svg#search"></use>
        </svg>
      </div>
      <div class="MobileNav-Name">{{ $t('pages.search') }}</div>
    </NuxtLink>
    <button
      :class="['MobileNav-Item MobileNav-Item--burger', { 'route-toggle': menuItems.toggle }]"
      @click="focusMenu('toggle', 'effect')"
    >
      <div class="MobileNav-IconWrapper">
        <svg class="MobileNav-Icon Toggle" width="25" height="20">
          <use xlink:href="@/assets/img/icons.svg#toggle"></use>
        </svg>
      </div>
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
        promotions: false,
        home: false,
        search: false,
        support: false,
        toggle: false,
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
      this.menuItems[route] = true;
      setTimeout(() => {
        this.menuItems[route] = false;
      }, 160);
      if (route === 'support') {
        this.onClickSupport();
      }
      if (route === 'toggle') {
        this.toggleNav();
      }
      console.log(effect);
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
  // padding: 6px 3px 8px; - smaller
  background: var(--color-bg-mobnav);
  transform: translateZ(0);

  @media (min-width: $screen-xs) {
    display: none;
  }

  .nuxt-link-exact-active.MobileNav-Item {
    .MobileNav-Name {
      color: var(--color-main1);
    }

    .MobileNav-IconWrapper {
      .MobileNav-Icon {
        &--fill {
          fill: var(--color-main1);
        }

        &--stroke {
          stroke: var(--color-main1);
        }
      }
    }

    &-Name {
      color: var(--color-main1);
    }
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

  &-IconWrapper {
    display: flex;
    align-items: center;
    height: 34px;
    overflow: hidden;
  }

  &-Icon {
    flex-shrink: 0;
    align-items: center;

    &--fill {
      fill: var(--color-text-main);
    }

    &--stroke {
      stroke: var(--color-text-main);
    }
  }
}

.route-home,
.route-search,
.route-promotions,
.route-toggle,
.route-support {
  @include touch-btn-5();
}

.toggle-btn-active {
  border: 1px solid var(--color-main1);
}
</style>
