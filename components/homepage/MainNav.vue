<template>
  <nav class="MainNav" :class="{ 'MainNav--bg': documentIsScrolled }">
    <div v-if="navIsOpen" class="MainNav-Overlay" @click="toggleNav()"></div>
    <div class="MainNav-TopBar">
      <div class="MainNav-Nav">
        <button class="MainNav-Toggle" @click="toggleNav()">
          <svg class="Toggle">
            <use xlink:href="@/assets/img/icons.svg#toggle"></use>
          </svg>
        </button>
        <NuxtLink class="MainNav-Logo" to="/">
          <img class="MainNav-Logo" src="@/assets/img/logo.svg" />
        </NuxtLink>
      </div>
      <nav v-if="width >= 960" class="Nav MainNav-Links">
        <ul class="MainNav-List">
          <NavItem
            v-for="item in navItems"
            :key="item.name"
            :class-name="'MainNav-Link'"
            :item="item"
          />
        </ul>
      </nav>
      <GamePanel v-if="isGamePage" />
      <AuthSection v-else class="MainNav-AuthSection" />
    </div>
    <transition v-if="width < 960" name="slide-left">
      <div v-show="navIsOpen" class="AsideMenu MainNav-Aside">
        <div class="AsideMenu-Header">
          <NuxtLink class="AsideMenu-Logo" to="/">
            <img class="AsideMenu-Logo" src="@/assets/img/logo.svg" />
          </NuxtLink>
          <div class="Close AsideMenu-Close" @click="toggleNav()"></div>
        </div>
        <div class="AsideMenu-List">
          <NavItem
            v-for="item in navItems"
            :key="item.name"
            :class-name="'AsideMenu-Link'"
            :item="item"
          />
        </div>
        <AuthSection class="AsideMenu-AuthSection AuthSection--aside" />
      </div>
    </transition>
  </nav>
</template>

<script>
import NavItem from '@/components/homepage/NavItem.vue';
import AuthSection from '@/components/homepage/AuthSection.vue';
import GamePanel from '@/components/homepage/GamePanel.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'MainNav',
  components: {
    NavItem,
    AuthSection,
    GamePanel,
  },
  data() {
    return {
      documentIsScrolled: false,
      topBarIsScrolled: false,
      navItems: [
        {
          name: 'Lobby',
          url: '/',
          icon: 'lobby_nav.svg',
        },
        {
          name: 'Promotions',
          url: '/promotions',
          icon: 'promotions_nav.svg',
        },
        {
          name: 'Tournaments',
          children: [
            {
              name: 'Daily tournament',
              url: '/daily-tournament',
              icon: 'tournament_nav.svg',
            },
            {
              name: 'Weekly lottery',
              url: '#',
              icon: 'tournament_nav.svg',
            },
            {
              name: 'Live tournament',
              url: '#',
              icon: 'tournament_nav.svg',
            },
          ],
        },
      ],
      internalVisible: true,
    };
  },
  computed: {
    ...mapState(['navIsOpen', 'width']),
    isGamePage() {
      return this.$route.name === 'game';
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...mapMutations(['openNav', 'closeNav']),
    onScroll() {
      this.documentIsScrolled = window.scrollY > 0;
    },
    toggleNav() {
      if (this.navIsOpen) this.closeNav();
      else this.openNav();
    },
  },
};
</script>

<style lang="scss">
.MainNav {
  position: sticky;
  top: 0;
  z-index: 10;

  &-Overlay {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(6, 8, 30, 0.9);
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
    width: 100%;
    max-width: 1248px;
    height: 60px;
    margin-right: auto;
    margin-left: auto;
    padding-left: 16px;

    @media (min-width: $screen-m) {
      height: auto;
    }

    @media (min-width: $screen-xl) {
      padding-left: 16px;
    }
  }

  &-Nav {
    display: flex;
    align-items: center;
    margin-right: 20px;

    @media (min-width: $screen-l) {
      margin-right: 34px;
    }
  }

  &-Toggle {
    display: none;
    margin-right: 12px;
    cursor: pointer;

    @media (min-width: $screen-xs) {
      display: block;
    }

    @media (min-width: $screen-l) {
      display: none;
    }
  }

  &-Logo {
    flex-shrink: 0;
    width: 110px;
    vertical-align: middle;

    @media (min-width: $screen-s) {
      width: 130px;
    }

    @media (min-width: $screen-m) {
      width: 140px;
    }

    @media (min-width: $screen-xl) {
      width: 172px;
    }
  }

  &-Links {
    display: none;

    @media (min-width: $screen-l) {
      display: block;
      margin-right: auto;
    }
  }

  &-List {
    display: flex;
  }

  &-Link {
    position: relative;
    margin-right: 14px;
    padding-right: 16px;
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-xl) {
      font-size: 12px;
    }

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
  }
}

.AsideMenu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  height: 100%;
  padding-top: 18px;
  overflow-y: auto;
  background-color: var(--color-body);
  scrollbar-width: thin;

  @media (min-width: $screen-xs) {
    align-items: center;
  }

  &-Header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 50px;
    padding-right: 18px;
    padding-left: 18px;
  }

  &-Close {
    width: 20px;
    height: 20px;
  }

  &-List {
    order: 1;
    padding-right: 18px;
    padding-left: 18px;
  }

  &-Link {
    display: block;
    margin-bottom: 35px;
    font-size: 14px;

    @media (min-width: $screen-s) {
      font-size: 22px;
    }

    @media (min-width: $screen-xs) {
      text-align: center;

      .Nav-Name {
        justify-content: center;
      }
    }
  }

  &-AuthSection {
    order: 2;
    margin-top: auto;

    @media (min-width: $screen-xs) {
      width: 288px;
      margin-bottom: 158px;
    }
  }

  &-AuthSection.AuthSection--authenticated {
    margin-top: 0;

    @media (min-width: $screen-xs) {
      width: 100%;
      margin-top: auto;
      margin-bottom: 0;
    }
  }
}
</style>
