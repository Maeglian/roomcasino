<template>
  <section class="SupportPage AboutUsPage">
    <h1 class="Title AboutUsPage-Title">
      About us
    </h1>
    <div class="AboutUsPage-Text">
      Roomcasino is a next-generation high-tech casino with the latest games that have been
      developed by the best experts in the industry. We have played in various online casinos for
      many years. We have a huge amount of accumulated gambling experience. We know what a real
      player needs.
    </div>
    <div class="AboutUsPage-Advantages">
      <div class="AboutUsPage-Advantage">
        <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
        <div class="AboutUsPage-AdvantageText">
          Prompt payouts
        </div>
      </div>
      <div class="AboutUsPage-Advantage">
        <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
        <div class="AboutUsPage-AdvantageText">
          Licensed online casino
        </div>
      </div>
      <div class="AboutUsPage-Advantage">
        <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
        <div class="AboutUsPage-AdvantageText">
          More than <span class="Colored">6,000</span> games
        </div>
      </div>
      <div class="AboutUsPage-Advantage">
        <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
        <div class="AboutUsPage-AdvantageText">
          <span class="Colored">24</span>/<span class="Colored">7</span> support
        </div>
      </div>
    </div>
    <div class="AboutUsPage-Section">
      <h2 class="Title AboutUsPage-Subtitle">
        Our software
      </h2>
      <div class="AboutUsPage-Text">
        The casino uses products that have been made by the best developers of casino software and
        games in the industry. Amatic, BetSoft, Endorphina, Ezugi, Microgaming, and SoftSwiss. Every
        gambler will be familiar with them firsthand and trust everything that these names stand
        for. We trust them too. We do not want our players to feel like experimental lab mice in an
        abortive experiment, so we offer a reliable solution that we would be delighted to use
        ourselves as gamblers.
      </div>
    </div>
    <h2 class="Title AboutUsPage-Subtitle">
      What do we offer
    </h2>
    <div class="AboutUsPage-Offers">
      <div class="AboutUsPage-Offer">
        <img class="AboutUsPage-OfferIcon" src="@/assets/img/offer-bonus.svg" />
        <div class="AboutUsPage-OfferTitle">
          Bonuses
        </div>
        <div class="AboutUsPage-Text">
          Our generous "Welcome Bonus" brings an additional thrill to excite even the coldest and
          most cautious players. Just make your deposit and get back twice as much in your account.
          And that's not all! Follow the "Bonuses" section on our website.
        </div>
      </div>
      <div class="AboutUsPage-Offer">
        <img class="AboutUsPage-OfferIcon" src="@/assets/img/offer-games.svg" />
        <div class="AboutUsPage-OfferTitle">
          Our games
        </div>
        <div class="AboutUsPage-Text">
          We care about our players, and we would like to offer something to satisfy every taste.
          The games which we offer were created by the best developers in the industry. It means
          that they have excellent graphics, and they sound great, too. Also, the games work under
          the "provably fair" technology.
        </div>
      </div>
      <div class="AboutUsPage-Offer">
        <img class="AboutUsPage-OfferIcon" src="@/assets/img/offer-jackpots.svg" />
        <div class="AboutUsPage-OfferTitle">
          Jackpots
        </div>
        <div class="AboutUsPage-Text">
          Everyone dreams about the moment when the magic word JACKPOT appears on the screen,
          signaling that someone has achieved their dream. With our progressive slots, this magic
          number is constantly growing every second alongside the size of someone's dream.
        </div>
      </div>
      <div class="AboutUsPage-Offer">
        <img class="AboutUsPage-OfferIcon" src="@/assets/img/offer-live.svg" />
        <div class="AboutUsPage-OfferTitle">
          Live games
        </div>
        <div class="AboutUsPage-Text">
          Immerse yourself in the atmosphere of a real casino without leaving your room. Our
          live-games allow you to feel like you are at the real gaming table all while remaining
          sitting at home comfortably.
        </div>
      </div>
      <div class="AboutUsPage-Offer">
        <img class="AboutUsPage-OfferIcon" src="@/assets/img/offer-payment.svg" />
        <div class="AboutUsPage-OfferTitle">
          Payment systems and security
        </div>
        <div class="AboutUsPage-Text">
          No one likes to wait. We can offer our players instant deposits and payouts. Before you
          even have the chance to blink, the money will reach its destination. Choose a currency,
          make a deposit, take a deep breath, and you are ready to play.
        </div>
      </div>
      <div class="AboutUsPage-Offer">
        <img class="AboutUsPage-OfferIcon" src="@/assets/img/offer-support.svg" />
        <div class="AboutUsPage-OfferTitle">
          24/7 Support
        </div>
        <div class="AboutUsPage-Text">
          Though you may encounter some problems, our team of professionals will always be there to
          help you in these situations. Since you can contact our specialists by chat or e-mail
          around the clock, you can be sure to receive assistance in case problems arise.
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutUsPage',
  layout: 'page',
};
</script>

<style lang="scss">
.AboutUsPage {
  &-Title {
    margin-bottom: 21px;
    font-size: 24px;
    text-align: center;

    @media (min-width: $screen-m) {
      margin-bottom: 16px;
      font-size: 28px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 20px;
      font-size: 30px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 26px;
      font-size: 33px;
    }
  }

  &-Text {
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
    color: var(--color-text-ghost);

    @media (min-width: $screen-m) {
      width: 73%;
      margin-right: auto;
      margin-left: auto;
    }

    @media (min-width: $screen-xl) {
      width: 58%;
    }
  }

  &-Advantages {
    width: 100%;
    margin-top: 21px;
    margin-bottom: 36px;

    @media (min-width: $screen-m) {
      display: flex;
      justify-content: space-between;
      margin-top: 27px;
      margin-bottom: 66px;
    }

    @media (min-width: $screen-l) {
      margin-top: 36px;
      margin-bottom: 100px;
    }

    @media (min-width: $screen-xl) {
      margin-top: 46px;
      margin-bottom: 173px;
    }
  }

  &-Advantage {
    display: flex;
    align-items: center;
    padding: 24px 26px;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      flex-grow: 1;
      margin-right: 11px;
    }

    @media (min-width: $screen-l) {
      margin-right: 13px;
    }

    @media (min-width: $screen-xl) {
      margin-right: 15px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &-AdvantageIcon {
    width: 34px;
    height: 34px;
    margin-right: 12px;
  }

  &-AdvantageText {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: capitalize;

    @media (min-width: $screen-l) {
      margin-right: 16px;
    }
  }

  &-Subtitle {
    margin-bottom: 24px;
    font-size: 16px;
    text-align: center;

    @media (min-width: $screen-m) {
      margin-bottom: 16px;
      font-size: 20px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 20px;
      font-size: 24px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 26px;
      font-size: 28px;
    }
  }

  &-Offers {
    @media (min-width: $screen-m) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 8px;
    }

    @media (min-width: $screen-l) {
      grid-gap: 11px;
    }

    @media (min-width: $screen-xl) {
      grid-gap: 14px;
    }
  }

  &-Offer {
    width: 100%;
    margin-bottom: 16px;
    padding: 34px 0;
    text-align: center;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      width: auto;
      margin-bottom: 0;
      padding: 26px 0;
    }

    @media (min-width: $screen-l) {
      padding: 34px 0;
    }

    @media (min-width: $screen-xl) {
      padding: 45px 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-OfferIcon {
    width: 62px;
    height: 72px;
    margin-bottom: 29px;

    @media (min-width: $screen-m) {
      width: 50px;
      height: 58px;
      margin-bottom: 22px;
    }

    @media (min-width: $screen-l) {
      width: 62px;
      height: 72px;
      margin-bottom: 29px;
    }

    @media (min-width: $screen-xl) {
      width: 82px;
      height: 94px;
      margin-bottom: 38px;
    }
  }

  &-OfferTitle {
    margin-bottom: 14px;
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-l) {
      font-size: 20px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 18px;
    }
  }

  &-OfferText {
    font-size: 14px;
    line-height: 1.6;
    color: var(--color-text-ghost);
  }

  &-Section {
    margin-bottom: 36px;

    @media (min-width: $screen-m) {
      margin-bottom: 65px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 136px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 172px;
    }
  }
}
</style>
