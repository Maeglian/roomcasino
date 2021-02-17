<template>
  <div>
    <section id="games" class="DefaultGames">
      <button
        class="DefaultGames-ChosenTab"
        :class="{ 'DefaultGames-ChosenTab--opened': isOpen }"
        @click="onOpen"
      >
        <div class="DefaultGames-Icon">
          <svg :class="`DefaultGames-Icon--${tabActive.icon}`">
            <use :xlink:href="require('@/assets/img/icons.svg') + `#${tabActive.icon}`"></use>
          </svg>
        </div>
        <div class="DefaultGames-Name">
          {{ tabActive.name }}
        </div>
        <i class="Arrow Tab-Arrow" :class="[isOpen ? 'Arrow--up' : 'Arrow--down']"></i>
      </button>
      <div
        v-if="width > 767 || isOpen"
        v-click-outside="onClickOutsideTabs"
        class="DefaultGames-Tabs"
      >
        <button
          v-for="(tab, i) in tabs"
          :key="tab.name"
          class="DefaultGames-Tab"
          :class="{ 'DefaultGames-Tab--active': tabActive.name === tab.name }"
          @click="onChooseTab(i)"
        >
          <div class="DefaultGames-Icon">
            <svg :class="`DefaultGames-Icon--${tab.icon}`">
              <use :xlink:href="require('@/assets/img/icons.svg') + `#${tab.icon}`"></use>
            </svg>
          </div>
          <div class="DefaultGames-Name">
            {{ tab.name }}
          </div>
        </button>
      </div>
      <div class="ProvidersSection DefaultGames-Providers">
        <Search v-model="searched" class="ProvidersSection-Search DefaultGames-Search" />
        <ProvidersMenu
          v-if="gameProducerList.length"
          :provider-active="providerActive"
          @choose-provider="onChooseProvider"
        />
      </div>
      <div v-if="searched" class="SearchedGames">
        <div class="Title Title--type-h2 Cards-Title">
          Searched
        </div>
        <Games
          class="DefaultGames-Cards"
          :games="filteredGames"
          :games-to-show="24"
          btn-class="Btn--common Btn--dark"
        />
      </div>
      <Loader v-if="gamesAreLoading" />
      <template v-else>
        <div class="Title Title--type-h2 Cards-Title">
          {{ title }}
        </div>
        <Games
          class="DefaultGames-Cards"
          :games="games"
          :games-to-show="24"
          btn-class="Btn--common Btn--dark"
        />
      </template>
    </section>
    <section v-if="tabActive.name !== 'All games'" class="DefaultGames">
      <Loader v-if="defaultGamesAreLoading" />
      <div class="Title Title--type-h2 Cards-Title">
        All games
      </div>
      <Games
        class="DefaultGames-Cards NewGames-Cards"
        :games="defaultGames"
        :games-to-show="24"
        btn-class="Btn--common Btn--dark"
      />
    </section>
  </div>
  <!--    <section class="NewGames">-->
  <!--      <div class="Title Title&#45;&#45;type-h2 Cards-Title">-->
  <!--        New games-->
  <!--      </div>-->
  <!--      <Games-->
  <!--        class="DefaultGames-Cards NewGames-Cards"-->
  <!--        :games="fakedNewGames"-->
  <!--        :games-to-show="12"-->
  <!--        :btn-class="'Btn&#45;&#45;common Btn&#45;&#45;dark'"-->
  <!--      />-->
  <!--    </section>-->
  <!--    <section class="LiveGames">-->
  <!--      <div class="Title Title&#45;&#45;type-h2 Cards-Title">-->
  <!--        Live games-->
  <!--      </div>-->
  <!--      <Games class="DefaultGames-Cards NewGames-Cards" :games="liveGames" :gamesToShow="12" btnClass="Btn--dark" />-->
  <!--    </section>-->
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Loader from '@/components/Loader';
import Search from '@/components/Search';
import showAuthDialog from '@/mixins/showAuthDialog';
import ProvidersMenu from '@/components/ProvidersMenu';
import { DEFAULT_PROVIDER, GAME_TYPES } from '@/config';
import toggleDropdown from '@/mixins/toggleDropdown';
import Games from '@/components/Games';

export default {
  name: 'DefaultGames',
  components: {
    ProvidersMenu,
    Search,
    Loader,
    Games,
  },
  mixins: [showAuthDialog, toggleDropdown],
  data() {
    return {
      listIsOpen: false,
      tabs: GAME_TYPES,
      tabActive: GAME_TYPES[1],
      providerActive: DEFAULT_PROVIDER,
      searched: '',
      newGames: [
        {
          img: 'game1.png',
          badge: '',
        },
        {
          img: 'game2.png',
          badge: 'new',
        },
        {
          img: 'game3.png',
          badge: '',
        },
        {
          img: 'game4.png',
          badge: 'best',
        },
        {
          img: 'game5.png',
          badge: '',
        },
        {
          img: 'game6.png',
          badge: 'new',
        },
        {
          img: 'game7.png',
          badge: '',
        },
        {
          img: 'game8.png',
          badge: 'new',
        },
        {
          img: 'game9.png',
          badge: 'best',
        },
        {
          img: 'game1.png',
          badge: '',
        },
        {
          img: 'game2.png',
          badge: '',
        },
        {
          img: 'game3.png',
          badge: 'new',
        },
      ],
      liveGames: [
        {
          img: 'game9.png',
          badge: '',
        },
        {
          img: 'game8.png',
          badge: '',
        },
        {
          img: 'game7.png',
          badge: 'new',
        },
        {
          img: 'game6.png',
          badge: 'best',
        },
        {
          img: 'game5.png',
          badge: '',
        },
        {
          img: 'game4.png',
          badge: 'best',
        },
        {
          img: 'game3.png',
          badge: '',
        },
        {
          img: 'game2.png',
          badge: '',
        },
        {
          img: 'game1.png',
          badge: 'best',
        },
        {
          img: 'game8.png',
          badge: '',
        },
        {
          img: 'game7.png',
          badge: '',
        },
        {
          img: 'game6.png',
          badge: 'new',
        },
      ],
    };
  },
  computed: {
    ...mapState([
      'width',
      'games',
      'defaultGames',
      'gamesAreLoading',
      'defaultGamesAreLoading',
      'gameProducerList',
      'categories',
    ]),
    ...mapGetters(['fakedNewGames', 'isLoggedIn', 'gamesSearched']),
    gamesParams() {
      const params = {};
      if (this.tabActive.type) params.category = this.tabActive.type;
      if (this.providerActive.name !== 'All providers')
        params.gameProducer = this.providerActive.name;
      return params;
    },
    filteredGames() {
      return this.gamesSearched(this.searched);
    },
    title() {
      const selectedCategory = this.categories.find(
        category => category.slug === this.tabActive.type,
      );
      if (selectedCategory) return selectedCategory.name;
      return 'All games';
    },
  },
  created() {
    this.getGames(this.gamesParams);
  },
  methods: {
    ...mapActions(['getGames']),
    onChooseTab(i) {
      this.searched = '';
      this.gamesShowed = this.gamesToShow;
      this.tabActive = this.tabs[i];
      this.getGames(this.gamesParams);
      this.isOpen = false;
    },
    onChooseProvider(e) {
      this.searched = '';
      this.providerActive = e;
      this.getGames(this.gamesParams);
    },
    onClickOutsideTabs(e) {
      if (!e.target.closest('.DefaultGames-ChosenTab')) this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.DefaultGames {
  position: relative;

  &-Tabs {
    position: absolute;
    top: 41px;
    left: 0;
    z-index: 2;
    width: 100%;
    padding: 0 16px 10px;
    background-color: var(--color-body);

    @media (min-width: $screen-m) {
      position: relative;
      top: initial;
      left: initial;
      display: grid;
      margin-bottom: 10px;
      padding: 0;
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 10px;
    }

    //@media(max-width: $screen-s) {
    //  position: absolute;
    //  left: 0;
    //  top: 125px;
    //  flex-direction: column;
    //  order: 2;
    //  width: 100%;
    //  margin-right: 0;
    //  border: 1px solid var(--color-border-ghost);
    //  border-top: none;
    //  border-radius: 0 0 8px 8px;
    //
    //  .DefaultGames-Tab--active {
    //    display: none;
    //  }
    //}
  }

  &-ChosenTab {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 16px;
    background: var(--color-bg);
    border: none;

    @media (min-width: $screen-m) {
      display: none;
    }

    .Arrow {
      position: absolute;
      top: 50%;
      right: 20px;
      margin-top: -2px;
    }

    .Arrow--up {
      margin-top: -8px;
    }
  }

  &-Tab {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 16px;
    line-height: 1.18;
    white-space: nowrap;
    background-color: var(--color-bg);
    cursor: pointer;

    @media (min-width: $screen-m) {
      display: block;
      padding: 20px 10px;
    }

    @media (min-width: $screen-l) {
      padding: 20px 13px;
    }

    &--active {
      display: none;

      @media (min-width: $screen-m) {
        display: initial;
        padding-bottom: 18px;
        border-bottom: 2px solid var(--color-main1);
      }
    }
  }

  &-Name {
    font-size: 12px;
    font-weight: 700;
    line-height: 1.242;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      font-size: 9px;
      color: var(--color-text-main);
    }

    @media (min-width: $screen-l) {
      font-size: 10px;
    }

    @media (min-width: $screen-xl) {
      font-size: 12px;
    }
  }

  &-Icon {
    width: 55px;
    text-align: center;

    @media (min-width: $screen-m) {
      width: auto;
      margin-bottom: 10px;
    }

    &--star {
      width: 18px;
      height: 17px;

      @media (min-width: $screen-xl) {
        width: 25px;
        height: 23px;
      }
    }

    &--crown {
      width: 18px;
      height: 17px;

      @media (min-width: $screen-xl) {
        width: 22px;
        height: 22px;
      }
    }

    &--live {
      width: 17px;
      height: 17px;

      @media (min-width: $screen-xl) {
        width: 23px;
        height: 23px;
      }
    }

    &--slots {
      width: 34px;
      height: 17px;

      @media (min-width: $screen-xl) {
        width: 46px;
        height: 23px;
      }
    }

    &--roulette {
      width: 17px;
      height: 17px;

      @media (min-width: $screen-xl) {
        width: 22px;
        height: 22px;
      }
    }

    &--table {
      width: 17px;
      height: 17px;

      @media (min-width: $screen-xl) {
        width: 22px;
        height: 22px;
      }
    }

    &--cards {
      width: 18px;
      height: 17px;

      @media (min-width: $screen-xl) {
        width: 26px;
        height: 25px;
      }
    }
  }

  &-Cards {
    margin-bottom: 20px;

    @media (min-width: $screen-l) {
      margin-bottom: 24px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 32px;
    }
  }

  &-Btn {
    text-align: center;

    .Btn {
      @media (min-width: $screen-m) {
        padding: 17px 20px;
        font-size: 14px;
      }

      @media (min-width: $screen-l) {
        font-size: 16px;
      }
    }
  }

  &-Providers {
    margin-bottom: 24px;

    @media (min-width: $screen-m) {
      margin-bottom: 34px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 40px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 60px;
    }
  }

  &-Search {
    z-index: 1;
    margin-top: 8px;
    margin-bottom: 8px;

    @media (min-width: $screen-m) {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}

.Cards {
  margin-bottom: 32px;

  @media (min-width: $screen-m) {
    margin-bottom: 38px;
  }

  @media (min-width: $screen-l) {
    margin-bottom: 50px;
  }

  @media (min-width: $screen-xl) {
    margin-bottom: 60px;
  }

  &-Title {
    margin-bottom: 20px;
  }

  &-Items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    justify-items: center;

    @media (min-width: $screen-s) {
      grid-template-columns: repeat(6, 1fr);
    }
  }
}
</style>
