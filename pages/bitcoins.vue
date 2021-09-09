<template>
  <section class="SupportPage BitcoinsPage">
    <h1 class="Title Title--type-h1 Title--center BitcoinsPage-Title">
      {{ $t('supportPages.bitcoinsPage.title') }}
    </h1>
    <div class="SupportPage-Introduction">
      {{ $t('supportPages.bitcoinsPage.text') }}
    </div>
    <div class="BitcoinsPage-Reasons">
      <div class="SupportPage-Card BitcoinsPage-Reason">
        <img class="BitcoinsPage-ReasonIcon" src="@/assets/img/bitcoin1.png" />
        <div class="BitcoinsPage-ReasonContent">
          <div class="BitcoinsPage-ReasonTitle SupportPage-CardTitle">
            {{ $t('supportPages.bitcoinsPage.reason1.title') }}
          </div>
          <div class="SupportPage-CardText">
            {{ $t('supportPages.bitcoinsPage.reason1.text') }}
          </div>
        </div>
      </div>
      <div class="SupportPage-Card BitcoinsPage-Reason">
        <img class="BitcoinsPage-ReasonIcon" src="@/assets/img/bitcoin2.png" />
        <div class="BitcoinsPage-ReasonContent">
          <div class="BitcoinsPage-ReasonTitle SupportPage-CardTitle">
            {{ $t('supportPages.bitcoinsPage.reason2.title') }}
          </div>
          <div class="SupportPage-CardText">
            {{ $t('supportPages.bitcoinsPage.reason2.text') }}
          </div>
        </div>
      </div>
      <div class="SupportPage-Card BitcoinsPage-Reason">
        <img class="BitcoinsPage-ReasonIcon" src="@/assets/img/bitcoin3.png" />
        <div class="BitcoinsPage-ReasonContent">
          <div class="BitcoinsPage-ReasonTitle SupportPage-CardTitle">
            {{ $t('supportPages.bitcoinsPage.reason3.title') }}
          </div>
          <div class="SupportPage-CardText">
            {{ $t('supportPages.bitcoinsPage.reason3.text') }}
          </div>
        </div>
      </div>
      <div class="SupportPage-Card BitcoinsPage-Reason">
        <img class="BitcoinsPage-ReasonIcon" src="@/assets/img/bitcoin4.png" />
        <div class="BitcoinsPage-ReasonContent">
          <div class="BitcoinsPage-ReasonTitle SupportPage-CardTitle">
            {{ $t('supportPages.bitcoinsPage.reason4.title') }}
          </div>
          <div class="SupportPage-CardText">
            {{ $t('supportPages.bitcoinsPage.reason4.text') }}
          </div>
        </div>
      </div>
      <div class="SupportPage-Card BitcoinsPage-Reason">
        <img class="BitcoinsPage-ReasonIcon" src="@/assets/img/bitcoin5.png" />
        <div class="BitcoinsPage-ReasonContent">
          <div class="BitcoinsPage-ReasonTitle SupportPage-CardTitle">
            {{ $t('supportPages.bitcoinsPage.reason5.title') }}
          </div>
          <div class="SupportPage-CardText">
            {{ $t('supportPages.bitcoinsPage.reason5.text') }}
          </div>
        </div>
      </div>
    </div>
    <h2 class="Title Title--type-h2 Title--center BitcoinsPage-Title">
      {{ $t('supportPages.bitcoinsPage.offers.title') }}
    </h2>
    <div class="BitcoinsPage-Steps SupportPage-Offers">
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/step1.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          {{ $t('supportPages.bitcoinsPage.offers.offer1.title') }}
        </div>
        <div
          class="SupportPage-CardText"
          v-html="$t('supportPages.bitcoinsPage.offers.offer1.text')"
        ></div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/step2.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          {{ $t('supportPages.bitcoinsPage.offers.offer2.title') }}
        </div>
        <div
          class="SupportPage-CardText"
          v-html="$t('supportPages.bitcoinsPage.offers.offer2.text')"
        ></div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/step3.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          {{ $t('supportPages.bitcoinsPage.offers.offer3.title') }}
        </div>
        <div
          class="SupportPage-CardText"
          v-html="$t('supportPages.bitcoinsPage.offers.offer3.text')"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BitcoinsPage',
  layout: 'page',
  head() {
    return {
      title: this.$t('metaTags.bitcoins.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('metaTags.bitcoins.description'),
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.BitcoinsPage {
  &-Reasons {
    margin-top: 21px;
    margin-bottom: 36px;

    @media (min-width: $screen-m) {
      margin-top: 27px;
      margin-bottom: 60px;
    }

    @media (min-width: $screen-l) {
      margin-top: 36px;
    }
  }

  &-Reason {
    padding: 26px;
    text-align: center;

    @media (min-width: $screen-m) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 19px;
      text-align: left;
    }

    @media (min-width: $screen-m) {
      padding: 34px;
    }

    @media (min-width: $screen-l) {
      padding: 42px 44px;
    }

    @media (min-width: $screen-xl) {
      padding: 42px 84px;
    }
  }

  &-ReasonContent {
    @media (min-width: $screen-m) {
      order: 0;
      margin-right: 16px;
    }

    @media (min-width: $screen-l) {
      margin-right: 57px;
    }

    @media (min-width: $screen-xl) {
      margin-right: 95px;
    }
  }

  &-ReasonIcon {
    width: 250px;
    margin-bottom: 22px;

    @media (min-width: $screen-m) {
      flex-grow: 0;
      order: 1;
      width: 320px;
      margin-bottom: 0;
    }

    @media (min-width: $screen-l) {
      width: 430px;
    }
  }

  &-ReasonTitle {
    margin-bottom: 16px;

    @media (min-width: $screen-m) {
      margin-bottom: 24px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 26px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 30px;
    }
  }

  &-Steps {
    margin-top: 36px;

    @media (min-width: $screen-m) {
      margin-top: 60px;
    }

    @media (min-width: $screen-xl) {
      margin-top: 80px;
    }
  }
}
</style>
