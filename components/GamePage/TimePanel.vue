<template>
  <div class="TimePanel">
    <p class="TimePanel-Title">{{ $t('pages.responsibleGaming') }}</p>
    <img :src="clockIcon" class="TimePanel-Image" />
    <p class="TimePanel-Time">{{ getCurrentTime }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    clockIcon: require('@/assets/img/clock.svg'),
    hours: 0,
    minutes: 0,
    seconds: 0,
    timer: null,
    gameUrl: '',
  }),
  computed: {
    getCurrentTime() {
      const hours = String(this.hours).length < 2 ? `0${this.hours}` : this.hours;
      const minutes = String(this.minutes).length < 2 ? `0${this.minutes}` : this.minutes;
      const seconds = String(this.seconds).length < 2 ? `0${this.seconds}` : this.seconds;

      return `${hours} : ${minutes} : ${seconds}`;
    },
  },
  mounted() {
    this.timer = window.setInterval(this.updateDateTime, 1000);
  },
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
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
.TimePanel {
  display: flex;
  align-items: center;
  padding: 0 16px;

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
}
</style>
