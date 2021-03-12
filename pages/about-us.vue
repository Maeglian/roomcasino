<template>
  <section class="SupportPage AboutUsPage">
    <h1 class="Title Title--type-h1 Title--center AboutUsPage-Title">About us</h1>
    <div class="SupportPage-Introduction">
      Ninecasino is a next-generation high-tech casino with the latest games that have been
      developed by the best experts in the industry. We have played in various online casinos for
      many years. We have a huge amount of accumulated gambling experience. We know what a real
      player needs.
    </div>
    <div class="AboutUsPage-Advantages">
      <div class="AboutUsPage-Advantage">
        <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
        <div class="AboutUsPage-AdvantageText">Prompt payouts</div>
      </div>
      <div class="AboutUsPage-Advantage">
        <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
        <div class="AboutUsPage-AdvantageText">Licensed online casino</div>
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
      <h2 class="Title Title Title--type-h2 Title--center AboutUsPage-Subtitle">Our software</h2>
      <div class="SupportPage-Introduction">
        The casino uses products that have been made by the best developers of casino software and
        games in the industry. Amatic, BetSoft, Endorphina, Ezugi, Microgaming, and SoftSwiss. Every
        gambler will be familiar with them firsthand and trust everything that these names stand
        for. We trust them too. We do not want our players to feel like experimental lab mice in an
        abortive experiment, so we offer a reliable solution that we would be delighted to use
        ourselves as gamblers.
      </div>
    </div>
    <h2 class="Title Title--type-h2 Title--center AboutUsPage-Subtitle">What do we offer</h2>
    <div class="SupportPage-Offers SupportPage-Cards">
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-bonus.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">Bonuses</div>
        <div class="SupportPage-CardText">
          Our generous "Welcome Bonus" brings an additional thrill to excite even the coldest and
          most cautious players. Just make your deposit and get back twice as much in your account.
          And that's not all! Follow the "Bonuses" section on our website.
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-games.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">Our games</div>
        <div class="SupportPage-CardText">
          We care about our players, and we would like to offer something to satisfy every taste.
          The games which we offer were created by the best developers in the industry. It means
          that they have excellent graphics, and they sound great, too. Also, the games work under
          the "provably fair" technology.
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-jackpots.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">Jackpots</div>
        <div class="SupportPage-CardText">
          Everyone dreams about the moment when the magic word JACKPOT appears on the screen,
          signaling that someone has achieved their dream. With our progressive slots, this magic
          number is constantly growing every second alongside the size of someone's dream.
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-live.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">Live games</div>
        <div class="SupportPage-CardText">
          Immerse yourself in the atmosphere of a real casino without leaving your room. Our
          live-games allow you to feel like you are at the real gaming table all while remaining
          sitting at home comfortably.
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-payment.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">Payment systems and security</div>
        <div class="SupportPage-CardText">
          No one likes to wait. We can offer our players instant deposits and payouts. Before you
          even have the chance to blink, the money will reach its destination. Choose a currency,
          make a deposit, take a deep breath, and you are ready to play.
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/offer-support.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">24/7 Support</div>
        <div class="SupportPage-CardText">
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
    width: 100%;
    margin-top: 21px;
    margin-bottom: 36px;

    @media (min-width: $screen-m) {
      display: flex;
      justify-content: space-between;
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

  &-Advantage {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 24px 26px;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      flex-grow: 1;
      margin-right: 11px;
      margin-bottom: 0;
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
