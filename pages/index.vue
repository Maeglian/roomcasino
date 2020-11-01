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
import Hero from '@/components/homepage/Hero.vue';
import BestGames from '@/components/homepage/BestGames.vue';
import Jackpots from '@/components/homepage/Jackpots.vue';
import Tournament from '@/components/homepage/Tournament.vue';
import Winners from '@/components/homepage/Winners.vue';
import MainNav from '@/components/homepage/MainNav.vue';
import Footer from '@/components/homepage/Footer.vue';
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
