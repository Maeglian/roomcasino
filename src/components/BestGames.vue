<template>
  <!-- eslint-disable max-len -->
  <fragment>
    <section class="BestGames Cards">
<!--          <button-->
<!--            class="BestGames-Tab BestGames-Tab&#45;&#45;active BestGames-ChosenTab"-->
<!--            :class="{'BestGames-ChosenTab&#45;&#45;opened': listIsOpen}"-->
<!--            @click="listIsOpen = !listIsOpen"-->
<!--          >-->
<!--            <svg-->
<!--              class="Icon"-->
<!--              :class="`BestGames-Icon&#45;&#45;${tabActive.icon}`"-->
<!--            >-->
<!--              <use :xlink:href="require('@/assets/img/icons.svg') + `#${tabActive.icon}`"></use>-->
<!--            </svg>-->
<!--            {{tabActive.name}}-->
<!--            <i-->
<!--              class="Arrow Tab-Arrow"-->
<!--              :class="[ listIsOpen ? 'Arrow&#45;&#45;up' : 'Arrow&#45;&#45;down' ]"-->
<!--            ></i>-->
<!--          </button>-->
        <div v-if="width > 767"
         class="BestGames-Tabs"
        >
          <button
            v-for="(tab, i) in tabs"
            :key="tab.name"
            class="BestGames-Tab"
            :class="{'BestGames-Tab--active': tabActive.name === tab.name}"
            @click="onChooseTab(i)"
          >
            <svg
              :class="`BestGames-Icon BestGames-Icon--${tab.icon}`"
            >
              <use :xlink:href="require('@/assets/img/icons.svg') + `#${tab.icon}`"></use>
            </svg>
            <div class="BestGames-Name">
              {{tab.name}}
            </div>
          </button>
        </div>
        <div class="BestGames-ProvidersMenu" v-click-outside="onClickOutside">
          <button
            class="BestGames-Tab BestGames-ChosenTab"
            :class="{'BestGames-ChosenTab--opened': providersListIsOpen}"
            @click="providersListIsOpen = !providersListIsOpen"
          >
            <img
              v-if="providerActive.icon"
              class="BestGames-ProviderIcon"
              :src="require(`@/assets/img/${providerActive.icon}.svg`)"
              alt=""
            >
            {{providerActive.name}}
            <i
              class="Arrow Tab-Arrow"
              :class="[ providersListIsOpen ? 'Arrow--up' : 'Arrow--down' ]"
            ></i>
          </button>
          <div v-if="width > 767" class="BestGames-Providers">
            <button
              v-for="(item, i) in providersToShow"
              :key="providers[i].name"
              class="BestGames-Provider"
              :class="{'BestGames-Provider--active': providerActive.name === providers[i].name}"
              @click="onChooseProvider(providers[i].name)"
            >
              <img
                v-if="providers[i].icon"
                class="BestGames-ProviderIcon"
                :src="require(`@/assets/img/${providers[i].icon}.svg`)"
                alt=""
              >
              {{ providers[i].name }}
            </button>
            <button
              v-if="width > 767"
              class="BestGames-Provider BestGames-Provider--more"
              :class="{'BestGames-Provider--active': providersListIsOpen}"
              @click="providersListIsOpen = !providersListIsOpen"
            >
              ...
            </button>
          </div>
          <Search class="BestGames-Search" />
          <transition name="slide-up">
            <div v-if="providersListIsOpen" class="BestGames-MoreProviders">
              <button
                v-for="(item, i) in moreProviders"
                :key="i"
                class="BestGames-AddProvider"
                :class="{'BestGames-Provider--active': providerActive.name === item.name}"
                @click="onChooseProvider(item.name)"
              >
                <img
                  v-if="item.icon"
                  class="BestGames-ProviderIcon"
                  :src="require(`@/assets/img/${item.icon}.svg`)"
                  alt=""
                >
                {{ item.name }}
              </button>
            </div>
          </transition>
        </div>
      <div class="Title Title--type-h2 Cards-Title">
        The best games
      </div>
      <Loader v-if="gamesAreLoading" />
      <template v-else>
        <div class="Cards-Items BestGames-Cards">
          <Card v-for="(game, i) in gamesLimited(gamesShowed)"
            :key="i"
            img="game3.png"
            :badge="badges[i]"
            @play="onClickStartGame({ gameId: game.gameId, returnUrl: '/' })"
            @playDemo="startGame({ gameId: game.gameId, returnUrl: '/', demo: true })"
            overlay
          />
        </div>
        <div v-if="games.length > gamesShowed" class="BestGames-Btn">
          <button class="Btn Btn--color" @click="showMoreGames()">
            Load more games
          </button>
        </div>
      </template>
    </section>
    <section class="NewGames Cards">
      <div class="Title Title--type-h2 Cards-Title">
        New games
      </div>
      <div class="Cards-Items BestGames-Cards NewGames-Cards">
        <Card v-for="(game, i) in newGames"
          :key="i"
          :img="game.img"
          :badge="game.badge"
          overlay
        />
      </div>
      <div class="BestGames-Btn">
        <button class="Btn Btn--color" @click="showMoreGames()">
          Load more games
        </button>
      </div>
    </section>
    <section class="LiveGames Cards">
      <div class="Title Title--type-h2 Cards-Title">
        Live games
      </div>
      <div class="Cards-Items BestGames-Cards NewGames-Cards">
        <Card v-for="(game, i) in liveGames"
          :key="i"
          :img="game.img"
          :badge="game.badge"
          overlay
        />
      </div>
      <div class="BestGames-Btn">
        <button class="Btn Btn--color" @click="showMoreGames()">
          Load more games
        </button>
      </div>
    </section>
  </fragment>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Search from '@/components/Search.vue';
import Loader from '@/components/Loader.vue';
import Card from '@/components/Card.vue';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'BestGames',
  components: {
    Search,
    Loader,
    Card,
  },
  mixins: [showAuthDialog],
  data() {
    return {
      providersListIsOpen: false,
      tabs: [
        {
          name: 'All games',
          icon: 'star',
        },
        {
          name: 'Top games',
          icon: 'crown',
        },
        {
          name: 'Live casino',
          icon: 'live',
        },
        {
          name: 'Slots games',
          icon: 'slots',
        },
        {
          name: 'Roulette',
          icon: 'roulette',
        },
        {
          name: 'Table games',
          icon: 'table',
        },
        {
          name: 'Card games',
          icon: 'cards',
        },
      ],
      tabActive: {
        name: 'All games',
        icon: 'star',
      },
      providers: [
        {
          name: 'All providers',
        },
        {
          name: 'Netent',
          icon: 'netent',
        },
        {
          name: "Play'n go",
          icon: 'go',
        },
        {
          name: 'Microgaming',
          icon: 'microgaming',
        },
        {
          name: '1x2 gambing',
          icon: 'gaming_book',
        },
        {
          name: 'Amatic',
          icon: 'amatic',
        },
        {
          name: 'Belatra',
          icon: 'belatra',
        },
        {
          name: 'Spinometal',
          icon: 'spinometal',
        },
        {
          name: 'Booming games',
          icon: 'booming',
        },
        {
          name: 'Egt',
          icon: 'egt',
        },
        {
          name: 'Endorphina',
          icon: 'endorphina',
        },
        {
          name: 'Netent',
          icon: 'netent',
        },
        {
          name: "Play'n go",
          icon: 'go',
        },
        {
          name: 'Microgaming',
          icon: 'microgaming',
        },
        {
          name: '1x2 gambing',
          icon: 'gaming_book',
        },
        {
          name: 'Amatic',
          icon: 'amatic',
        },
        {
          name: 'Belatra',
          icon: 'belatra',
        },
        {
          name: 'Spinometal',
          icon: 'spinometal',
        },
        {
          name: 'Booming games',
          icon: 'booming',
        },
        {
          name: 'Egt',
          icon: 'egt',
        },
        {
          name: 'Endorphina',
          icon: 'endorphina',
        },
        {
          name: 'Netent',
          icon: 'netent',
        },
        {
          name: "Play'n go",
          icon: 'go',
        },
        {
          name: 'Microgaming',
          icon: 'microgaming',
        },
        {
          name: '1x2 gambing',
          icon: 'gaming_book',
        },
        {
          name: 'Amatic',
          icon: 'amatic',
        },
        {
          name: 'Belatra',
          icon: 'belatra',
        },
        {
          name: 'Spinometal',
          icon: 'spinometal',
        },
        {
          name: 'Booming games',
          icon: 'booming',
        },
        {
          name: 'Egt',
          icon: 'egt',
        },
        {
          name: 'Endorphina',
          icon: 'endorphina',
        },
        {
          name: 'Netent',
          icon: 'netent',
        },
        {
          name: "Play'n go",
          icon: 'go',
        },
        {
          name: 'Microgaming',
          icon: 'microgaming',
        },
        {
          name: '1x2 gambing',
          icon: 'gaming_book',
        },
        {
          name: 'Amatic',
          icon: 'amatic',
        },
        {
          name: 'Belatra',
          icon: 'belatra',
        },
        {
          name: 'Spinometal',
          icon: 'spinometal',
        },
        {
          name: 'Booming games',
          icon: 'booming',
        },
        {
          name: 'Egt',
          icon: 'egt',
        },
        {
          name: 'Endorphina',
          icon: 'endorphina',
        },
      ],
      providersToShow: 4,
      providerActive: {
        name: 'All providers',
      },
      vcoConfig: {
        handler: this.handler,
        middleware: this.middleware,
        events: ['dblclick', 'click'],
        // Note: The default value is true, but in case you want to activate / deactivate
        //       this directive dynamically use this attribute.
        isActive: true,
        // Note: The default value is true. See "Detecting Iframe Clicks" section
        //       to understand why this behaviour is behind a flag.
        detectIFrame: true,
      },
      gamesToShow: 24,
      gamesShowed: 24,
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
    ...mapState(['width', 'games', 'gamesAreLoading']),
    ...mapGetters(['gamesLimited', 'isLoggedIn']),
    badges() {
      return this.games.map(() => {
        const random = Math.floor(Math.random() * 4) + 1;
        if (random === 1) return 'best';
        if (random === 2) return 'new';
        return '';
      });
    },
    moreProviders() {
      if (this.width < 768) return this.providers;
      return this.providers.slice(this.providersToShow, this.providers.length + 1);
    },
  },
  methods: {
    ...mapActions(['getGames', 'startGame']),
    onChooseTab(i) {
      this.gamesShowed = this.gamesToShow;
      this.tabActive = this.tabs[i];
      this.getGames(this.makeQuery());
    },
    onChooseProvider(name) {
      this.providerActive = this.providers.find((item) => item.name === name);
      this.providersListIsOpen = false;
    },
    onClickOutside(e) {
      if (e.target.className !== 'BestGames-ChosenTab') this.providersListIsOpen = false;
    },
    makeQuery() {
      let query = `appName=${this.$skin}&lang=en&platform=desktop`;
      switch (this.tabActive.name) {
        case 'New games':
          query += '&is_new=true';
          break;
        case 'Roulette':
          query += '&categories=Roulette';
          break;
        case 'Card games':
          query += '&categories=Card Games';
          break;
        case 'Live games':
          query += '&categories=Live Casino';
          break;
        case 'Slots':
          query += '&categories=Slot';
          break;
        default:
          query += '&is_most_popular=true';
      }

      return query;
    },
    showMoreGames() {
      this.gamesShowed += this.gamesToShow;
    },
    onClickStartGame(payload) {
      if (!this.isLoggedIn) {
        this.showRegistrationDialog('login');
      } else this.startGame(payload);
    },
  },
  created() {
    this.getGames();
  },
};
</script>

<style lang="scss">
.BestGames {
  &-Tabs {
    display: none;

    @media(min-width: $screen-m) {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 10px;
      width: 100%;
      margin-bottom: 10px;
      background-color: var(--color-body);
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
    //  .BestGames-Tab--active {
    //    display: none;
    //  }
    //}
  }

  &-Tab {
    padding: 13px 11px;
    line-height: 1.18;
    background-color: var(--color-bg);
    white-space: nowrap;
    cursor: pointer;

    @media(min-width: $screen-m) {
      padding: 20px 10px;
    }

    @media(min-width: $screen-l) {
      padding: 20px 13px;
    }

    &--active {
      position: relative;
      padding-bottom: 11px;
      border-bottom: 2px solid var(--color-main1);

      @media(min-width: $screen-m) {
        padding-bottom: 18px;
      }
    }
  }

  &-ChosenTab {
    position: relative;
    order: 1;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.242;
    text-transform: uppercase;
    color: var(--color-text-main);
    border: none;

    @media(min-width: $screen-m) {
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

  &-Name {
    font-size: 9px;
    font-weight: 700;
    line-height: 1.242;
    text-transform: uppercase;
    color: var(--color-text-main);

    @media(min-width: $screen-m) {
      font-size: 9px;
    }

    @media(min-width: $screen-l) {
      font-size: 10px;
    }

    @media(min-width: $screen-xl) {
      font-size: 12px;
    }
  }

  &-Icon {
    margin-bottom: 10px;

    &--star {
        width: 18px;
        height: 17px;

      @media(min-width: $screen-xl) {
        width: 25px;
        height: 23px;
      }
    }

    &--crown {
        width: 18px;
        height: 17px;

      @media(min-width: $screen-xl) {
        width: 22px;
        height: 22px;
      }
    }

    &--live {
      width: 17px;
      height: 17px;

      @media(min-width: $screen-xl) {
        width: 23px;
        height: 23px;
      }
    }

    &--slots {
      width: 34px;
      height: 17px;

      @media(min-width: $screen-xl) {
        width: 46px;
        height: 23px;
      }
    }

    &--roulette {
        width: 17px;
        height: 17px;

      @media(min-width: $screen-xl) {
        width: 22px;
        height: 22px;
      }
    }

    &--table {
        width: 17px;
        height: 17px;

      @media(min-width: $screen-xl) {
        width: 22px;
        height: 22px;
      }
    }

    &--cards {
      width: 18px;
      height: 17px;

      @media(min-width: $screen-xl) {
        width: 26px;
        height: 25px;
      }
    }
  }

  &-ProvidersMenu {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    @media(min-width: $screen-m) {
      flex-direction: initial;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 10px;
      margin-bottom: 34px;
    }

    @media(min-width: $screen-l) {
      margin-bottom: 40px;
    }

    @media(min-width: $screen-xl) {
      margin-bottom: 60px;
    }
  }

  &-Search {
    order: 0;
    margin-bottom: 8px;
    width: 100%;

    @media(min-width: $screen-m) {
      order: 2;
      width: auto;
      margin-bottom: 0;
    }
  }

  &-Providers {
    grid-column: 1/7;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    padding: 0;
  }

  &-MoreProviders {
    position: absolute;
    left: 0;
    top: 100px;
    z-index: 10;
    column-count: 2;
    width: 100%;
    padding: 0 16px 10px;
    background-color: var(--color-body);

    @media(min-width: $screen-s) {
      column-count: 3;
    }

    @media(min-width: $screen-m) {
      top: 50px;
      column-count: 5;
    }

    @media(min-width: $screen-l) {
      top: 70px;
    }
  }

  &-AddProvider {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.18;
    text-transform: uppercase;
    color: var(--color-text-ghost);
    cursor: pointer;
  }

  &-Provider {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 5px;
    font-size: 9px;
    font-weight: 700;
    line-height: 1.18;
    color: var(--color-text-main);
    text-transform: uppercase;
    border: 2px solid var(--color-border-ghost);
    cursor: pointer;

    @media(min-width: $screen-l) {
      padding: 15px 10px;
      font-size: 10px;
    }

    @media(min-width: $screen-xl) {
      padding: 17px 10px;
      font-size: 12px;
    }

    &--active {
      display: none;
      color: var(--color-main1);

      @media(min-width: $screen-m) {
        display: flex;
      }
    }

    &--more {
      justify-self: start;
      padding: 10px;
      font-size: 9px;
      letter-spacing: 0.08em;

      @media(min-width: $screen-l) {
        padding: 15px;
        font-size: 10px;
      }

      @media(min-width: $screen-xl) {
        padding: 17px 20px;
        font-size: 14px;
      }
    }
  }

  &-ProviderIcon {
    width: 10px;
    margin-right: 10px;

    @media(min-width: $screen-m) {
      width: auto;
      margin-right: 3px;
    }

    @media(min-width: $screen-l) {
      margin-right: 6px;
    }
  }

  &-Cards {
    margin-bottom: 20px;

    @media(min-width: $screen-l) {
      margin-bottom: 24px;
    }

    @media(min-width: $screen-xl) {
      margin-bottom: 32px;
    }
  }

  &-Btn {
    text-align: center;

    .Btn {
      @media(min-width: $screen-m) {
        padding: 17px 20px;
        font-size: 14px;
      }

      @media(min-width: $screen-l) {
        font-size: 16px;
      }
    }
  }
}

.Cards {
  margin-bottom: 32px;

  @media(min-width: $screen-m) {
    margin-bottom: 38px;
  }

  @media(min-width: $screen-l) {
    margin-bottom: 50px;
  }

  @media(min-width: $screen-xl) {
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

    @media(min-width: $screen-s) {
      grid-template-columns: repeat(6, 1fr);
    }
  }
}
</style>
