<template>
  <div>
    <InitialLoader
      v-if="
        $route.name === 'index-games-gameCategory'
          ? !heroBannerIsLoaded || !initialLoading
          : !initialLoading
      "
    />
    <NotificationAlerts />
    <MainNav :key="$i18n.locale" />
    <Nuxt />
    <Footer />
    <MobileNav />
    <NotificationsPanel />
    <client-only>
      <CashierForm />
    </client-only>
  </div>
</template>

<script>
import NotificationAlerts from '@/components/NotificationAlerts';
import MainNav from '@/components/homepage/MainNav';
import MobileNav from '@/components/homepage/MobileNav';
import NotificationsPanel from '@/components/NotificationsPanel';
import CashierForm from '@/components/CashierForm';
import Footer from '@/components/homepage/Footer';
import { mapGetters, mapState } from 'vuex';
import InitialLoader from '@/components/InitialLoader';
import liveChat from '~/mixins/liveChat';

export default {
  name: 'MainMenuPage',
  components: {
    NotificationAlerts,
    MainNav,
    MobileNav,
    Footer,
    NotificationsPanel,
    CashierForm,
    InitialLoader,
  },
  mixins: [liveChat],
  computed: {
    ...mapState(['heroBannerIsLoaded']),
    ...mapGetters(['initialLoading']),
  },
};
</script>
