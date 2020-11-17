<template>
  <div>
    <MainNav />
    <Nuxt />
    <Footer />
    <NotificationsPanel />
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
