<template>
  <div class="HomePage">
    <Hero />
    <BestGames />
    <!--    <Jackpots />-->
    <!--    <Tournament />-->
    <!--    <Winners />-->
    <!--    <MainBanner class="HomePage-Banner" v-bind="banner1" />-->
  </div>
</template>

<script>
import Hero from '@/components/homepage/Hero.vue';
import BestGames from '@/components/homepage/BestGames.vue';
// import Jackpots from '@/components/homepage/Jackpots.vue';
// import Tournament from '@/components/homepage/Tournament.vue';
// import Winners from '@/components/homepage/Winners.vue';
// import MainBanner from '@/components/MainBanner.vue';
// import Promotions from '@/components/Promotions.vue';
// import Questions from '@/components/Questions.vue';
// import Banner from '@/components/Banner.vue';

export default {
  name: 'HomePage',
  components: {
    Hero,
    BestGames,
    // Jackpots,
    // Tournament,
    // Winners,
    // MainBanner,
    // Promotions,
    // Questions,
    // Banner,
  },
  layout: 'page',
  middleware: [
    function({ route, redirect }) {
      if (route.path === '/') redirect(this.localePath('/games/top'));
    },
  ],
  data() {
    return {
      banner1: {
        image: 'banner1_1920.png',
        image460: 'banner1_460.png',
        image590: 'banner1_460.png',
        image768: 'banner1_768.png',
        image960: 'banner1_960.png',
        image1248: 'banner1_1248.png',
        title: 'Play <span class="Colored">VIP style</span><br/> Ninecasino',
        text: 'Your VIP level increases with every bet made at Ninecasino. The prizes are waiting!',
        btnLink: {
          text: 'More info',
          url: '/vip',
        },
      },
    };
  },
  head() {
    return {
      title: 'Casino Online🤑, Only Top Slots & Games | Get Welcome Bonus from Ninecasino',
      meta: [
        {
          description:
            'Sign up to 🔥Ninecasino to reveal our complete game selection. Enjoy all types of games! Claim your desirable bonuses and free spins at once after joining',
        },
      ],
    };
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
