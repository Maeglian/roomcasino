<template>
  <section class="SupportPage SupportPage--paddings">
    <h1 class="SupportPage-Title Title Title--type-h1">
      {{ $t('supportPages.bonusTermsPage.title1') }}
    </h1>
    <p
      v-for="(text, index) in $t('supportPages.bonusTermsPage.text1')"
      :key="index"
      class="Text"
      v-html="text"
    ></p>

    <h4 class="Title">{{ $t('supportPages.bonusTermsPage.title2') }}</h4>
    <p
      v-for="(text, index) in $t('supportPages.bonusTermsPage.text2')"
      :key="index"
      class="Text"
      v-html="text"
    ></p>

    <h4 class="Title">{{ $t('supportPages.bonusTermsPage.title3') }}</h4>
    <p
      v-for="(text, index) in $t('supportPages.bonusTermsPage.text3')"
      :key="index"
      class="Text"
      v-html="text"
    ></p>

    <h4 class="Title">{{ $t('supportPages.bonusTermsPage.title4') }}</h4>
    <p
      v-for="(text, index) in $t('supportPages.bonusTermsPage.text4')"
      :key="index"
      class="Text"
      v-html="text"
    ></p>
  </section>
</template>
<script>
export default {
  name: 'TermsPage',
  layout: 'page',
  head() {
    return {
      title: 'Requirements Set By The Ninecasino Portal For The Use Of Bonuses',
      meta: [
        {
          description:
            'This page details the rules under which players can use their bonuses. Acceptable terms of their validity, existing restrictions, and possible penalties',
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
