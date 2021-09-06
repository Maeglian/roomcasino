<template>
  <div>
    <InitialLoader v-if="!initialLoading" />
    <Nuxt />
    <client-only>
      <CashierForm />
    </client-only>
    <BannerPopup name-for-cookies="seenCookiesPopup" :expire-time="1500">
      <CookiesPopup />
    </BannerPopup>
    <BannerPopup name-for-cookies="teslaPopup" :expire-time="4">
      <TeslaPopup />
    </BannerPopup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InitialLoader from '@/components/InitialLoader';
import CookiesPopup from '@/components/popups/CookiesPopup';
import CashierForm from '@/components/CashierForm';
import TeslaPopup from '@/components/popups/TeslaPopup';
import BannerPopup from '@/components/popups/BannerPopup';
import liveChat from '~/mixins/liveChat';

export default {
  name: 'Page',
  components: {
    CashierForm,
    InitialLoader,
    CookiesPopup,
    TeslaPopup,
    BannerPopup,
  },
  mixins: [liveChat],
  computed: {
    ...mapGetters(['initialLoading']),
  },
};
</script>
