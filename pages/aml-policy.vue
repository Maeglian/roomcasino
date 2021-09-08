<template>
  <section class="SupportPage SupportPage--paddings">
    <h1 class="SupportPage-Title Title Title--type-h1">
      {{ $t('supportPages.amlPolicyPage.title') }}
    </h1>
    <h2 class="Title Title--type-h2">{{ $t('supportPages.amlPolicyPage.subTitle') }}</h2>
    <h4 class="Title">{{ $t('supportPages.amlPolicyPage.section1.title') }}</h4>
    <p
      v-for="(text, index) in $t('supportPages.amlPolicyPage.section1.text')"
      :key="index"
      class="Text"
      v-html="text"
    ></p>

    <h4 class="Title">{{ $t('supportPages.amlPolicyPage.section2.title') }}</h4>
    <p
      v-for="(text, index) in $t('supportPages.amlPolicyPage.section2.text1')"
      :key="index"
      class="Text"
      v-html="text"
    ></p>
    <ul class="SupportPage-List AmlPolicyPage-List">
      <li
        v-for="(list, index) in $t('supportPages.amlPolicyPage.section2.list')"
        :key="index"
        class="SupportPage-Item AmlPolicyPage-Item"
        v-html="list"
      ></li>
    </ul>
    <p
      v-for="(text, index) in $t('supportPages.amlPolicyPage.section2.text2')"
      :key="index"
      class="Text"
      v-html="text"
    ></p>

    <h4 class="Title">{{ $t('supportPages.amlPolicyPage.section3.title') }}</h4>
    <p
      v-for="(text, index) in $t('supportPages.amlPolicyPage.section3.text1')"
      :key="index"
      class="Text"
      v-html="text"
    ></p>
    <ul class="SupportPage-List">
      <li
        v-for="(list, index) in $t('supportPages.amlPolicyPage.section3.list')"
        :key="index"
        class="SupportPage-Item AmlPolicyPage-Item"
        v-html="list"
      ></li>
    </ul>
    <p
      v-for="(text, index) in $t('supportPages.amlPolicyPage.section3.text2')"
      :key="index"
      class="Text"
      v-html="text"
    ></p>

    <h4 class="Title">{{ $t('supportPages.amlPolicyPage.section4.title') }}</h4>
    <p
      v-for="(text, index) in $t('supportPages.amlPolicyPage.section4.text')"
      :key="index"
      class="Text"
      v-html="text"
    ></p>
  </section>
</template>

<script>
export default {
  name: 'AmlPolicy',
  layout: 'page',
  head() {
    return {
      title: this.$t('metaTags.aml-policy.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('metaTags.aml-policy.description'),
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.SupportPage-List {
  margin-left: 10px;
  padding-left: 19px;

  .SupportPage-Item {
    margin-bottom: 15px;
    list-style-type: disc;
    color: var(--color-text-faded);

    &:before {
      display: none;
    }
  }
}
</style>
