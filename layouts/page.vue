<template>
  <div>
    <MainNav />
    <Nuxt />
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
