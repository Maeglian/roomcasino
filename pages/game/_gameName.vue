<template>
  <div v-if="game" class="GamePage">
    <GameModals />
    <div class="GamePage-Bg" :style="{ backgroundImage: `url(${game.backgroundUrl})` }"></div>
    <div class="GamePage-Wrapper" :class="{ 'GamePage-Wrapper--Hide': isFullScreen }">
      <MainNav v-if="!isFullScreen" />
      <div class="GamePage-Content">
        <div
          class="GamePage-IframeWrapper"
          :class="{ 'GamePage-IframeWrapper--fullScreenMode': isFullScreen }"
        >
          <iframe
            v-show="!gameHtml || showGame"
            ref="iframe"
            :key="activeAccount.balance"
            :src="gameHtml && game.gameProducer !== 'playngo' ? null : gameUrl"
            :srcDoc="gameHtml && game.gameProducer !== 'playngo' ? gameHtml : null"
            class="GamePage-Iframe"
            allowFullScreen="true"
          />
          <div class="GamePage-ControlGroup">
            <NuxtLink v-if="!isFullScreen" :to="localePath('/')" class="GamePage-Action">
              <img :src="closeIcon" />
            </NuxtLink>
            <div
              class="GamePage-Action"
              :class="{ 'GamePage-Action--fullScreenMode': isFullScreen }"
              @click="toggleFullScreenMode"
            >
              <img :src="getZoomIcon" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isFullScreen" class="GamePage-Footer Wrapper">
        <div class="GamePage-FooterContent">
          <h1 class="Title Title--type-h2 GamePage-Title">
            {{ game.gameName }}
          </h1>
          <button v-if="$route.query.demo" class="GamePage-PlayReal" @click="onClickPlayReal">
            {{ $t('actions.playReal') }}
          </button>
        </div>
        <TimePanel class="Wrapper" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';
import openGame from '@/mixins/openGame';
import MainNav from '@/components/homepage/MainNav';
import TimePanel from '@/components/GamePage/TimePanel';
import GameModals from '@/components/GameModals';

export default {
  name: 'GamePage',
  components: {
    MainNav,
    TimePanel,
    GameModals,
  },
  mixins: [showAuthDialog, openGame],
  beforeRouteLeave(to, from, next) {
    this.setStartingGame({ html: '', url: '' });
    if (this.isLoggedIn) this.getProfile();
    if (this.gameToStart) this.setGameToStart(null);
    next();
  },
  data: () => ({
    isFullScreen: false,
    showGame: false,
    clockIcon: require('@/assets/img/clock.svg'),
    closeIcon: require('@/assets/img/ic_close.svg'),
    zoomInIcon: require('@/assets/img/zoomIn.svg'),
    zoomOutIcon: require('@/assets/img/zoomOut.svg'),
  }),
  head() {
    if (this.game) {
      return {
        title: `ᐈ Play ${this.gameName} Game Now For Free Or Real Money | $450 Welcome Bonus At Ninecasino`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `★ Play ${this.gameName} Game For Free Or Real Money At Online Casino ✓ Fast withdrawal ✓ Fully licensed Ninecasino`,
          },
        ],
      };
    }
  },
  computed: {
    ...mapState(['platform']),
    ...mapState('games', ['gameUrl', 'gameHtml', 'defaultGames', 'gameToStart']),
    ...mapGetters(['activeAccount']),
    gameName() {
      return decodeURIComponent(this.$route.params.gameName);
    },
    gameIdParam() {
      return this.defaultGames.find(g => g.gameId === this.gameName);
    },
    game() {
      return this.defaultGames.find(g => g.gameName === this.gameName);
    },
    getZoomIcon() {
      return this.isFullScreen ? this.zoomOutIcon : this.zoomInIcon;
    },
  },
  watch: {
    isFullScreen() {
      const liveChat = document.getElementById('chat-widget-container');

      if (liveChat && this.isFullScreen) {
        liveChat.style.display = 'none';
      } else if (liveChat) {
        liveChat.style.display = '';
      }
    },
    defaultGames() {
      this.onEnterPage();
    },
    gameHtml(val) {
      if (val) this.addIframeOnLoadEvent();
    },
    '$route.query.demo': function() {
      this.onEnterPage();
    },
  },
  mounted() {
    this.onEnterPage();
    if (this.gameHtml) this.addIframeOnLoadEvent();
    this.gameTimer = setTimeout(() => {
      this.showGame = true;
    }, 2000);
  },
  beforeDestroy() {
    clearTimeout(this.gameTimer);
  },
  methods: {
    ...mapMutations('games', ['setStartingGame', 'setGameToStart']),
    ...mapActions(['getProfile']),
    ...mapActions('games', ['startGame']),
    toggleFullScreenMode() {
      this.isFullScreen = !this.isFullScreen;
    },
    onClickPlayReal() {
      this.setStartingGame({ html: '', url: '' });
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {},
      });
    },
    onEnterPage() {
      if (this.defaultGames.length) {
        if (this.gameIdParam) {
          this.$router.replace(
            this.localePath({
              name: 'game-gameName',
              params: { gameName: decodeURIComponent(this.gameIdParam.gameName) },
            }),
          );
        } else if (!this.game) this.$router.push(this.localePath('/404'));
        else {
          this.openGamePage({ game: this.game, demo: !!this.$route.query.demo });
        }
      }
    },
    addIframeOnLoadEvent() {
      const { iframe } = this.$refs;
      if (this.platform === 'mobile') this.isFullScreen = true;
      iframe.addEventListener(
        'load',
        () => {
          this.showGame = true;
          const style = document.createElement('style');
          style.textContent = `html{width:100%;height:100%}body{width:100%;height:100%;margin:0;padding:0}body>div{width:100%;height:100%}iframe{width:100%;height:100%;border:none;border-radius:12px}`;

          iframe.contentDocument.head.appendChild(style);
        },
        false,
      );
    },
  },
};
</script>

<style lang="scss">
.GamePage {
  position: relative;
  display: flex;
  flex-direction: column;

  &-Bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(0.8);
  }

  &-Wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: 1920px;
    height: 100vh;
    margin: 0 auto;

    &--Hide {
      width: 100%;
      max-width: 100%;
    }
  }

  &-Content {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  &-IframeWrapper {
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    margin: 15px auto;

    @media (min-width: $screen-xl) {
      width: 80%;
    }

    @media (min-width: $screen-xxl) {
      width: 65%;
    }

    @media (min-width: $screen-xxxl) {
      width: 100%;
      height: 70%;
    }

    &--fullScreenMode {
      width: 100%;
      height: 100%;
    }
  }

  &-Iframe {
    position: relative;
    display: block;
    flex-grow: 1;
    height: 100%;
    border: none;
    border-radius: var(--border-radius-12);
  }

  &-ControlGroup {
    margin-left: 10px;
  }

  &-Action {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background: #1b2138;
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 8px;
    }

    &--fullScreenMode {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  &-Title {
    margin: 0 16px 10px;
  }

  &-Footer {
    width: 100%;
    margin-bottom: 15px;
  }

  &-FooterContent {
    display: flex;
    justify-content: space-between;
  }

  &-PlayReal {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
    cursor: pointer;
  }
}
</style>
