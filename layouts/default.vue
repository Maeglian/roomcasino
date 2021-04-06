<template>
  <div>
    <InitialLoader v-if="!initialLoading" />
    <Nuxt />
    <client-only>
      <CashierForm />
    </client-only>
  </div>
</template>

<script>
import CashierForm from '@/components/CashierForm';
import { mapGetters } from 'vuex';
import InitialLoader from '@/components/InitialLoader';
import liveChat from '~/mixins/liveChat';

export default {
  name: 'Page',
  components: {
    CashierForm,
    InitialLoader,
  },
  mixins: [liveChat],
  computed: {
    ...mapGetters(['initialLoading']),
  },
};
</script>

<style>
:root {
  --color-main1: #f3b233;
  --color-main2: #eb1c2a;
  --color-badge: #0734a5;
  --color-text-main: #fff;
  --color-text-faded: #aeb3c7;
  --color-text-ghost: #52586f;
  --color-text-ghost-lighter: #6e7382;
  --color-text-ghost-darker: #737681;
  --color-breadcrumbs: #404454;
  --color-overlay: rgba(0, 0, 0, 0.6);
  --color-border: rgba(88, 92, 131, 0.3);
  --color-border2: #979797;
  --color-hover: #c40916;
  --color-accept: #67b12d;
  --color-discard: #cc1f1f;
  --color-error: #eb1c2a;
  --color-border-ghost: rgba(110, 115, 130, 0.5);
  --color-faded: rgba(255, 255, 255, 0.5);
  --color-more-faded: rgba(255, 255, 255, 0.4);
  --color-most-faded: rgba(255, 255, 255, 0.2);
  --color-bg: #0e152f;
  --color-bg-lighter: #1b2138;
  --color-bg-darker: rgba(39, 43, 95, 0.5);
  --color-bg-nav: #151841;
  --color-form: #1e1a46;
  --color-body: #060e2b;
}
</style>
