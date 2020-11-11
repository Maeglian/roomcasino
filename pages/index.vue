<template>
  <div>
    <Hero />
    <BestGames />
    <Jackpots />
    <Tournament />
    <Winners />
  </div>
</template>

<script>
import Hero from '@/components/homepage/Hero.vue';
import BestGames from '@/components/homepage/BestGames.vue';
import Jackpots from '@/components/homepage/Jackpots.vue';
import Tournament from '@/components/homepage/Tournament.vue';
import Winners from '@/components/homepage/Winners.vue';
import Footer from '@/components/homepage/Footer.vue';
// import Promotions from '@/components/Promotions.vue';
// import Questions from '@/components/Questions.vue';
// import Banner from '@/components/Banner.vue';

export default {
  name: 'HomePage',
  layout: 'page',
  components: {
    Hero,
    BestGames,
    Jackpots,
    Tournament,
    Winners,
    // Promotions,
    // Questions,
    // Banner,
  },
};
</script>
