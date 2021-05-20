<template>
  <section class="SupportPage SupportPage--paddings">
    <h1 class="SupportPage-Title Title Title--type-h1">{{ $t('supportPages.termsPage.title') }}</h1>
    <p class="Text">
      {{ $t('supportPages.termsPage.p1') }}
    </p>
    <p class="Text">
      {{ $t('supportPages.termsPage.p2') }}
    </p>

    <h4 class="Title">{{ $t('supportPages.termsPage.general.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.general.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.availabilityOfGames.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.availabilityOfGames.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.acceptedCurrencies.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.acceptedCurrencies.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.whoCanPlay.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.whoCanPlay.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.useOfPlayerAccount.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.useOfPlayerAccount.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.depositing.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.depositing.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.withdrawalPolicy.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.withdrawalPolicy.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.responsibleGaming.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.responsibleGaming.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.dormantAccounts.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.dormantAccounts.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.disclaimerOfLiabilities.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.disclaimerOfLiabilities.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.antiFraudPolicy.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.antiFraudPolicy.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.refundPolicy.title') }}</h4>
    <ul class="SupportPage-List">
      <li class="SupportPage-Item">
        <p class="Text">
          <i18n path="supportPages.termsPage.refundPolicy.text.p1">
            <template #email>
              <a class="Link" href="mailto:support@ninecasino.com">support@ninecasino.com</a>
            </template>
          </i18n>
        </p>
      </li>
      <li class="SupportPage-Item">
        <p class="Text" v-html="$t('supportPages.termsPage.refundPolicy.text.p2')"></p>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">{{ $t('supportPages.termsPage.refundPolicy.text.p3') }}</p>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">{{ $t('supportPages.termsPage.refundPolicy.text.p4') }}</p>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">{{ $t('supportPages.termsPage.refundPolicy.text.p5') }}</p>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">{{ $t('supportPages.termsPage.refundPolicy.text.p6') }}</p>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">{{ $t('supportPages.termsPage.refundPolicy.text.p7') }}</p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.complaints.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.complaints.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.penaltiesAndTermination.title') }}</h4>
    <ul class="SupportPage-List">
      <li
        v-for="(info, index) in $t('supportPages.termsPage.penaltiesAndTermination.text')"
        :key="index"
        class="SupportPage-Item"
      >
        <p class="Text" v-html="info"></p>
      </li>
    </ul>

    <h4 class="Title">{{ $t('supportPages.termsPage.netEnt.title') }}</h4>
    <ul class="SupportPage-List">
      <li class="SupportPage-Item">
        <p class="Text">{{ $t('supportPages.termsPage.netEnt.restriction.title') }}</p>
        <p class="Text">{{ $t('supportPages.termsPage.netEnt.restriction.text') }}</p>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">{{ $t('supportPages.termsPage.netEnt.blacklistedTerritories.title') }}</p>
        <p class="Text">{{ $t('supportPages.termsPage.netEnt.blacklistedTerritories.text') }}</p>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">
          {{ $t('supportPages.termsPage.netEnt.blacklistedBrandedGamesTerritories.title') }}
        </p>
        <p class="Text">
          {{ $t('supportPages.termsPage.netEnt.blacklistedBrandedGamesTerritories.text') }}
        </p>
        <ul class="SupportPage-SubList">
          <li
            v-for="(text, index) in $t(
              'supportPages.termsPage.netEnt.blacklistedBrandedGamesTerritories.list',
            )"
            :key="index"
            class="SupportPage-SubItem"
          >
            <p class="Text" v-html="text"></p>
          </li>
        </ul>
      </li>
      <li class="SupportPage-Item">
        <p class="Text">{{ $t('supportPages.termsPage.netEnt.text') }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'TermsPage',
  layout: 'page',
  head() {
    return {
      title:
        'Let us tell you a secret you can play for free. You will take the winnings for yourself',
      meta: [
        {
          description:
            'It is easy to top up your account with us. Do you want a card, bitcoins, an electronic wallet. You will be delighted with the minimum deposit and the maximum winnings. Who does not take risks does not drink champagne',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.SupportPage-Title {
  margin-bottom: 4px;

  @media (min-width: $screen-xxs) {
    margin-bottom: 6px;
  }
}

.SupportPage-Item {
  padding-left: 19px;

  @media (min-width: $screen-xxs) {
    padding-left: 35px;
  }

  &:before {
    content: counter(list1, '.') '. ';
    top: 2.3px;
  }

  .Link {
    font-size: 14px;
    text-transform: lowercase;
  }
}
</style>
