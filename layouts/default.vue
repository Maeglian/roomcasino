<template>
  <div>
    <InitialLoader v-if="!initialLoading" />
    <Nuxt />
    <client-only>
      <CashierForm />
    </client-only>
    <CookiesPopup />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import InitialLoader from '@/components/InitialLoader';
import CookiesPopup from '@/components/homepage/CookiesPopup';
import CashierForm from '@/components/CashierForm';
import liveChat from '~/mixins/liveChat';

export default {
  name: 'Page',
  components: {
    CashierForm,
    InitialLoader,
    CookiesPopup,
  },
  mixins: [liveChat],
  computed: {
    ...mapGetters(['initialLoading']),
  },
};
</script>
