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
import { mapState } from 'vuex';
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
import gtagEvents from '@/mixins/gtagEvents';

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
  mixins: [showAuthDialog, gtagEvents],
  layout: 'page',
  head() {
    return {
      title: 'ᐈ Casino Online and Mobile | Get Welcome Bonus $450 from Ninecasino!',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '★ Play Your Favorite Games For Free Or Real Money At Online Casino ✓ Fast withdrawal ✓ Fully licensed Ninecasino',
        },
      ],
    };
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
        if (!this.isLoggedIn) {
          this.showRegistrationDialog('registration');
          this.gtagSendEvent('registration_form_shown', { source: 'auto' });
        }
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
