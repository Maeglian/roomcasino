<template>
  <div>
    <section class="DefaultGames">
      <div v-click-outside="onClickOutsideTabs" class="DefaultGames-Tabs">
        <NuxtLink
          v-for="(tab, i) in tabs"
          :key="tab.name"
          :class="{ 'DefaultGames-Tab--active': tabActive.name === tab.name }"
          :to="
            localePath({
              name: 'index-games-gameCategory',
              params: {
                gameCategory: tab.type,
                producer: providerActive.name === 'All providers' ? false : providerActive.name,
              },
            })
          "
          class="DefaultGames-Tab"
          @click.native="onChooseTab(i)"
        >
          <div class="DefaultGames-Icon">
            <svg :class="`DefaultGames-Icon--${tab.icon}`">
              <use :xlink:href="require('@/assets/img/icons.svg') + `#${tab.icon}`"></use>
            </svg>
          </div>
          <div class="DefaultGames-Name">
            {{ tab.name }}
          </div>
        </NuxtLink>
      </div>
      <div class="ProvidersSection DefaultGames-Providers">
        <Search
          v-if="width >= 768"
          v-model="searched"
          class="ProvidersSection-Search DefaultGames-Search"
          with-dropdown
        >
          <template v-if="searched" #dropdown>
            <div v-if="filteredGames.length" class="Title Title--type-h4 Cards-Title">
              {{ $t('search.searchResults') }} ({{ filteredGames.length }})
            </div>
            <Games
              class="DefaultGames-Cards"
              :games="filteredGames"
              :games-to-show="12"
              btn-class="Btn--common Btn--outline"
            >
              <template #notFound>
                <div class="Title Title--type-h4">
                  {{ $t('search.nothingFound') }}
                </div>
                <div class="Text Text--additional">
                  {{ $t('search.try') }}
                </div>
              </template>
            </Games>
          </template>
        </Search>
        <ProvidersMenu
          v-if="gameProducerList.length"
          :provider-active="providerActive"
          @choose-provider="onChooseProvider"
        />
      </div>
      <a id="games"></a>
      <Nuxt :key="$route.path" />
      <template v-if="getRouteBaseName($route) === 'index'">
        <div class="Title Title--type-h2 Cards-Title">
          {{ $t('gameCategories.top') }}
        </div>
        <Loader v-if="topGamesAreLoading" />
        <Games
          v-else
          class="DefaultGames-Cards"
          :games="topGames"
          :games-to-show="24"
          btn-class="Btn--common Btn--outline"
        />
      </template>
      <template v-if="recentGames.length">
        <div class="Title Title--type-h2 Cards-Title">
          {{ $t('gameCategories.recent') }}
        </div>
        <Games
          :key="isLoggedIn"
          class="DefaultGames-Cards"
          :games="recentGames"
          :games-to-show="recentGamesNum"
          btn-class="Btn--common Btn--dark"
        />
      </template>
      <template v-if="newGames.length">
        <div class="Title Title--type-h2 Cards-Title">
          {{ $t('gameCategories.new') }}
        </div>
        <Loader v-if="newGamesAreLoading" />
        <Games
          v-else
          class="DefaultGames-Cards"
          :games="newGames"
          :games-to-show="6"
          :games-to-load-more="12"
          btn-class="Btn--common Btn--outline"
        />
      </template>
      <div class="Title Title--type-h2 Cards-Title">
        {{ $t('gameCategories.live') }}
      </div>
      <Loader v-if="liveGamesAreLoading" />
      <Games
        v-else
        class="DefaultGames-Cards"
        :games="liveGames"
        :games-to-show="6"
        :games-to-load-more="12"
        btn-class="Btn--common Btn--outline"
      />
      <template v-if="jackpotGames.length">
        <div class="Title Title--type-h2 Cards-Title">
          Jackpots
        </div>
        <Loader v-if="jackpotGamesAreLoading" />
        <Games
          v-else
          class="DefaultGames-Cards"
          :games="jackpotGames"
          :games-to-show="6"
          :games-to-load-more="12"
          btn-class="Btn--common Btn--outline"
        />
      </template>
      <template v-if="buybonusGames.length">
        <div class="Title Title--type-h2 Cards-Title">
          {{ $t('gameCategories.buybonus') }}
        </div>
        <Loader v-if="buybonusGamesAreLoading" />
        <Games
          v-else
          class="DefaultGames-Cards"
          :games="buybonusGames"
          :games-to-show="6"
          :games-to-load-more="12"
          btn-class="Btn--common Btn--outline"
        />
      </template>
      <template v-if="megawaysGames.length">
        <div class="Title Title--type-h2 Cards-Title">
          Megaways
        </div>
        <Loader v-if="megawaysGamesAreLoading" />
        <Games
          v-else
          class="DefaultGames-Cards"
          :games="megawaysGames"
          :games-to-show="6"
          :games-to-load-more="12"
          btn-class="Btn--common Btn--outline"
        />
      </template>
      <template v-if="luckychoiceGames.length">
        <div class="Title Title--type-h2 Cards-Title">
          Lucky Choice
        </div>
        <Loader v-if="luckychoiceGamesAreLoading" />
        <Games
          v-else
          class="DefaultGames-Cards"
          :games="luckychoiceGames"
          :games-to-show="6"
          :games-to-load-more="12"
          btn-class="Btn--common Btn--outline"
        />
      </template>
      <template v-if="dropsWinsSlotsGames.length">
        <div class="Title Title--type-h2 Cards-Title">
          Drops & Wins - slots
        </div>
        <Loader v-if="dropsWinsSlotsGamesAreLoading" />
        <Games
          v-else
          class="DefaultGames-Cards"
          :games="dropsWinsSlotsGames"
          :games-to-show="6"
          :games-to-load-more="12"
          btn-class="Btn--common Btn--outline"
        />
      </template>
      <!--      <template v-if="dropsWinsLiveGames.length">
        <div class="Title Title&#45;&#45;type-h2 Cards-Title">
          Drops & Wins - live
        </div>
        <Loader v-if="dropsWinsLiveGamesAreLoading" />
        <Games
          v-else
          class="DefaultGames-Cards"
          :games="dropsWinsLiveGames"
          :games-to-show="6"
          :games-to-load-more="12"
          btn-class="Btn&#45;&#45;common Btn&#45;&#45;outline"
        />
      </template>-->
    </section>
    <!--    <section-->
    <!--      v-if="tabActive.type !== 'all' || providerActive.name !== 'All providers'"-->
    <!--      class="DefaultGames"-->
    <!--    >-->
    <!--      <Loader v-if="defaultGamesAreLoading" />-->
    <!--      <div class="Title Title&#45;&#45;type-h2 Cards-Title">{{ $t('gameCategories.all') }}</div>-->
    <!--      <Games-->
    <!--        class="DefaultGames-Cards NewGames-Cards"-->
    <!--        :games="defaultGames"-->
    <!--        :games-to-show="24"-->
    <!--        btn-class="Btn&#45;&#45;common Btn&#45;&#45;dark"-->
    <!--      />-->
    <!--    </section>-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import Loader from '@/components/Loader';
import Search from '@/components/Search';
import showAuthDialog from '@/mixins/showAuthDialog';
import ProvidersMenu from '@/components/ProvidersMenu';
import { PRAGMATIC_WS_SERVER, PRAGMATIC_CASINOID } from '@/config';
import Games from '@/components/Games';
import toggleDropdown from '@/mixins/toggleDropdown';
import gameProducer from '@/mixins/gameProducer';

export default {
  name: 'DefaultGames',
  components: {
    ProvidersMenu,
    Search,
    Loader,
    Games,
  },
  mixins: [showAuthDialog, toggleDropdown, gameProducer],
  data() {
    return {
      listIsOpen: false,
      tabActive: {},
      providerActive: {},
      searched: '',
    };
  },
  computed: {
    ...mapState(['width']),
    ...mapState('dictionary', ['categories']),
    ...mapState('games', [
      'games',
      'defaultGames',
      'gamesAreLoading',
      'defaultGamesAreLoading',
      'topGames',
      'recentGames',
      'newGames',
      'liveGames',
      'jackpotGames',
      'megawaysGames',
      'buybonusGames',
      'luckychoiceGames',
      'dropsWinsSlotsGames',
      'dropsWinsLiveGames',
      'newGamesAreLoading',
      'topGamesAreLoading',
      'liveGamesAreLoading',
      'jackpotGamesAreLoading',
      'megawaysGamesAreLoading',
      'buybonusGamesAreLoading',
      'luckychoiceGamesAreLoading',
      'dropsWinsSlotsGamesAreLoading',
      'dropsWinsLiveGamesAreLoading',
    ]),
    ...mapGetters(['isLoggedIn', 'activeAccount']),
    ...mapGetters('games', ['gamesSearched']),
    tabs() {
      if (this.width < 768) {
        return [
          {
            name: this.$t('gameCategoriesTabs.slots'),
            type: 'slots',
            icon: 'slots',
          },
          {
            name: this.$t('gameCategoriesTabs.live'),
            type: 'live',
            icon: 'live',
          },
          {
            name: this.$t('gameCategoriesTabs.top'),
            type: 'top',
            icon: 'crown',
          },
          {
            name: this.$t('gameCategoriesTabs.buybonus'),
            type: 'buybonus',
            icon: 'crown',
          },
          {
            name: this.$t('gameCategoriesTabs.new'),
            type: 'new',
            icon: 'crown',
          },
          {
            name: this.$t('gameCategoriesTabs.table'),
            type: 'table',
            icon: 'table',
          },
        ];
      }
      return [
        {
          name: this.$t('gameCategoriesTabs.top'),
          type: 'top',
          icon: 'crown',
        },
        {
          name: this.$t('gameCategoriesTabs.all'),
          type: 'all',
          icon: 'star',
        },
        {
          name: this.$t('gameCategoriesTabs.live'),
          type: 'live',
          icon: 'live',
        },
        {
          name: this.$t('gameCategoriesTabs.slots'),
          type: 'slots',
          icon: 'slots',
        },
        {
          name: this.$t('gameCategoriesTabs.roulette'),
          type: 'roulette',
          icon: 'roulette',
        },
        {
          name: this.$t('gameCategoriesTabs.table'),
          type: 'table',
          icon: 'table',
        },
        {
          name: this.$t('gameCategoriesTabs.card'),
          type: 'card',
          icon: 'cards',
        },
      ];
    },
    recentGamesNum() {
      return this.width > 590 ? (this.width > 960 ? 6 : 4) : 2;
    },
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
  },
  watch: {
    gameProducerList: {
      immediate: true,
      handler() {
        if (this.gameProducerList.length) this.providerActive = this.gameProducerList[0];
      },
    },
    isLoggedIn: {
      immediate: true,
      handler() {
        if (this.isLoggedIn) {
          this.getRecentGames();
        }
      },
    },
  },
  mounted() {
    if (this.$route.params.providerName) this.tabActive = this.tabs.find(tab => tab.type === 'all');
    else {
      this.tabActive =
        this.tabs.find(game => this.$route.params.gameCategory === game.type) ||
        this.tabs.find(game => game.type === 'top');
    }
    window.dga.connect(PRAGMATIC_WS_SERVER, PRAGMATIC_CASINOID);
    window.dga.onConnect = () => window.dga.available(PRAGMATIC_CASINOID);
    window.dga.onMessage = data => {
      if (data.tableKey) {
        data.tableKey.forEach(table =>
          window.dga.subscribe(PRAGMATIC_CASINOID, table, this.activeAccount.currency || 'EUR'),
        );
      }

      if (data.tableId) this.setDgaInfo({ producer: 'pragmatic live', game: data.tableId, data });
    };
  },
  beforeDestroy() {
    window.dga.disconnect();
  },
  methods: {
    ...mapMutations(['setDgaInfo']),
    ...mapActions('games', ['getRecentGames']),
    onChooseTab(i) {
      this.searched = '';
      this.gamesShowed = this.gamesToShow;
      this.tabActive = this.tabs[i];
      this.isOpen = false;
      this.providerActive = this.gameProducerList[0];
    },
    onChooseProvider(e) {
      this.searched = '';
      this.providerActive = e;
      this.$router.push(
        this.localePath({
          name: 'index-providers-providerName',
          params: {
            providerName: e.name === this.gameProducerList[0].name ? 'all' : e.name,
          },
        }),
      );
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
    display: flex;
    width: 100%;
    margin-bottom: 16px;
    overflow-x: scroll;
    background-color: var(--color-body);

    @media (min-width: $screen-m) {
      position: relative;
      top: initial;
      left: initial;
      display: grid;
      margin-bottom: 10px;
      padding: 0;
      overflow-x: auto;
      grid-template-columns: repeat(7, 1fr);
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
    padding: 17px 16px;
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
    justify-content: left;
    align-items: center;
    width: 100%;
    padding: 17px 16px;
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
      background: var(--color-bg-lighter);

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
    text-align: center;
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
    display: none;
    width: 55px;
    text-align: center;

    @media (min-width: $screen-m) {
      display: block;
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
    margin-bottom: 30px;

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
    border: 2px solid var(--color-border);

    @media (min-width: $screen-m) {
      margin-top: 0;
      margin-bottom: 0;
    }

    &.Search--open {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 1001;
      width: 100%;
      background: var(--color-body);
      cursor: initial;

      .Search-Close {
        @media (min-width: $screen-m) {
          right: 16px;
          left: initial;
        }
      }
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
