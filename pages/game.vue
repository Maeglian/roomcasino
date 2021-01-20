<template>
  <div class="GamePage">
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

export default {
  mixins: [showAuthDialog],
  beforeRouteLeave(to, from, next) {
    if (this.isLoggedIn) this.getProfile();
    next();
  },
  data: () => ({
    clockIcon: require('@/assets/img/clock.svg'),
    isFullScreen: false,
    storageGameUrl: '',
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
  mounted() {
    this.storageGameUrl = localStorage.getItem('gameUrlForIframe');
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
  display: flex;
  flex-direction: column;

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
