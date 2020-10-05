<template>
  <fragment>
    <Hero />
    <BestGames />
    <Jackpots />
<!--    <Banner v-bind="banner1" />-->
    <Tournament />
    <Winners />
<!--    <Promotions />-->
<!--    <Questions />-->
<!--    <Banner class="Banner&#45;&#45;bottom" v-bind="banner2" />-->
  </fragment>
</template>

<script>
import Hero from '@/components/Hero.vue';
import BestGames from '@/components/BestGames.vue';
import Jackpots from '@/components/Jackpots.vue';
import Tournament from '@/components/Tournament.vue';
import Winners from '@/components/Winners.vue';
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
    // Promotions,
    // Questions,
    // Banner,
  },
};
</script>
