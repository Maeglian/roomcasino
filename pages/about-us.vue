<template>
  <section class="SupportPage AboutUsPage">
    <h1 class="Title Title--type-h1 Title--center AboutUsPage-Title">
      {{ $t('supportPages.aboutUsPage.title') }}
    </h1>
    <div class="SupportPage-Introduction">
      {{ $t('supportPages.aboutUsPage.text') }}
    </div>
    <div class="AboutUsPage-Advantages Advantages">
      <div class="Advantages-Advantage">
        <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
        <div class="Advantages-AdvantageText">
          {{ $t('supportPages.aboutUsPage.advantages.text1') }}
        </div>
      </div>
      <div class="Advantages-Advantage">
        <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
        <div class="Advantages-AdvantageText">
          {{ $t('supportPages.aboutUsPage.advantages.text2') }}
        </div>
      </div>
      <div class="Advantages-Advantage">
        <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
        <div class="Advantages-AdvantageText">
          {{ $t('supportPages.aboutUsPage.advantages.text3.p1') }}
          <span class="Colored">6,000</span>
          {{ $t('supportPages.aboutUsPage.advantages.text3.p2') }}
        </div>
      </div>
      <div class="Advantages-Advantage">
        <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
        <div class="Advantages-AdvantageText">
          <span class="Colored">24</span>/
          <span class="Colored">7</span>
          {{ $t('supportPages.aboutUsPage.advantages.text4') }}
        </div>
      </div>
    </div>
    <div class="AboutUsPage-Section">
      <h2 class="Title Title Title--type-h2 Title--center AboutUsPage-Subtitle">
        {{ $t('supportPages.aboutUsPage.ourSoftware.title') }}
      </h2>
      <div class="SupportPage-Introduction">
        {{ $t('supportPages.aboutUsPage.ourSoftware.text') }}
      </div>
    </div>
    <h2 class="Title Title--type-h2 Title--center AboutUsPage-Subtitle">
      {{ $t('supportPages.aboutUsPage.offers.title') }}
    </h2>
    <div class="SupportPage-Offers SupportPage-Cards">
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-bonus.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          {{ $t('supportPages.aboutUsPage.offers.bonuses.title') }}
        </div>
        <div class="SupportPage-CardText">
          {{ $t('supportPages.aboutUsPage.offers.bonuses.text') }}
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-games.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          {{ $t('supportPages.aboutUsPage.offers.ourGames.title') }}
        </div>
        <div class="SupportPage-CardText">
          {{ $t('supportPages.aboutUsPage.offers.ourGames.text') }}
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-jackpots.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          {{ $t('supportPages.aboutUsPage.offers.jackpots.title') }}
        </div>
        <div class="SupportPage-CardText">
          {{ $t('supportPages.aboutUsPage.offers.jackpots.text') }}
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-live.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          {{ $t('supportPages.aboutUsPage.offers.liveGames.title') }}
        </div>
        <div class="SupportPage-CardText">
          {{ $t('supportPages.aboutUsPage.offers.liveGames.text') }}
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-payment.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          {{ $t('supportPages.aboutUsPage.offers.paymentAndSecurity.title') }}
        </div>
        <div class="SupportPage-CardText">
          {{ $t('supportPages.aboutUsPage.offers.paymentAndSecurity.text') }}
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-support.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          {{ $t('supportPages.aboutUsPage.offers.support.title') }}
        </div>
        <div class="SupportPage-CardText">
          {{ $t('supportPages.aboutUsPage.offers.support.text') }}
        </div>
      </div>
    </div>
    <Breadcrumbs />
  </section>
</template>

<script>
export default {
  name: 'AboutUsPage',
  layout: 'page',
  head() {
    return {
      title: 'Information About Ninecasino',
      meta: [
        {
          description:
            'Detailed Information About Us, Our Software And What Do We Offer To Our Clients ✓ Fast withdrawal ✓ Fully licensed',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.AboutUsPage {
  &-Title {
    margin-bottom: 21px;

    @media (min-width: $screen-m) {
      margin-bottom: 16px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 20px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 26px;
    }
  }

  &-Advantages {
    margin-top: 21px;
    margin-bottom: 36px;

    @media (min-width: $screen-m) {
      margin-top: 27px;
      margin-bottom: 26px;
    }

    @media (min-width: $screen-l) {
      margin-top: 36px;
      margin-bottom: 40px;
    }

    @media (min-width: $screen-xl) {
      margin-top: 46px;
      margin-bottom: 60px;
    }
  }

  &-AdvantageIcon {
    width: 34px;
    height: 34px;
    margin-right: 12px;
  }

  &-Subtitle {
    margin-bottom: 24px;

    @media (min-width: $screen-m) {
      margin-bottom: 16px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 20px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 26px;
    }
  }

  &-Section {
    margin-bottom: 36px;

    @media (min-width: $screen-m) {
      margin-bottom: 26px;
      padding-top: 40px;
      padding-bottom: 39px;
      background-image: url(~@/assets/img/about-us-bg_768.png);
      background-repeat: no-repeat;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 40px;
      padding-top: 60px;
      padding-bottom: 96px;
      background-image: url(~@/assets/img/about-us-bg_960.png);
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 60px;
      padding-top: 113px;
      padding-bottom: 112px;
      background-image: url(~@/assets/img/about-us-bg.png);
    }
  }
}
</style>
