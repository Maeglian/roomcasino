<template>
  <div>
    <MainNav />
    <Nuxt />
    <Footer />
    <client-only>
      <CashierForm />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'MainMenuPage',
};
</script>
