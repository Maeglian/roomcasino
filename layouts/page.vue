<template>
  <div>
    <InitialLoader
      v-if="$route.path === '/' ? !heroBannerIsLoaded || !initialLoading : !initialLoading"
    />
    <NotificationAlerts />
    <MainNav />
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
  computed: {
    ...mapState(['heroBannerIsLoaded']),
    ...mapGetters(['initialLoading']),
  },
};
</script>
