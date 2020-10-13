<template>
  <fragment>
    <MainNav />
    <Hero />
    <BestGames />
    <Jackpots />
<!--    <Banner v-bind="banner1" />-->
    <Tournament />
    <Winners />
<!--    <Promotions />-->
<!--    <Questions />-->
<!--    <Banner class="Banner&#45;&#45;bottom" v-bind="banner2" />-->
    <Footer />
  </fragment>
</template>

<script>
import Hero from '@/components/Hero.vue';
import BestGames from '@/components/BestGames.vue';
import Jackpots from '@/components/Jackpots.vue';
import Tournament from '@/components/Tournament.vue';
import Winners from '@/components/Winners.vue';
import MainNav from '@/components/MainNav.vue';
import Footer from '@/components/Footer.vue';
// import Promotions from '@/components/Promotions.vue';
// import Questions from '@/components/Questions.vue';
// import Banner from '@/components/Banner.vue';

export default {
  name: 'HomePage',
  components: {
    MainNav,
    Hero,
    BestGames,
    Jackpots,
    Tournament,
    Winners,
    Footer,
    // Promotions,
    // Questions,
    // Banner,
  },
};
</script>
