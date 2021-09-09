<template>
  <div class="ControlsPanel">
    <div v-if="!isFullScreen" class="ControlsPanel-Block">
      <p class="ControlsPanel-Title">{{ $t('pages.responsibleGaming') }}</p>
      <img :src="clockIcon" class="ControlsPanel-Image" />
      <p class="ControlsPanel-Time">{{ getCurrentTime }}</p>
    </div>

    <div class="ControlsPanel-Group">
      <div
        class="ControlsPanel-Action"
        :class="{ 'ControlsPanel-Action--FullScreenMode': isFullScreen }"
        @click="$emit('toggle-fullscreen-mode')"
      >
        <img :src="getZoomIcon" />
      </div>

      <NuxtLink v-if="!isFullScreen" :to="localePath('/')" class="ControlsPanel-Action">
        <img :src="closeIcon" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    isFullScreen: Boolean,
  },
  data: () => ({
    clockIcon: require('@/assets/img/clock.svg'),
    closeIcon: require('@/assets/img/ic_close.svg'),
    zoomInIcon: require('@/assets/img/zoomIn.svg'),
    zoomOutIcon: require('@/assets/img/zoomOut.svg'),
    hours: 0,
    minutes: 0,
    seconds: 0,
    timer: null,
    gameUrl: '',
  }),
  computed: {
    ...mapGetters(['isLoggedIn']),
    getCurrentTime() {
      const hours = String(this.hours).length < 2 ? `0${this.hours}` : this.hours;
      const minutes = String(this.minutes).length < 2 ? `0${this.minutes}` : this.minutes;
      const seconds = String(this.seconds).length < 2 ? `0${this.seconds}` : this.seconds;

      return `${hours} : ${minutes} : ${seconds}`;
    },
    getZoomIcon() {
      return this.isFullScreen ? this.zoomOutIcon : this.zoomInIcon;
    },
  },
  mounted() {
    this.timer = window.setInterval(this.updateDateTime, 1000);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    ...mapActions(['getProfile']),
    updateDateTime() {
      const today = new Date();

      this.hours = today.getHours();
      this.minutes = today.getMinutes();
      this.seconds = today.getSeconds();
    },
  },
};
</script>

<style lang="scss">
.ControlsPanel {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;

  &-Block {
    display: flex;
    align-items: center;
  }

  &-Title {
    margin: 0 14px 0 0;
    color: #fff;

    @media (max-width: $screen-xs) {
      display: none;
    }
  }

  &-Time {
    margin: 0 0 0 9px;
    color: #fff;
  }

  &-Group {
    display: flex;
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
      margin-right: 5px;
    }

    &--FullScreenMode {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  &-Close {
  }
}
</style>
