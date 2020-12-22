<template>
  <div>
    <NotificationAlerts />
    <MainNav />
    <Nuxt />
    <Footer />
    <MobileNav />
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
