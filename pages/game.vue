<template>
  <div class="GamePage">
    <div class="GamePage-Bg" :style="{ backgroundImage: `url(${bg})` }"></div>
    <div class="GamePage-Wrapper" :class="{ 'GamePage-Wrapper--Hide': isFullScreen }">
      <MainNav v-if="!isFullScreen" />
      <iframe
        :key="activeAccount.balance"
        class="GamePage-Iframe"
        :src="getGameUrl"
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
import MainNav from '@/components/homepage/MainNav';
import ControlsPanel from '@/components/GamePage/ControlsPanel';

export default {
  components: {
    MainNav,
    ControlsPanel,
  },
  mixins: [showAuthDialog],
  beforeRouteLeave(to, from, next) {
    if (this.isLoggedIn) this.getProfile();
    next();
  },
  data: () => ({
    clockIcon: require('@/assets/img/clock.svg'),
    isFullScreen: false,
    storageGameUrl: '',
    bg: '',
  }),
  computed: {
    ...mapState(['gameUrlForIframe']),
    ...mapGetters(['activeAccount']),
    getGameUrl() {
      return this.gameUrlForIframe || this.storageGameUrl;
    },
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
  },
  mounted() {
    this.storageGameUrl = localStorage.getItem('gameUrlForIframe');
    this.bg = localStorage.getItem('gameBg');
  },
  methods: {
    ...mapActions(['startGame', 'getProfile']),
    toggleFullScreenMode() {
      this.isFullScreen = !this.isFullScreen;
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

  &-Iframe {
    position: relative;
    display: block;
    margin: 0 auto;
    border: none;
    border-radius: 12px;
  }
}
</style>
