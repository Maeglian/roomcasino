<template>
  <section class="Footer">
    <Partners class="Footer-Partners" />
    <nav class="Nav Footer-Nav">
      <NuxtLink class="Footer-Logo" :to="localePath('/')">
        <img src="@/assets/img/logo.svg" />
      </NuxtLink>
      <div class="Footer-Links">
        <NuxtLink class="Link Footer-Link" :to="localePath('/promotions')">
          {{ $t('pages.promotion') }}
        </NuxtLink>
        <NuxtLink class="Link Footer-Link" :to="localePath('/about-us')">
          {{ $t('pages.aboutUs') }}</NuxtLink
        >
        <NuxtLink class="Link Footer-Link" :to="localePath('/bitcoins')">
          {{ $t('pages.btc') }}</NuxtLink
        >
        <!--        <NuxtLink class="Link Footer-Link" to="localePath('/vip')">-->
        <!--          VIP rewards-->
        <!--        </NuxtLink>-->
        <NuxtLink class="Link Footer-Link" :to="localePath('/aml-policy')">
          {{ $t('pages.aml') }}</NuxtLink
        >
        <NuxtLink class="Link Footer-Link" :to="localePath('/terms')">
          {{ $t('pages.terms') }}</NuxtLink
        >
        <NuxtLink class="Link Footer-Link" :to="localePath('/bonus-policy')">
          {{ $t('pages.bonusPolicy') }}</NuxtLink
        >
        <NuxtLink class="Link Footer-Link" :to="localePath('/responsible-gaming')">
          {{ $t('pages.responsibleGaming') }}</NuxtLink
        >
        <NuxtLink class="Link Footer-Link" :to="localePath('/risk-warnings')">
          {{ $t('pages.risk') }}</NuxtLink
        >
        <NuxtLink class="Link Footer-Link" :to="localePath('/privacy-policy')">
          {{ $t('pages.privacyPolicy') }}</NuxtLink
        >
        <NuxtLink class="Link Footer-Link" :to="localePath('/faq')">
          {{ $t('pages.faq') }}</NuxtLink
        >

        <!--        <NuxtLink class="Link Footer-Link" to="/payment-methods">-->
        <!--          Payment methods-->
        <!--        </NuxtLink>-->
      </div>
      <LangSwitcher class="Footer-Lang" />
      <!--      <div class="Footer-Lang">-->
      <!--        <img src="@/assets/img/eng.png" alt="" />-->
      <!--      </div>-->
    </nav>
    <div class="Footer-Disclaimer">
      <div class="Footer-DisclaimerText">
        <div class="Footer-Text">
          {{ $t('footer.text.p1') }}
        </div>
        <div class="Footer-Text">
          {{ $t('footer.text.p2') }}
        </div>
        <div class="Footer-Text">
          <i18n path="footer.text.p3">
            <template #support>
              <a class="Footer-Contact" href="mailto:support@ninecasino.com"
                >support@ninecasino.com</a
              >
            </template>
            <template #phone>
              <a class="Footer-Contact" href="tel:+43800070855">+43800070855</a>
            </template>
          </i18n>
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
import LangSwitcher from '@/components/LangSwitcher';

export default {
  name: 'Footer',
  components: {
    Partners,
    LangSwitcher,
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
    max-width: 100%;
    grid-template-columns: 50% 50%;
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
    order: 1;
    margin-bottom: 16px;
    margin-left: auto;

    @media (min-width: $screen-m) {
      order: 2;
      margin-bottom: 0;
    }
  }

  &-Contact {
    color: var(--color-text-main);
  }
}
</style>
