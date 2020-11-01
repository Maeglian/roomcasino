<template>
  <div>
    <Nuxt />
    <client-only>
      <CashierForm />
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import axios from 'axios';
const CashierForm = () => import('@/components/CashierForm.vue');

export default {
  name: 'App',
  components: {
    CashierForm,
  },
  mounted() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
    axios.interceptors.response.use(undefined, (err) => new Promise(function () {
      if (err.status === 401) {
        this.logout();
      }
      throw err;
    }));
    this.getCountriesList();
    this.getCurrencyList();
    if (this.isLoggedIn) {
      axios.defaults.headers.common['X-Auth-Token'] = this.token;
      this.getProfile();
    }
  },
  computed: {
    ...mapState(['token']),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapMutations(['setWidth']),
    ...mapActions(['getCountriesList', 'getCurrencyList', 'getProfile', 'logout']),
    updateWidth() {
      this.setWidth(window.innerWidth);
    },
  },
};
</script>

<style>
:root {
  --color-main1: #F3B233;
  --color-main2: #EB1C2A;
  --color-badge: #0734A5;
  --color-text-main: #fff;
  --color-text-ghost: #52586F;
  --color-breadcrumbs: #404454;
  --color-overlay: rgba(7, 52, 165, 0.8);
  --color-border: rgba(88, 92, 131, 0.3);
  --color-hover: #C40916;
  --color-accept: #67B12D;
  --color-discard: #CC1F1F;
  --color-error: #EB1C2A;
  --color-border-ghost: rgba(110, 115, 130, 0.5);
  --color-faded: rgba(255, 255, 255, 0.5);
  --color-more-faded: rgba(255, 255, 255, 0.4);
  --color-most-faded: rgba(255, 255, 255, 0.2);
  --color-bg: #0E152F;
  --color-bg-lighter: #1B2138;
  --color-bg-darker: rgba(39, 43, 95, 0.5);
  --color-bg-nav: #151841;
  --color-form: #1E1A46;
  --color-body: #060E2B;
}
</style>
