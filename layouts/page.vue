<template>
  <div>
    <MainNav />
    <Nuxt />
  </div>
</template>

<script>
import MainNav from '@/components/homepage/MainNav';

export default {
  name: 'Page',
  components: {
    MainNav,
  },
};
</script>
