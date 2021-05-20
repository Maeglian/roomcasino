<template>
  <section class="SupportPage SupportPage--paddings">
    <h1 class="SupportPage-Title Title Title--type-h1">
      {{ $t('supportPages.privacyPolicyPage.title') }}
    </h1>
    <ul class="SupportPage-List">
      <li class="SupportPage-Item">
        <h4 class="Title">{{ $t('supportPages.privacyPolicyPage.introduction.title') }}</h4>
        <p
          v-for="(info, index) in $t('supportPages.privacyPolicyPage.introduction.text')"
          :key="index"
          class="Text"
          v-html="info"
        ></p>
      </li>
      <li class="SupportPage-Item">
        <h4 class="Title">{{ $t('supportPages.privacyPolicyPage.policyPromise.title') }}</h4>
        <p
          v-for="(info, index) in $t('supportPages.privacyPolicyPage.policyPromise.text')"
          :key="index"
          class="Text"
          v-html="info"
        ></p>
      </li>
      <li class="SupportPage-Item">
        <h4 class="Title">{{ $t('supportPages.privacyPolicyPage.useYourInformation.title') }}</h4>
        <p class="Text">
          {{ $t('supportPages.privacyPolicyPage.useYourInformation.text') }}
        </p>
        <ul class="SupportPage-InnerList" type="a">
          <li class="SupportPage-InnerItem">
            <p class="Text">
              {{ $t('supportPages.privacyPolicyPage.useYourInformation.list.p1') }}
            </p>
          </li>
          <li class="SupportPage-InnerItem">
            <p class="Text">
              {{ $t('supportPages.privacyPolicyPage.useYourInformation.list.p2') }}
            </p>
          </li>
          <li class="SupportPage-InnerItem">
            <p class="Text">
              {{ $t('supportPages.privacyPolicyPage.useYourInformation.list.p3') }}
            </p>
          </li>
          <li class="SupportPage-InnerItem">
            <p class="Text">
              {{ $t('supportPages.privacyPolicyPage.useYourInformation.list.p4') }}
            </p>
          </li>
        </ul>
      </li>
      <li class="SupportPage-Item">
        <h4 class="Title">{{ $t('supportPages.privacyPolicyPage.personalInformation.title') }}</h4>
        <p
          v-for="(info, index) in $t('supportPages.privacyPolicyPage.personalInformation.text')"
          :key="index"
          class="Text"
          v-html="info"
        ></p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'PrivacyPolicyPage',
  layout: 'page',
  head() {
    return {
      title: 'Confidentiality Of The Personal Information Of Our Users',
      meta: [
        {
          description:
            'Respect for the privacy policy is the main aspect of the Ninecasino. We provide the reliable protection from the third parties. Collecting of the personal data needs permission',
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
