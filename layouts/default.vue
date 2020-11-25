<template>
  <div>
    <Nuxt />
    <client-only>
      <CashierForm />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'Page',
};
</script>

<style>
:root {
  --color-main1: #f3b233;
  --color-main2: #eb1c2a;
  --color-badge: #0734a5;
  --color-text-main: #fff;
  --color-text-ghost: #52586f;
  --color-breadcrumbs: #404454;
  --color-overlay: rgba(7, 52, 165, .8);
  --color-border: rgba(88, 92, 131, .3);
  --color-hover: #c40916;
  --color-accept: #67b12d;
  --color-discard: #cc1f1f;
  --color-error: #eb1c2a;
  --color-border-ghost: rgba(110, 115, 130, .5);
  --color-faded: rgba(255, 255, 255, .5);
  --color-more-faded: rgba(255, 255, 255, .4);
  --color-most-faded: rgba(255, 255, 255, .2);
  --color-bg: #0e152f;
  --color-bg-lighter: #1b2138;
  --color-bg-darker: rgba(39, 43, 95, .5);
  --color-bg-nav: #151841;
  --color-form: #1e1a46;
  --color-body: #060e2b;
}
</style>
