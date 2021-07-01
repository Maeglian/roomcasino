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
      title: 'Information About Bonuses – How To Receive And Withdraw Your Bonuses In Ninecasino',
      meta: [
        {
          description:
            'Detailed Information About Bonuses: How To Receive And Withdraw Bonuses In Ninecasino',
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
