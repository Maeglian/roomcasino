<template>
  <section class="SupportPage BitcoinsPage">
    <h1 class="Title Title--type-h1 Title--center BitcoinsPage-Title">
      Why you need Bitcoins?
    </h1>
    <div class="SupportPage-Introduction ">
      It is the new generation of online payments. Fast transactions with low fees can be sent to
      any part of the world. It can be a bit complicated to understand all cryptocurrency concepts,
      but the convenience makes it worthwhile.
    </div>
    <div class="BitcoinsPage-Reasons">
      <div class="SupportPage-Card BitcoinsPage-Reason">
        <img class="BitcoinsPage-ReasonIcon" src="@/assets/img/bitcoin1.png" />
        <div class="BitcoinsPage-ReasonContent">
          <div class="BitcoinsPage-ReasonTitle SupportPage-CardTitle">
            Security and money That is always traceable
          </div>
          <div class="SupportPage-CardText">
            All Bitcoin transactions are based on its blockchain. Blockchain is like an open ledger
            where everyone can check all transaction history but cannot make any changes there.
            Blockchain technology is getting popular now because of its security. Governments of
            many countries use it for their purposes.
          </div>
        </div>
      </div>
      <div class="SupportPage-Card BitcoinsPage-Reason">
        <img class="BitcoinsPage-ReasonIcon" src="@/assets/img/bitcoin2.png" />
        <div class="BitcoinsPage-ReasonContent">
          <div class="BitcoinsPage-ReasonTitle SupportPage-CardTitle">
            Protection of you date
          </div>
          <div class="SupportPage-CardText">
            You can start using Bitcoin without sending your personal information to anyone. Some
            crypto exchanges can ask you to pass the KYC (Know Your Client) procedure, but this
            happens if you buy/sell substantial amounts. Terms of KYC are always available in their
            FAQ – you can choose the exchange you prefer.
          </div>
        </div>
      </div>
      <div class="SupportPage-Card BitcoinsPage-Reason">
        <img class="BitcoinsPage-ReasonIcon" src="@/assets/img/bitcoin3.png" />
        <div class="BitcoinsPage-ReasonContent">
          <div class="BitcoinsPage-ReasonTitle SupportPage-CardTitle">
            Low Fees
          </div>
          <div class="SupportPage-CardText">
            Bitcoin is the best way to send money to a person from another country. The transaction
            will be sent in less than an hour depending on the load on the Bitcoin network. Unlike
            international bank transfers, which could take more than a week.
          </div>
        </div>
      </div>
      <div class="SupportPage-Card BitcoinsPage-Reason">
        <img class="BitcoinsPage-ReasonIcon" src="@/assets/img/bitcoin4.png" />
        <div class="BitcoinsPage-ReasonContent">
          <div class="BitcoinsPage-ReasonTitle SupportPage-CardTitle">
            I nternational transactions
          </div>
          <div class="SupportPage-CardText">
            Bitcoin is the best way to send money to a person from another country. The transaction
            will be sent in less than an hour depending on the load on the Bitcoin network. Unlike
            international bank transfers, which could take more than a week.
          </div>
        </div>
      </div>
      <div class="SupportPage-Card BitcoinsPage-Reason">
        <img class="BitcoinsPage-ReasonIcon" src="@/assets/img/bitcoin5.png" />
        <div class="BitcoinsPage-ReasonContent">
          <div class="BitcoinsPage-ReasonTitle SupportPage-CardTitle">
            Decentralization
          </div>
          <div class="SupportPage-CardText">
            Bitcoin is an open-source product with a big community of enthusiasts that helps in the
            development etc. There is no owner of the Bitcoin blockchain network, so no one can ban
            your account or wallet.
          </div>
        </div>
      </div>
    </div>
    <h2 class="Title Title--type-h2 Title--center BitcoinsPage-Title">
      How to play on Ninecasino with bitcoins?
    </h2>
    <div class="BitcoinsPage-Steps SupportPage-Offers">
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/step1.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          Choose your wallet
        </div>
        <div class="SupportPage-CardText">
          First of all, you need to choose where you want to store your Bitcoins. There are several
          ways to do it: online wallets, hardware wallets (cold wallets) or you can store them in
          your wallet on one of the exchanges.
          <br /><br />
          The most popular online wallets are Blockchain.com, Exodus and Mycelium. Trezor and Ledger
          are the most popular cold wallets.
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/step2.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          Buy bitcoins
        </div>
        <div class="SupportPage-CardText">
          There are two main types of cryptocurrency exchanges. The first type is just regular
          exchanges like Binance, Huobi, Coinbase, Kraken etc.
          <br /><br />
          The second type is p2p exchanges where you’re buying/selling Bitcoins directly with
          another person like LocalBitcoins.com.
        </div>
      </div>
      <div class="SupportPage-Offer SupportPage-Card">
        <img class="SupportPage-OfferIcon" src="@/assets/img/step3.svg" />
        <div class="SupportPage-OfferTitle SupportPage-CardTitle">
          Make a deposit and enjoy the games
        </div>
        <div class="SupportPage-CardText">
          When you buy Bitcoins, you can deposit them in your GetSlots account and start to play
          games.<br />
          Or you can use Bitcoin as an investment tool. It is a well-known and fast-growing
          investment option.
          <br /><br />
          We also accept other cryptocurrencies in our casino. You can also make a deposit with
          Ethereum, Litecoin and Bitcoin Cash.
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BitcoinsPage',
  layout: 'page',
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
