<template>
  <nav class="MainNav" :class="{'MainNav--bg': documentIsScrolled}">
    <div class="MainNav-Overlay" v-if="navIsOpen" @click="toggleNav()"></div>
    <div class="MainNav-TopBar">
      <div class="MainNav-Nav">
        <button class="MainNav-Toggle" @click="toggleNav()">
          <svg class="Toggle">
            <use xlink:href="@/assets/img/icons.svg#toggle"></use>
          </svg>
        </button>
        <router-link class="MainNav-Logo" to="/">
          <img class="MainNav-Logo" src="@/assets/img/logo.svg" />
        </router-link>
      </div>
      <div class="Nav MainNav-Links">
        <router-link class="MainNav-Link" to="/">
          Lobby
        </router-link>
        <router-link class="MainNav-Link" to="/">
          Categories
        </router-link>
        <router-link class="MainNav-Link" to="/">
          Promotions
        </router-link>
        <router-link class="MainNav-Link" to="/">
          Tournaments
        </router-link>
      </div>
      <div v-if="isLoggedIn" class="MainNav-UserSection">
        <router-link class="MainNav-UserInfo" to="/cabinet/balance">
          <div class="MainNav-User">
            <span class="MainNav-UserName">
              {{ user.firstName || user.email }}
            </span>
            <span class="MainNav-Spent">
              8 {{ user.currency }} /
            </span>
            <span class="MainNav-Left">
               25 {{ user.currency}}
            </span>
          </div>
          <div class="MainNav-UserBalance">
            {{ user.balance }} {{ user.currency }}
          </div>
        </router-link>
        <div class="MainNav-UserLvl">
          2
        </div>
        <div class="MainNav-UserMessages">
          <svg class="MainNav-UserMessagesIcon">
            <use xlink:href="@/assets/img/icons.svg#messages"></use>
          </svg>
        </div>
        <button
          class="Btn MainNav-Btn"
          @click="$modal.show('cashier');"
        >
          Deposit
        </button>
      </div>
      <div v-else class="MainNav-Login">
        <button
          class="Btn Btn--text MainNav-Btn"
          @click="showRegistrationDialog('login')"
        >
          Login
        </button>
        <button
          class="Btn MainNav-Btn"
          @click="showRegistrationDialog('registration')"
        >
          Register
        </button>
      </div>
    </div>
    <transition name="slide-left">
      <div v-show="navIsOpen" class="AsideMenu MainNav-Aside">
        <div class="AsideMenu-Header">
          <div class="AsideMenu-Close" @click="toggleNav()"></div>
          <img class="AsideMenu-Logo" src="@/assets/img/logo.svg" />
        </div>
        <div class="AsideMenu-Form">
          <div id="son_embeded"></div>
        </div>
        <div class="AsideMenu-List">
          <NavItem :items="navItems" @click="navIsOpen = !navIsOpen" />
        </div>
      </div>
    </transition>
    <CashierForm />
  </nav>
</template>

<script>
import NavItem from '@/components/NavItem.vue';
import AuthDialog from '@/components/AuthDialog.vue';
import { mapMutations, mapState, mapGetters } from 'vuex';
import CashierForm from '@/components/CashierForm.vue';

export default {
  name: 'MainNav',
  components: {
    NavItem,
    CashierForm,
  },
  data() {
    return {
      documentIsScrolled: false,
      topBarIsScrolled: false,
      navItems: [
        {
          name: 'promotion',
          url: '/promotions',
          icon: 'gift',
          iconDimensions: [19, 20],
        },
        {
          name: 'vip rewards',
          url: '/vip',
          icon: 'jewel',
          iconDimensions: [19, 18],
        },
        {
          name: 'about us',
          url: '/about-us',
          icon: 'about',
          iconDimensions: [19, 19],
        },
        {
          name: 'payment methods',
          url: '/payment-methods',
          icon: 'payment',
          iconDimensions: [19, 16],
        },
        {
          name: 'faq',
          url: '/faq',
          icon: 'faq',
          iconDimensions: [19, 19],
        },
      ],
    };
  },
  computed: {
    ...mapState(['navIsOpen', 'user']),
    ...mapGetters(['isLoggedIn']),
  },
  created() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...mapMutations(['openNav', 'closeNav', 'removeAuthError']),
    onScroll() {
      this.documentIsScrolled = window.scrollY > 0;
    },
    toggleNav() {
      if (this.navIsOpen) this.closeNav();
      else this.openNav();
    },
    showRegistrationDialog(authType) {
      this.removeAuthError();
      this.$modal.show(AuthDialog,
        { authType },
        { width: 418, height: 'auto' },
        {
          'before-close': this.afterCloseAuthDialog,
        });
    },
    afterCloseAuthDialog() {
      this.removeAuthError();
    },
  },
};
</script>

<style lang="scss">
.MainNav {
  position: sticky;
  top: 0;
  z-index: 100;

  &-Overlay {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(6, 8, 30, 0.9);
    z-index: 2;
  }

  &--bg {
    background: rgba(6, 14, 43, 0.5);
  }

  &-TopBar {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1248px;
    width: 100%;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;

    @media(min-width: $screen-m) {
      height: auto;
    }

    @media(min-width: $screen-xl) {
      padding-left: 16px;
    }
  }

  &-Nav {
    display: flex;
    align-items: center;
    margin-right: 20px;

    @media(min-width: $screen-l) {
      margin-right: 34px;
    }
  }

  &-Toggle {
    display: none;
    margin-right: 12px;
    cursor: pointer;

    @media(min-width: $screen-xs) {
      display: block;
    }

    @media(min-width: $screen-l) {
      display: none;
    }
  }

  &-Logo {
    flex-shrink: 0;
    vertical-align: middle;
    width: 110px;

    @media(min-width: $screen-s) {
      width: 130px;
    }

    @media(min-width: $screen-m) {
      width: 140px;
    }

    @media(min-width: $screen-xl) {
      width: 172px;
    }
  }

  &-Links {
    display: none;

    @media(min-width: $screen-l) {
      display: flex;
      margin-right: auto;
    }
  }

  &-Link {
    position: relative;
    margin-right: 14px;
    padding-right: 16px;
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;

    &:after {
      content: '/';
      position: absolute;
      top: 0;
      right: 0;
      color: var(--color-breadcrumbs);
    }

    &:last-child {
      margin-right: 0;
      padding-right: 0;

      &:after {
        display: none;
      }
    }

    @media(min-width: $screen-xl) {
      font-size: 12px;
    }
  }

  &-Login {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  &-Btn {
    display: none;

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

  &-UserSection {
    display: flex;
    align-items: center;
    text-transform: uppercase;
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

  &-UserLvl {
    display: none;

    @media(min-width: $screen-m) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 31px;
      margin-right: 26px;
      font-size: 11px;
      font-weight: 700;
      color: var(--color-text-main);
      background: url(../assets/img/level.png) no-repeat;
    }
  }

  &-UserMessages {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-right: 16px;
    background: linear-gradient(356.88deg, rgba(6, 14, 42, 0) -13.82%, #060E2A 105.97%);
    border-radius: 50%;

    @media(min-width: $screen-m) {
      margin-right: 30px;
      background: transparent;
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

.AsideMenu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 4;
  min-width: 308px;
  padding: 30px 0;
  background-color: var(--color-bg-nav);
  overflow-y: auto;
  scrollbar-width: thin;

  &-Header {
    display: flex;
    margin-bottom: 26px;
    padding: 0 16px;
  }

  &-Close {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    cursor: pointer;

    &:before, &:after {
      content: '';
      position: absolute;
      left: 20px;
      width: 3px;
      height: 20px;
      background-color: var(--color-text-main);
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }

  &-Form {
    padding: 16px;
    border-top: 1px solid rgba(39, 43, 95, 0.5);
    border-bottom: 1px solid rgba(39, 43, 95, 0.5);
  }

  &-List {
    width: 100%;
    padding-top: 18px;
  }

  .a-son-container .a-login-embeded {
    width: auto !important;
  }

  .a-control {
    height: auto !important;
    padding: 18px 16px 19px !important;
    color: var(--color-text-main) !important;
    background-color: var(--color-form) !important;
    border-radius: 8px !important;

    &::placeholder {
      color: var(--color-text-ghost) !important;
    }
  }

  .a-btn {
    padding: 14px !important;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.24;
    border-radius: 8px !important;
  }

  .a-btn-login {
    color: var(--color-main2) !important;
    background: transparent !important;
    border: 1px solid var(--color-main2) !important;

    &:hover {
      background: var(--color-main2) !important;
      color: var(--color-bg-nav) !important;
    }
  }

  .a-son-container .text-center {
    text-align: right !important;
  }
}
</style>
