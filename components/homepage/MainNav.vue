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
        <NuxtLink class="MainNav-Logo" :to="localePath('/')">
          <img class="MainNav-Logo" src="@/assets/img/logo.svg" />
        </NuxtLink>
        <button
          v-if="width < 768"
          class="Btn Btn--common MainNav-Btn"
          :class="`MainNav-Btn--${$i18n.locale}`"
          @click="onClickBtn()"
        >
          {{ isLoggedIn ? $t('buttons.deposit') : $t('buttons.login') }}
        </button>
      </div>
      <nav v-if="width >= 960" class="Nav MainNav-Links">
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
      <GamePanel v-if="isGamePage" />
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
        <div class="AsideMenu-List">
          <template v-for="item in navItemsFull">
            <NavItem
              v-if="isLoggedIn || !item.onlyIfLoggedIn"
              :key="item.name"
              :class-name="'AsideMenu-Link'"
              :item="item"
            />
          </template>
          <div
            v-if="isLoggedIn"
            class="Nav-Item Nav-Name AsideMenu-Link Link-Exit"
            @click="onClickExitBtn()"
          >
            <svg class="AsideMenu-Icon Nav-Icon Icon-Exit" width="22" height="18">
              <use xlink:href="@/assets/img/icons.svg#exit"></use>
            </svg>
            {{ $t('profile.pages.exit') }}
          </div>
          <button
            v-if="!isLoggedIn && chatIsLoaded"
            class="Nav-Item Nav-Name AsideMenu-Link AsideMenu-Support"
            @click="onClickSupport()"
          >
            <img class="Nav-Icon" src="@/assets/img/chat.svg" />
            {{ $t('menu.support') }}
          </button>
        </div>
        <AuthSection class="AsideMenu-AuthSection AuthSection--aside" :my-account="true" />
      </div>
    </transition>
  </nav>
</template>

<script>
import NavItem from '@/components/homepage/NavItem.vue';
import AuthSection from '@/components/homepage/AuthSection.vue';
import GamePanel from '@/components/homepage/GamePanel.vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { TOURNAMENTS } from '@/config';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'MainNav',
  components: {
    NavItem,
    AuthSection,
    GamePanel,
  },
  mixins: [showAuthDialog],
  data() {
    return {
      documentIsScrolled: false,
      topBarIsScrolled: false,
      navItems: [
        {
          name: this.$t('pages.lobby'),
          url: this.localePath('/'),
          icon: 'lobby_nav.svg',
        },
        {
          name: this.$t('pages.promotion'),
          url: this.localePath('/promotions'),
          icon: 'promotions_nav.svg',
        },
        {
          name: this.$t('pages.dailyCashback'),
          url: this.localePath('/daily-cashback'),
          icon: 'promotions_nav.svg',
        },
        {
          name: this.$t('pages.myAccount'),
          url: this.localePath('/profile/balance'),
          icon: 'user-profile.svg',
          onlyIfLoggedIn: true,
        },

        // {
        //   name: 'Drops & Wins',
        //   url: this.localePath('/drops-wins'),
        //   icon: 'tournament_nav.svg',
        //   onlyIfLoggedIn: false,
        // },
        // {
        //   name: 'Tournaments',
        //   children: [
        //     {
        //       name: 'Daily tournament',
        //       url: '/daily-tournament',
        //       icon: 'tournament_nav.svg',
        //     },
        //     {
        //       name: 'Weekly lottery',
        //       url: '#',
        //       icon: 'tournament_nav.svg',
        //     },
        //     {
        //       name: 'Live tournament',
        //       url: '#',
        //       icon: 'tournament_nav.svg',
        //     },
        //   ],
        // },
      ],
      internalVisible: true,
    };
  },
  computed: {
    ...mapState(['navIsOpen', 'width', 'chatIsLoaded']),
    ...mapGetters(['isLoggedIn']),
    navItemsFull() {
      const tournaments = Object.values(TOURNAMENTS);
      let navTournaments = {};
      if (!tournaments.length) return this.navItems;
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
          icon: 'tournament_nav.svg',
          onlyIfLoggedIn: false,
        }));
        navTournaments = {
          name: this.$t('pages.tournaments'),
          children,
        };
      }

      const menu = [...this.navItems];
      menu.push(navTournaments);

      return menu;
    },
    isGamePage() {
      return this.getRouteBaseName() === 'game';
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
    onClickExitBtn() {
      this.logout().then(() => this.$router.push(this.localePath('/')));
    },
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
    padding: 14px 16px;

    @media (min-width: $screen-m) {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1248px;
      //height: 45px;
      height: auto;
      margin-right: auto;
      margin-left: auto;
    }

    /*@media (min-width: $screen-xl) {
      padding-left: 16px;
    }*/

    &--centered {
      justify-content: center;

      @media (min-width: $screen-xs) {
        justify-content: space-between;
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

  .Btn--common {
    padding: 9px 21px;
    font-size: 10px;
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
    padding: 0 18px;

    @media (min-width: $screen-xs) {
      width: 288px;
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
