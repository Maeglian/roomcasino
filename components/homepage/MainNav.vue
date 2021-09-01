<template>
  <nav class="MainNav" :class="{ 'MainNav--bg': documentIsScrolled }">
    <div v-if="navIsOpen" class="MainNav-Overlay" @click="toggleNav()"></div>
    <div class="MainNav-TopBar" :class="{ 'MainNav-TopBar--authenticated': isLoggedIn }">
      <div class="MainNav-Nav">
        <button class="MainNav-Toggle" @click="toggleNav()">
          <svg class="Toggle">
            <use xlink:href="@/assets/img/icons.svg#toggle"></use>
          </svg>
        </button>
        <NuxtLink class="MainNav-Logo" :to="localePath('/')">
          <img class="MainNav-Logo" src="@/assets/img/logo.svg" />
        </NuxtLink>
      </div>
      <nav
        v-if="width >= 960"
        class="Nav MainNav-Links"
        :class="{ 'MainNav-Links--mr': $i18n.locale === 'gr' || $i18n.locale === 'pl' }"
      >
        <ul class="MainNav-List">
          <template v-for="item in navItemsFull">
            <NavItem
              v-if="!item.onlyIfLoggedIn"
              :key="item.name"
              :class-name="'MainNav-Link'"
              :item="item"
            />
          </template>
        </ul>
      </nav>
      <NuxtLink class="MainNav-Search" :to="localePath('/search')">
        <svg class="MainNav-SearchIcon">
          <use xlink:href="@/assets/img/icons.svg#search"></use>
        </svg>
      </NuxtLink>
      <GamePanel v-if="isGamePage" class="MainNav-GamePanel" />
      <AuthSection v-else class="MainNav-AuthSection" />
    </div>
    <transition v-if="width < 960" name="slide-right">
      <div v-show="navIsOpen" class="AsideMenu MainNav-Aside">
        <div class="AsideMenu-Header">
          <NuxtLink class="AsideMenu-Logo" :to="localePath('/')">
            <img class="AsideMenu-Logo" src="@/assets/img/logo.svg" />
          </NuxtLink>
          <div class="Close AsideMenu-Close" @click="toggleNav()"></div>
        </div>
        <NuxtLink v-if="isLoggedIn" class="AsideMenu-UserInfo" :to="localePath('/profile/balance')">
          <div class="AsideMenu-User">
            <img src="@/assets/img/user-profile.svg" alt="icon" class="AsideMenu-UserIcon" />
            <span class="AsideMenu-UserName">
              {{ user.firstName || user.email }}
            </span>
          </div>
          <img src="@/assets/img/arrow-right.svg" alt="" class="AsideMenu-UserArrow" />
        </NuxtLink>
        <div class="AsideMenu-List">
          <template v-for="item in navItemsFull">
            <NavItem
              v-if="isLoggedIn || !item.onlyIfLoggedIn"
              :key="item.name"
              class="AsideMenu-Link"
              :class="item.modificator ? `AsideMenu-Link--${item.modificator}` : ''"
              :item="item"
            />
          </template>
          <template v-for="item in navItemsFooter">
            <NavItem :key="item.name" :class-name="'AsideMenu-LinkFooter'" :item="item" />
          </template>
        </div>
        <AuthSection class="AsideMenu-AuthSection AuthSection--aside" :my-account="true" />
      </div>
    </transition>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import NavItem from '@/components/homepage/NavItem.vue';
import AuthSection from '@/components/homepage/AuthSection.vue';
import GamePanel from '@/components/homepage/GamePanel.vue';

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
          name: this.$t('pages.lobby'),
          url: this.localePath('/'),
          icon: 'lobby_nav.svg',
          modificator: 'onlyDesktop',
        },
        {
          name: this.$t('pages.promotion'),
          url: this.localePath('/promotions'),
          icon: 'promotions_nav.svg',
          modificator: 'onlyDesktop',
        },
        {
          name: this.$t('pages.dailyCashback'),
          url: this.localePath('/daily-cashback'),
          icon: 'cashback.svg',
        },
        // {
        //   name: this.$t('pages.lottery'),
        //   url: this.localePath('/lottery'),
        //   icon: 'promotions_nav.svg',
        // },
        /* {
          name: this.$t('pages.myAccount'),
          url: this.localePath('/profile/balance'),
          icon: 'user-profile.svg',
          onlyIfLoggedIn: true,
        }, */
      ],
      navItemsFooter: [
        {
          name: this.$t('pages.aboutUs'),
          url: this.localePath('/about-us'),
        },
        {
          name: this.$t('pages.btc'),
          url: this.localePath('/bitcoins'),
        },
        {
          name: this.$t('pages.aml'),
          url: this.localePath('/aml-policy'),
        },
        {
          name: this.$t('pages.terms'),
          url: this.localePath('/terms'),
        },
        {
          name: this.$t('pages.bonusPolicy'),
          url: this.localePath('/bonus-terms'),
        },
        {
          name: this.$t('pages.responsibleGaming'),
          url: this.localePath('/responsible-gaming'),
        },
        {
          name: this.$t('pages.risk'),
          url: this.localePath('/risk-warnings'),
        },
        {
          name: this.$t('pages.privacyPolicy'),
          url: this.localePath('/privacy-policy'),
        },
        {
          name: this.$t('pages.faq'),
          url: this.localePath('/faq'),
        },
      ],
      internalVisible: true,
    };
  },
  computed: {
    ...mapState(['navIsOpen', 'width', 'chatIsLoaded', 'user']),
    ...mapState('tournaments', ['lotteryList']),
    ...mapGetters(['isLoggedIn']),
    ...mapGetters('tournaments', ['tournaments']),
    navItemsFull() {
      const lotteryList = [];
      const lotteries = this.lotteryList.map(lottery => {
        return {
          name: lottery.name,
          url: `/lottery/${lottery.slug}`,
          icon: 'tournament_nav.svg',
          onlyIfLoggedIn: false,
        };
      });
      if (this.lotteryList.length === 1) lotteryList.push(lotteries[0]);
      if (this.lotteryList.length > 1) {
        const lotteryItem = {
          name: this.$t('pages.lottery'),
          icon: 'tournament_nav.svg',
          children: lotteries,
        };
        lotteryList.push(lotteryItem);
      }
      const navItems = [...this.navItems, ...lotteryList];
      const tournaments = Object.values(this.tournaments);
      let navTournaments = {};
      if (!tournaments.length) return navItems;
      if (tournaments.length === 1) {
        const item = tournaments[0];
        navTournaments = {
          name: item.name,
          url: this.localePath(`/tournaments/${item.url}`),
          icon: 'tournament_nav.svg',
          onlyIfLoggedIn: false,
        };
      }
      if (tournaments.length > 1) {
        const children = tournaments.map(item => ({
          name: item.name,
          url: this.localePath(`/tournaments/${item.url}`),
          icon: this.width < 768 ? 'tournament-circle_nav.svg' : 'tournament_nav.svg',
          onlyIfLoggedIn: false,
        }));
        navTournaments = {
          name: this.$t('pages.tournaments'),
          icon: 'tournament_nav.svg',
          children,
        };
      }

      const menu = [...navItems];
      menu.push(navTournaments);

      return menu;
    },
    isGamePage() {
      return this.getRouteBaseName() === 'game-gameId';
    },
  },
  mounted() {
    if (window.scrollY > 0) this.documentIsScrolled = true;
    window.addEventListener('scroll', this.onScroll, { passive: true });
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...mapMutations(['openNav', 'closeNav']),
    ...mapActions(['logout']),
    onScroll() {
      this.documentIsScrolled = window.scrollY > 0;
    },
    toggleNav() {
      if (this.navIsOpen) this.closeNav();
      else this.openNav();
    },
    onClickSupport() {
      window.LC_API.open_chat_window();
    },
  },
};
</script>

<style lang="scss">
.MainNav {
  position: -webkit-sticky;
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
    padding: 10px 16px;

    @media (min-width: $screen-xs) {
      display: flex;
      justify-content: flex-start;
      max-width: 1248px;
      margin-right: auto;
      margin-left: auto;
    }

    @media (min-width: $screen-m) {
      padding: 16px;
    }

    &--authenticated {
      display: grid;
      grid-template-columns: 1fr 2fr;

      @media (min-width: $screen-xs) {
        display: flex;
      }
    }
  }

  &-Nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    //margin-right: 20px;

    @media (min-width: $screen-l) {
      //margin-right: 34px;
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
    width: 85px;
    vertical-align: middle;

    @media (min-width: $screen-s) {
      width: 130px;
    }

    @media (min-width: $screen-m) {
      width: 140px;
    }

    @media (min-width: $screen-l) {
      margin-right: 34px;
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

    &--mr {
      margin-right: 20px;
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

  &-AuthSection {
    margin-left: auto;

    @media (min-width: $screen-l) {
      margin-left: 30px;
    }
  }

  &-Search {
    display: none;

    @media (min-width: $screen-xs) {
      display: block;
      margin-left: 20px;
    }

    @media (min-width: $screen-l) {
      margin-left: 0;
    }
  }

  &-SearchIcon {
    width: 20px;
    height: 20px;
    fill: var(--color-main1);
  }

  &-GamePanel {
    margin-left: auto;

    @media (min-width: $screen-l) {
      margin-left: 30px;
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
    align-items: center;
    width: 100%;
    margin-bottom: 50px;
    padding-right: 18px;
    padding-left: 18px;
  }

  &-Logo {
    width: 110px;
    height: 19px;
  }

  &-Close {
    width: 20px;
    height: 20px;
  }

  &-UserInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 42px;
    padding: 0 16px;

    @media (min-width: $screen-xs) {
      display: none;
    }
  }

  &-User {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
    color: var(--color-main1);
    text-transform: uppercase;
  }

  &-UserIcon {
    margin-right: 17px;
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

    @media (min-width: $screen-xs) {
      text-align: center;

      .Nav-Name {
        justify-content: center;
      }
    }

    &--onlyDesktop {
      display: none;
    }
  }

  &-LinkFooter {
    margin-bottom: 18px;
    list-style-type: none;
    font-size: 11px;

    @media (min-width: $screen-s) {
      font-size: 13px;
    }

    &:last-child {
      margin-bottom: 90px;
    }

    .Nav-Name {
      color: var(--color-text-faded);
      @media (min-width: $screen-xs) {
        display: block;
        text-align: center;
      }
    }

    .nuxt-link-exact-active {
      color: var(--color-main1);
    }
  }

  .Link-Exit {
    display: flex;
    align-items: center;
    margin-bottom: 100px;
    @media (min-width: $screen-xs) {
      justify-content: center;
    }
  }

  &-AuthSection {
    height: auto;
    margin-bottom: 37px;
    padding: 0 16px;

    @media (min-width: $screen-xs) {
      width: 288px;
    }
  }

  &-AuthSection.AuthSection--authenticated {
    margin-top: 0;
    padding: 0 32px;

    @media (min-width: $screen-xs) {
      width: 100%;
      margin-top: auto;
      margin-bottom: 0;
    }
  }

  &-Support {
    @media (min-width: $screen-xs) {
      margin: 0 auto;
    }
  }

  .Icon-Exit {
    width: 16px;
  }
}
</style>
