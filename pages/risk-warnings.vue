<template>
  <section class="SupportPage SupportPage--paddings">
    <h1 class="SupportPage-Title Title Title--type-h1">
      {{ $t('supportPages.riskWarnings.title') }}
    </h1>

    <p class="Text">
      {{ $t('supportPages.riskWarnings.text') }}
    </p>
  </section>
</template>

<script>
export default {
  name: 'RiskWarnings',
  layout: 'page',
  head() {
    return {
      title: this.$t('metaTags.risk-warnings.title'),
      meta: [
        {
          description: this.$t('metaTags.risk-warnings.description'),
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss"></style>
