<template>
  <div>
    <section class="BestGames Cards">
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
      <div class="ProvidersSection BestGames-Providers">
        <Search class="ProvidersSection-Search" />
        <ProvidersMenu :providerActive="providerActive" @chooseProvider="providerActive = $event" />
      </div>
      <div class="Title Title--type-h2 Cards-Title">
        The best games
      </div>
      <Loader v-if="gamesAreLoading" />
      <template v-else>
        <div class="Cards-Items BestGames-Cards">
          <Card v-for="(game, i) in gamesLimited(gamesShowed)"
            :key="i"
            :imgUrl="game.imageUrl"
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
        <Card v-for="(game, i) in fakedNewGames"
          :key="i"
          :imgUrl="game.imageUrl"
          @play="onClickStartGame({ gameId: game.gameId, returnUrl: '/' })"
          @playDemo="startGame({ gameId: game.gameId, returnUrl: '/', demo: true })"
          overlay
        />
      </div>
<!--      <div class="BestGames-Btn">-->
<!--        <button class="Btn Btn&#45;&#45;color" @click="showMoreGames()">-->
<!--          Load more games-->
<!--        </button>-->
<!--      </div>-->
    </section>
<!--    <section class="LiveGames Cards">-->
<!--      <div class="Title Title&#45;&#45;type-h2 Cards-Title">-->
<!--        Live games-->
<!--      </div>-->
<!--      <div class="Cards-Items BestGames-Cards NewGames-Cards">-->
<!--        <Card v-for="(game, i) in liveGames"-->
<!--          :key="i"-->
<!--          :img="game.img"-->
<!--          :badge="game.badge"-->
<!--          overlay-->
<!--        />-->
<!--      </div>-->
<!--      <div class="BestGames-Btn">-->
<!--        <button class="Btn Btn&#45;&#45;color" @click="showMoreGames()">-->
<!--          Load more games-->
<!--        </button>-->
<!--      </div>-->
<!--    </section>-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Loader from '@/components/homepage/Loader';
import Search from '@/components/Search';
import Card from '@/components/homepage/Card';
import showAuthDialog from '@/mixins/showAuthDialog';
import ProvidersMenu from '@/components/ProvidersMenu';

export default {
  name: 'BestGames',
  components: {
    ProvidersMenu,
    Search,
    Loader,
    Card,
  },
  mixins: [showAuthDialog],
  data() {
    return {
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
    ...mapGetters(['gamesLimited', 'fakedNewGames', 'isLoggedIn']),
    badges() {
      return this.games.map(() => {
        const random = Math.floor(Math.random() * 4) + 1;
        if (random === 1) return 'best';
        if (random === 2) return 'new';
        return '';
      });
    },
  },
  methods: {
    ...mapActions(['getGames', 'startGame']),
    onChooseTab(i) {
      this.gamesShowed = this.gamesToShow;
      this.tabActive = this.tabs[i];
      this.getGames(this.makeQuery());
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

  &-Providers {
    margin-bottom: 24px;

    @media(min-width: $screen-m) {
      margin-bottom: 34px;
    }

    @media(min-width: $screen-l) {
      margin-bottom: 40px;
    }

    @media(min-width: $screen-xl) {
      margin-bottom: 60px;
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
