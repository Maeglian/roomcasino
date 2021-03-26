<template>
  <section class="Footer">
    <Partners class="Footer-Partners" />
    <nav class="Nav Footer-Nav">
      <NuxtLink class="Footer-Logo" to="/">
        <img src="@/assets/img/logo.svg" />
      </NuxtLink>
      <div class="Footer-Links">
        <NuxtLink class="Link Footer-Link" to="/promotions"> Promotion</NuxtLink>
        <NuxtLink class="Link Footer-Link" to="/about-us"> About us</NuxtLink>
        <NuxtLink class="Link Footer-Link" to="/faq"> Faq</NuxtLink>
        <NuxtLink class="Link Footer-Link" to="/bitcoins"> About BTC</NuxtLink>
        <!--        <NuxtLink class="Link Footer-Link" to="/vip">-->
        <!--          VIP rewards-->
        <!--        </NuxtLink>-->
        <NuxtLink class="Link Footer-Link" to="/aml-policy"> AML Policy</NuxtLink>
        <NuxtLink class="Link Footer-Link" to="/terms"> Terms and conditions</NuxtLink>
        <NuxtLink class="Link Footer-Link" to="/bonus-policy"> Bonus policy</NuxtLink>
        <NuxtLink class="Link Footer-Link" to="/responsible-gaming"> Responsible gaming</NuxtLink>
        <NuxtLink class="Link Footer-Link" to="/privacy-policy"> Privacy policy</NuxtLink>

        <!--        <NuxtLink class="Link Footer-Link" to="/payment-methods">-->
        <!--          Payment methods-->
        <!--        </NuxtLink>-->
        <NuxtLink class="Link Footer-Link" to="/risk-warnings"> Risk Warnings</NuxtLink>
      </div>
      <div class="Footer-Lang">
        <img src="@/assets/img/eng.png" alt="" />
      </div>
    </nav>
    <div class="Footer-Disclaimer">
      <div class="Footer-DisclaimerText">
        <div class="Footer-Text">
          You understand that by participating in the games, you risk losing the money deposited to
          your account on www.ninecasino.com. In some jurisdictions, online gambling may be illegal.
          You understand and agree that www.ninecasino.com is not able to provide you legal advice
          or guarantees regarding the legality of your use of the services of the Website. The
          Company does not affirm that the services of the Website comply with legal requirements in
          your jurisdiction. You use the services provided by www.ninecasino.com of your own choice
          and at your sole discretion, as well, assuming the risk of liability, making a decision as
          to whether the use of the services of the Website is legal in accordance with the current
          legislation of your jurisdiction.You log in the Website and participate in the games at
          your own risk.
        </div>
        <div class="Footer-Text">
          Copyright © 2020 www.ninecasino.com is operated by Scartesu Ltd., subsidiary of Dux Group
          N.V., by the laws of Cyprus acting as an Agent on behalf of Dux Group N.V., registered in
          Cyprus with registered address: Boumpoulinas 1, 3rd floor, flat/office 31, 1060, Nicosia,
          Cyprus, and registration No. ΗΕ 410983.The governing law of the website is Cyprus law. The
          website www.ninecasino.com is owned by Dux Group N.V., a company registered and
          established under the laws of Curaçao, with registration No. 155114 and registered address
          at Perseusweg 27A, Willemstad, Curaçao. Dux Group N.V. is licensed by the Government of
          Curaçao as an Information Provider legally authorised to conduct online gaming operations
          from Curaçao under license No. 8048/JAZ2020-075. Remote gaming licensing and supervision
          is provided by Antillephone N.V. It is the player’s sole responsibility to inquire about
          the existing laws and regulations of the given jurisdiction for online gambling.
        </div>
        <div class="Footer-Text">
          If you have any questions or suggestions about our site, please contact us
          <a class="Footer-Contact" href="mailto:support@ninecasino.com">support@ninecasino.com</a>
          or
          <a class="Footer-Contact" href="tel:+43800070855">+43800070855</a>
        </div>
      </div>
      <div class="Footer-Icons">
        <div
          id="apg-034906ca-0989-44fa-8bff-6a0fdffc45bb"
          data-apg-seal-id="034906ca-0989-44fa-8bff-6a0fdffc45bb"
          data-apg-image-size="128"
          data-apg-image-type="basic-small"
        ></div>
        <div class="Footer-MoreIcons">
          <svg class="Icon Footer-Icon" width="25" height="25">
            <use xlink:href="@/assets/img/icons.svg#18"></use>
          </svg>
          <svg class="Icon Footer-Icon" width="56" height="25">
            <use xlink:href="@/assets/img/icons.svg#ssl"></use>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Partners from '@/components/homepage/Partners.vue';

export default {
  name: 'Footer',
  components: {
    Partners,
  },
  mounted() {
    window.apg_034906ca_0989_44fa_8bff_6a0fdffc45bb.init();
  },
};
</script>

<style lang="scss">
.Footer {
  padding-bottom: 70px;

  @media (min-width: $screen-xs) {
    padding-bottom: 54px;
  }

  &-Nav {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-bottom: 13px;
    padding: 20px 0;
    border-bottom: 1px solid var(--color-border);

    @media (min-width: $screen-m) {
      flex-wrap: nowrap;
      padding: 25px 0;
    }

    @media (min-width: $screen-xl) {
      padding: 30px 0;
    }
  }

  &-Logo {
    flex-shrink: 0;
    margin-right: 31px;

    @media (min-width: $screen-l) {
      margin-right: 44px;
    }
  }

  &-Links {
    display: grid;
    order: 2;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;

    @media (min-width: $screen-m) {
      display: initial;
      order: 1;
    }
  }

  &-Link {
    display: inline-block;
    margin-bottom: 16px;
    font-size: 12px;
    white-space: nowrap;

    @media (min-width: $screen-m) {
      margin-right: 28px;
      font-size: 10px;
    }

    @media (min-width: $screen-l) {
      margin-right: 20px;
      font-size: 9px;
    }

    @media (min-width: $screen-xl) {
      margin-right: 24px;
      margin-bottom: 10px;
    }

    &:last-child {
      margin-right: 0;
    }

    &.nuxt-link-exact-active {
      color: var(--color-main1);
    }
  }

  &-Disclaimer {
    @media (min-width: $screen-l) {
      display: flex;
      justify-content: space-between;
    }
  }

  &-Text {
    margin-right: 20px;
    margin-bottom: 17px;
    font-size: 14px;
    line-height: 1.66;
    color: var(--color-more-faded);
  }

  &-Icons {
    display: flex;
    align-items: center;

    @media (min-width: $screen-l) {
      display: block;
    }
  }

  &-MoreIcons {
    display: flex;
    align-items: center;
    margin-left: 0;

    @media (min-width: $screen-l) {
      margin-top: 15px;
    }

    @media (min-width: $screen-xl) {
      margin-left: auto;
    }
  }

  &-Icon {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }

  &-Lang {
    display: inline-flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    order: 1;
    width: 34px;
    height: 34px;
    margin-bottom: 16px;
    margin-left: auto;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: 50%;

    @media (min-width: $screen-m) {
      order: 2;
      margin-bottom: 0;
    }

    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }

  &-Contact {
    color: var(--color-text-main);
  }
}
</style>
