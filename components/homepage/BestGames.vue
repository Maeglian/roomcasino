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
        <Search v-model="searched" class="ProvidersSection-Search DefaultGames-Search" />
        <ProvidersMenu
          v-if="gameProducerList.length"
          :provider-active="providerActive"
          @choose-provider="onChooseProvider"
        />
      </div>
      <div v-if="searched" class="SearchedGames">
        <div class="Title Title--type-h2 Cards-Title">Searched</div>
        <Games
          class="DefaultGames-Cards"
          :games="filteredGames"
          :games-to-show="24"
          btn-class="Btn--common Btn--dark"
        />
      </div>
      <div class="Title Title--type-h2 Cards-Title">
        {{ title }}
      </div>
      <Nuxt />
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
import { mapState, mapGetters, mapMutations } from 'vuex';
// import Loader from '@/components/Loader';
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
    // Loader,
    Games,
  },
  mixins: [showAuthDialog, toggleDropdown, gameProducer],
  data() {
    return {
      listIsOpen: false,
      tabs: [
        {
          name: this.$t('gameCategories.top'),
          type: 'top',
          icon: 'crown',
        },
        {
          name: this.$t('gameCategories.all'),
          type: 'all',
          icon: 'star',
        },
        {
          name: this.$t('gameCategories.live'),
          type: 'live',
          icon: 'live',
        },
        {
          name: this.$t('gameCategories.slots'),
          type: 'slots',
          icon: 'slots',
        },
        {
          name: this.$t('gameCategories.roulette'),
          type: 'roulette',
          icon: 'roulette',
        },
        {
          name: this.$t('gameCategories.table'),
          type: 'table',
          icon: 'table',
        },
        {
          name: this.$t('gameCategories.card'),
          type: 'card',
          icon: 'cards',
        },
      ],
      tabActive: {},
      providerActive: {},
      searched: '',
    };
  },
  computed: {
    ...mapState([
      'width',
      'games',
      'defaultGames',
      'gamesAreLoading',
      'defaultGamesAreLoading',
      'categories',
    ]),
    ...mapGetters(['fakedNewGames', 'isLoggedIn', 'gamesSearched', 'activeAccount']),
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
  watch: {
    gameProducerList: {
      immediate: true,
      handler() {
        if (this.gameProducerList.length) this.providerActive = this.gameProducerList[0];
      },
    },
  },
  mounted() {
    this.tabActive =
      this.tabs.find(game => this.$route.params.gameCategory === game.type) || this.tabs[0];
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
      this.tabActive = this.tabs.find(tab => tab.type === 'all');
      this.$router.push(
        this.localePath({
          name: 'index-providers-providerName',
          params: {
            category: this.tabActive.type,
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
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 10px;
      margin-bottom: 10px;
      padding: 0;
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
    justify-content: center;
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
