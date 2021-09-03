<template>
  <div v-if="game" class="GamePage">
    <GameModals />
    <div class="GamePage-Bg" :style="{ backgroundImage: `url(${game.backgroundUrl})` }"></div>
    <div class="GamePage-Wrapper" :class="{ 'GamePage-Wrapper--Hide': isFullScreen }">
      <MainNav v-if="!isFullScreen" />
      <h1 v-if="!isFullScreen" class="Title Title--type-h2 GamePage-Title">
        {{ game.gameName }}
      </h1>
      <iframe
        v-if="gameUrlForIframe"
        :key="activeAccount.balance"
        class="GamePage-Iframe"
        :src="gameUrlForIframe"
        :width="getIframeWidth.width"
        :height="getIframeWidth.height"
        allowFullScreen="true"
      />
      <ControlsPanel
        :is-full-screen="isFullScreen"
        @toggle-fullscreen-mode="toggleFullScreenMode"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';
import openGame from '@/mixins/openGame';
import MainNav from '@/components/homepage/MainNav';
import ControlsPanel from '@/components/GamePage/ControlsPanel';
import GameModals from '@/components/GameModals';

export default {
  name: 'GamePage',
  components: {
    MainNav,
    ControlsPanel,
    GameModals,
  },
  mixins: [showAuthDialog, openGame],
  beforeRouteLeave(to, from, next) {
    if (this.isLoggedIn) this.getProfile();
    next();
  },
  data: () => ({
    clockIcon: require('@/assets/img/clock.svg'),
    isFullScreen: false,
  }),
  head() {
    if (this.game) {
      return {
        title: `ᐈ Play ${this.game.gameName} Game Now For Free Or Real Money | $450 Welcome Bonus At Ninecasino`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `★ Play ${this.game.gameName} Game For Free Or Real Money At Online Casino ✓ Fast withdrawal ✓ Fully licensed Ninecasino`,
          },
        ],
      };
    }
  },
  computed: {
    ...mapState(['platform']),
    ...mapState('games', ['gameUrlForIframe', 'defaultGames']),
    ...mapGetters(['activeAccount']),
    getIframeWidth() {
      return this.isFullScreen
        ? {
            width: '100%',
            height: '100%',
          }
        : {
            width: '80%',
            height: '80%',
          };
    },
    gameId() {
      return this.$route.params.gameId;
    },
    game() {
      return this.defaultGames.find(g => g.gameId === this.gameId);
    },
  },
  watch: {
    isFullScreen() {
      const liveChat = document.getElementById('chat-widget-container');

      if (this.isFullScreen) {
        liveChat.style.display = 'none';
      } else {
        liveChat.style.display = '';
      }
    },
    defaultGames() {
      this.onEnterPage();
    },
  },
  mounted() {
    this.onEnterPage();
  },
  methods: {
    ...mapActions(['getProfile']),
    ...mapActions('games', ['startGame']),
    toggleFullScreenMode() {
      this.isFullScreen = !this.isFullScreen;
    },
    onEnterPage() {
      if (this.defaultGames.length) {
        if (!this.game) this.$router.push(this.localePath('/404'));
        else {
          this.openGamePage(
            { id: this.gameId, demo: !!this.$route.query.demo },
            this.game.gameProducer,
          );
        }
      }
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
    max-width: 1248px;
    height: 100vh;
    margin: 0 auto;

    &--Hide {
      width: 100%;
      max-width: 100%;
    }
  }

  &-Title {
    margin-bottom: auto;
  }

  &-Iframe {
    position: relative;
    display: block;
    margin: 20px auto;
    border: none;
    border-radius: 12px;
  }
}
</style>
