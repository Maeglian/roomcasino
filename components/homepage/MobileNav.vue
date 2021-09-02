<template>
  <nav class="MobileNav">
    <NuxtLink class="MobileNav-Item" :to="localePath('/promotions')">
      <div class="MobileNav-IconWrapper">
        <svg class="MobileNav-Icon MobileNav-Icon--fill" width="22" height="23">
          <use xlink:href="@/assets/img/icons.svg#promotions"></use>
        </svg>
      </div>
      <div class="MobileNav-Name">{{ $t('pages.promotion') }}</div>
    </NuxtLink>
    <button v-if="chatIsLoaded" class="MobileNav-Item" @click="onClickSupport">
      <div class="MobileNav-IconWrapper">
        <svg class="MobileNav-Icon MobileNav-Icon--stroke" width="22" height="22">
          <use xlink:href="@/assets/img/icons.svg#support"></use>
        </svg>
      </div>
      <div class="MobileNav-Name">{{ $t('menu.support') }}</div>
    </button>
    <NuxtLink class="MobileNav-Item" :to="localePath('/')">
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
    <NuxtLink class="MobileNav-Item" :to="localePath('/search')">
      <div class="MobileNav-IconWrapper">
        <svg class="MobileNav-Icon MobileNav-Icon--fill" width="17" height="16" fill="#F3B233">
          <use xlink:href="@/assets/img/icons.svg#search"></use>
        </svg>
      </div>
      <div class="MobileNav-Name">{{ $t('pages.search') }}</div>
    </NuxtLink>
    <button class="MobileNav-Item MobileNav-Item--burger" @click="toggleNav()">
      <div class="MobileNav-IconWrapper">
        <svg class="MobileNav-Icon Toggle" width="25" height="20">
          <use xlink:href="@/assets/img/icons.svg#toggle"></use>
        </svg>
      </div>
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
import { mapGetters, mapMutations, mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';

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
</style>
