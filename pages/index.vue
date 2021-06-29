<template>
  <div class="HomePage">
    <Hero :key="`hero_{$route.path}`" />
    <BestGames :key="$route.path" />
    <!--    <Jackpots />-->
    <!--    <Tournament />-->
    <Winners />
    <!--    <MainBanner class="HomePage-Banner" v-bind="banner1" />-->
  </div>
</template>

<script>
import Hero from '@/components/homepage/Hero.vue';
import BestGames from '@/components/homepage/BestGames.vue';
// import Jackpots from '@/components/homepage/Jackpots.vue';
// import Tournament from '@/components/homepage/Tournament.vue';
import Winners from '@/components/homepage/Winners.vue';
// import MainBanner from '@/components/MainBanner.vue';
// import Promotions from '@/components/Promotions.vue';
// import Questions from '@/components/Questions.vue';
// import Banner from '@/components/Banner.vue';
import showAuthDialog from '@/mixins/showAuthDialog';
import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    Hero,
    BestGames,
    Winners,
    // Jackpots,
    // Tournament,
    // MainBanner,
    // Promotions,
    // Questions,
    // Banner,
  },
  mixins: [showAuthDialog],
  layout: 'page',
  middleware: [
    function ({ redirect, route, app }) {
      if (app.getRouteBaseName() === 'index')
        redirect({ path: app.localePath('/games/top'), query: route.query });
    },
  ],
  head() {
    if (this.$route.params.gameCategory === 'top') {
      return {
        title: `ᐈ ${
          this.$route.params.gameCategory.charAt(0).toUpperCase() +
          this.$route.params.gameCategory.slice(1)
        } Games From Nineсasino - Play Now For FREE Or Real Money | $450 Welcome Bonus`,
        meta: [
          {
            description: `★ Play ${
              this.$route.params.gameCategory.charAt(0).toUpperCase() +
              this.$route.params.gameCategory.slice(1)
            } Games For Free Or Real Money At Online Casino ✓ Fast withdrawal ✓ Fully licensed Ninecasino`,
          },
        ],
      };
    }
  },
  computed: {
    ...mapState(['registrationWindowWasOpened', 'siteIsAllowedForUser']),
  },
  watch: {
    registrationWindowWasOpened() {
      if (this.registrationWindowWasOpened) clearTimeout(this.timer);
    },
  },
  mounted() {
    if (this.siteIsAllowedForUser) {
      const timeout = this.$route.query.open === 'registration' ? 1000 : 20000;
      this.timer = setTimeout(() => {
        if (!this.isLoggedIn) this.showRegistrationDialog('registration');
      }, timeout);
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
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
