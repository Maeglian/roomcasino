<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  created() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
  },
  methods: {
    ...mapMutations(['setWidth']),
    updateWidth() {
      this.setWidth(window.innerWidth);
    },
  },
};
</script>

<style lang="scss">
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
  --color-faded: rgba(255, 255, 255, 0.5);
  --color-more-faded: rgba(255, 255, 255, 0.4);
  --color-most-faded: rgba(255, 255, 255, 0.2);
  --color-border-ghost: rgba(58, 63, 85, 0.3);
  --color-bg: #0E152F;
  --color-bg-lighter: #1B2138;
  --color-bg-darker: rgba(39, 43, 95, 0.5);
  --color-bg-nav: #151841;
  --color-form: #1E1A46;
  --color-body: #060E2B;
}
</style>
