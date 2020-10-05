<template>
  <!-- eslint-disable max-len -->
  <section class="Footer">
    <Partners class="Footer-Partners" />
    <nav class="Nav Footer-Nav">
      <router-link class="Footer-Logo" to="/">
        <img src="@/assets/img/logo.svg" />
      </router-link>
      <div class="Footer-Links">
        <router-link class="Link Footer-Link" to="/promotions">
          Promotion
        </router-link>
        <router-link class="Link Footer-Link" to="/vip">
          VIP rewards
        </router-link>
        <router-link class="Link Footer-Link" to="/payment-methods">
          Payment methods
        </router-link>
        <router-link class="Link Footer-Link" to="/payment-options">
          Payment options
        </router-link>
        <router-link class="Link Footer-Link" to="/responsible-gamings">
          Responsible gaming
        </router-link>
        <router-link class="Link Footer-Link" to="/terms-and-conditions">
          Terms and conditions
        </router-link>
        <router-link class="Link Footer-Link" to="/bonus-policy">
          Bonus policy
        </router-link>
        <router-link class="Link Footer-Link" to="/privacy-policy">
          Privacy policy
        </router-link>
        <router-link class="Link Footer-Link" to="/about-us">
          About us
        </router-link>
        <router-link class="Link Footer-Link" to="/faq">
          Faq
        </router-link>
      </div>
      <div class="Footer-Lang">
        <img src="@/assets/img/eng.png" alt="">
      </div>
    </nav>
    <div class="Footer-Disclaimer">
      <div class="Footer-Text">
        This site’s operations are regulated by the Malta Gaming Authority and is operated by SkillOnNet Ltd, Office 1/5297 Level G, Quantum House,
        75, Abate Rigord Street, Ta’ Xbiex, XBX 1120, Malta, under the gaming license issued by the Malta Gaming Authority (license number MGA/CRP/171/2009/01) issued on 1 August 2018
        <br/>
        <br/>
        <u>Gambling can be addictive, please play responsibly</u>
      </div>
      <div class="Footer-Icons">
        <svg class="Icon Footer-Icon" width="25" height="25">
          <use xlink:href="@/assets/img/icons.svg#18"></use>
        </svg>
        <svg class="Icon Footer-Icon" width="56" height="25">
          <use xlink:href="@/assets/img/icons.svg#ssl"></use>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
import Partners from '@/components/Partners.vue';

export default {
  name: 'Footer',
  components: {
    Partners,
  },
};
</script>

<style lang="scss">
.Footer {
  padding-bottom: 54px;

  &-Nav {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 20px 0;
    margin-bottom: 13px;
    border-bottom: 1px solid var(--color-border);

    @media(min-width: $screen-m) {
      flex-wrap: nowrap;
      padding: 25px 0;
    }

    @media(min-width: $screen-xl) {
      padding: 30px 0;
    }
  }

  &-Logo {
    flex-shrink: 0;
    margin-right: 31px;

    @media(min-width: $screen-l) {
      margin-right: 44px;
    }
  }

  &-Links {
    order: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    width: 100%;

    @media(min-width: $screen-m) {
      order: 1;
      display: initial;
    }
  }

  &-Link {
    display: inline-block;
    margin-bottom: 16px;
    font-size: 12px;
    white-space: nowrap;

    &:last-child {
      margin-right: 0;
    }

    @media(min-width: $screen-m) {
      margin-right: 28px;
      font-size: 10px;
    }

    @media(min-width: $screen-l) {
      margin-right: 20px;
      font-size: 9px;
    }

    @media(min-width: $screen-xl) {
      margin-right: 24px;
      margin-bottom: 10px;
    }
  }

  &-Disclaimer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    @media(min-width: $screen-m) {
      align-items: flex-end;
    }
  }

  &-Text {
    margin-bottom: 17px;
    font-size: 14px;
    line-height: 1.66;
    color: var(--color-more-faded);

    @media(min-width: $screen-m) {
      margin-bottom: 0;
    }
  }

  &-Icons {
    display: flex;
    margin-left: 0;

    @media(min-width: $screen-xl) {
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
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    order: 1;
    width: 34px;
    height: 34px;
    margin-left: auto;
    margin-bottom: 16px;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    overflow: hidden;

    @media(min-width: $screen-m) {
      order: 2;
      margin-bottom: 0;
    }

    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
}
</style>
