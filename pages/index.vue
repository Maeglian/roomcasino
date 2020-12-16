<template>
  <div class="HomePage">
    <Hero />
    <BestGames />
    <Jackpots />
    <Tournament />
    <Winners />
    <MainBanner class="HomePage-Banner" v-bind="banner1" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Hero from '@/components/homepage/Hero.vue';
import BestGames from '@/components/homepage/BestGames.vue';
import Jackpots from '@/components/homepage/Jackpots.vue';
import Tournament from '@/components/homepage/Tournament.vue';
import Winners from '@/components/homepage/Winners.vue';
import MainBanner from '@/components/MainBanner.vue';
// import Promotions from '@/components/Promotions.vue';
// import Questions from '@/components/Questions.vue';
// import Banner from '@/components/Banner.vue';

export default {
  name: 'HomePage',
  components: {
    Hero,
    BestGames,
    Jackpots,
    Tournament,
    Winners,
    MainBanner,
    // Promotions,
    // Questions,
    // Banner,
  },
  layout: 'page',
  data() {
    return {
      banner1: {
        image: 'banner1_1920.png',
        image460: 'banner1_460.png',
        image590: 'banner1_460.png',
        image768: 'banner1_768.png',
        image960: 'banner1_960.png',
        image1248: 'banner1_1248.png',
        title: 'Play <span class="Colored">VIP style</span><br/> Roomcasino',
        text: 'Your VIP level increases with every bet made at Roomcasino. The prizes are waiting!',
        btnLink: {
          text: 'More info',
          url: '/vip',
        },
      },
    };
  },
  computed: {
    ...mapState(['gameUrlForIframe']),
    hasGameUrl() {
      return this.gameUrlForIframe.length > 0;
    },
  },
};
</script>

<style lang="scss">
.HomePage {
  &-Banner {
    margin-bottom: 20px;

    @media (min-width: $screen-m) {
      margin-bottom: 60px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 100px;
    }
  }
}
</style>
