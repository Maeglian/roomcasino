<template>
  <div>
    <InitialLoader
      v-if="
        $route.name === 'index-games-gameCategory'
          ? !heroBannerIsLoaded || !initialLoading
          : !initialLoading
      "
    />
    <div v-if="showOverlay" class="Overlay"></div>
    <NotificationAlerts />
    <MainNav :key="$i18n.locale" />
    <Nuxt />
    <Breadcrumbs v-if="$route.path !== '/'" />
    <Footer />
    <MobileNav />
    <NotificationsPanel />
    <client-only>
      <CashierForm />
    </client-only>
    <BannerPopup name-for-cookies="seenCookiesPopup" :expire-time="1500">
      <CookiesPopup />
    </BannerPopup>
    <!--    <BannerPopup name-for-cookies="teslaPopup" :expire-time="4">-->
    <!--      <TeslaPopup />-->
    <!--    </BannerPopup>-->
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import NotificationAlerts from '@/components/NotificationAlerts';
import MainNav from '@/components/homepage/MainNav';
import MobileNav from '@/components/homepage/MobileNav';
import NotificationsPanel from '@/components/NotificationsPanel';
import Footer from '@/components/homepage/Footer';
import InitialLoader from '@/components/InitialLoader';
import CookiesPopup from '@/components/popups/CookiesPopup';
import CashierForm from '@/components/CashierForm';
import Breadcrumbs from '@/components/Breadcrumbs';
// import TeslaPopup from '@/components/popups/TeslaPopup';
import BannerPopup from '@/components/popups/BannerPopup';
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
    CookiesPopup,
    // TeslaPopup,
    BannerPopup,
    Breadcrumbs,
  },
  mixins: [liveChat],
  computed: {
    ...mapState(['heroBannerIsLoaded', 'showOverlay']),
    ...mapGetters(['initialLoading']),
  },
};
</script>
