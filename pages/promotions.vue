<template>
  <section class="Page PromotionsPage">
    <div class="Page-Header PromotionsPage-Header">
      <h1 class="Wrapper Title Title--type-h1 Page-Title PromotionsPage-Title">
        {{ $t('promotions.title') }}
      </h1>
      <div class="Page-Text Text Text--additional">
        {{ $t('promotions.text') }}
      </div>
    </div>
    <section class="Page-Content">
      <div class="Page-Cards PromotionsPage-Promotions">
        <article
          v-for="(item, i) in promotions"
          :key="`prom_${i}`"
          class="PromotionsCard Page-Card"
        >
          <Banner class="PromotionsCard-Banner" :image="item.image" :image460="item.image460">
            <template #title>
              <span v-html="item.title"></span>
            </template>
            <template v-if="item.prize" #prize>
              <span v-html="item.prize"></span>
            </template>
            <template v-if="item.subtitle" #subtitle>
              <span v-html="item.subtitle"></span>
            </template>
          </Banner>
          <div class="PromotionsCard-Footer">
            <div class="PromotionsCard-Title">
              {{ item.announce }}
            </div>
            <div class="PromotionsCard-Text Text Text--additional">
              <span v-html="item.text"> </span>
            </div>
          </div>
          <div class="PromotionsCard-Btns">
            <NuxtLink
              v-if="item.link"
              class="Btn Btn--common Btn--leftCorner PromotionsCard-Btn PromotionsCard-Btn--small"
              :to="localePath(item.url)"
            >
              {{ $t('buttons.more') }}
            </NuxtLink>
            <button
              v-else
              class="Btn Btn--common Btn--leftCorner PromotionsCard-Btn PromotionsCard-Btn--small"
              @click="onClickBtn()"
            >
              {{ isLoggedIn ? $t('buttons.getBonus') : $t('buttons.signUp') }}
            </button>
            <NuxtLink
              :to="localePath('/bonus-terms')"
              class="Btn Btn--common Btn--rightCorner Btn--dark PromotionsCard-Btn PromotionsCard-Btn--large"
            >
              {{ $t('buttons.terms') }}
            </NuxtLink>
          </div>
        </article>
      </div>
      <!--      <h2 class="Title Title&#45;&#45;type-h2 Page-Subtitle PromotionsPage-Subtitle">-->
      <!--        Tournaments-->
      <!--      </h2>-->
      <!--      <div class="Page-Cards PromotionsPage-Tournaments">-->
      <!--        <article-->
      <!--          v-for="(item, i) in tournaments"-->
      <!--          :key="`tour_${i}`"-->
      <!--          class="PromotionsCard Page-Card"-->
      <!--        >-->
      <!--          <Banner class="PromotionsCard-Banner Banner&#45;&#45;withCounter" :image="item.image">-->
      <!--            <template #title>-->
      <!--              <span v-html="item.title"></span>-->
      <!--            </template>-->
      <!--            <template #subtitle>-->
      <!--              <span v-html="item.subtitle"></span>-->
      <!--            </template>-->
      <!--            <template #counter>-->
      <!--              <Counter :enddate="item.enddate" />-->
      <!--            </template>-->
      <!--          </Banner>-->
      <!--          <div class="PromotionsCard-Footer">-->
      <!--            <div class="PromotionsCard-Title">-->
      <!--              {{ item.announce }}-->
      <!--            </div>-->
      <!--            <div class="PromotionsCard-Text Text Text&#45;&#45;additional">-->
      <!--              <span v-html="item.text"> </span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="PromotionsCard-Btns">-->
      <!--            <button-->
      <!--              class="Btn Btn&#45;&#45;common PromotionsCard-Btn PromotionsCard-Btn&#45;&#45;small"-->
      <!--              @click="onClickBtn()"-->
      <!--            >-->
      <!--              {{ isLoggedIn ? 'Deposit' : 'Sign up' }}-->
      <!--            </button>-->
      <!--            <NuxtLink-->
      <!--              to="#"-->
      <!--              class="Btn Btn&#45;&#45;common Btn&#45;&#45;dark PromotionsCard-Btn PromotionsCard-Btn&#45;&#45;large"-->
      <!--            >-->
      <!--              Terms & conditions-->
      <!--            </NuxtLink>-->
      <!--          </div>-->
      <!--        </article>-->
      <!--      </div>-->
    </section>
  </section>
</template>

<script>
import Banner from '@/components/Banner.vue';
// import Counter from '@/components/Counter';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'Promotions',
  components: {
    Banner,
    // Counter,
  },
  mixins: [showAuthDialog],
  layout: 'page',
  data() {
    return {
      promotions: [
        {
          title: this.$t('promotions.deposit1.title'),
          subtitle: this.$t('promotions.deposit1.upTo'),
          image: 'banker-green-promotions.png',
          announce: this.$t('promotions.deposit1.name'),
          text: this.$t('promotions.deposit1.text'),
        },
        {
          title: this.$t('promotions.deposit2.title'),
          subtitle: this.$t('promotions.deposit2.upTo'),
          image: 'banker-gold-promotions.png',
          announce: this.$t('promotions.deposit2.name'),
          text: this.$t('promotions.deposit2.text'),
        },
        {
          title: this.$t('promotions.deposit3.title'),
          subtitle: this.$t('promotions.deposit3.upTo'),
          image: 'banker-purple-promotions.png',
          announce: this.$t('promotions.deposit3.name'),
          text: this.$t('promotions.deposit3.text'),
        },
        {
          title: this.$t('promotions.cashback.title'),
          subtitle: this.$t('promotions.cashback.upTo'),
          image: 'promotions-cashback.png',
          announce: this.$t('promotions.cashback.name'),
          text: this.$t('promotions.cashback.text'),
          link: 'More',
          url: '/daily-cashback',
        },
        {
          title: this.$t('promotions.deposit4.title'),
          subtitle: this.$t('promotions.deposit4.upTo'),
          image: 'promotion7.png',
          announce: this.$t('promotions.deposit4.name'),
          text: this.$t('promotions.deposit4.text'),
        },
        {
          title: this.$t('homepage.heroBanner.highroller.title'),
          subtitle: this.$t('promotions.highroller.upTo'),
          image: 'promotions-highroller.png',
          announce: this.$t('promotions.highroller.name'),
          text: this.$t('promotions.highroller.text'),
        },
        {
          title: this.$t('promotions.dropsWinsSlots.title'),
          prize: this.$t('dropsWinsSlots.prize'),
          image: 'dropsSlots-promotion.png',
          announce: this.$t('promotions.dropsWinsSlots.name'),
          text: this.$t('promotions.dropsWinsSlots.text'),
          link: 'More',
          url: '/tournaments/drops-wins-slots',
        },
        {
          title: this.$t('promotions.dropsWinsLive.title'),
          prize: this.$t('dropsWinsLive.prize'),
          image: 'dropsLive-promotion.png',
          announce: this.$t('promotions.dropsWinsLive.name'),
          text: this.$t('promotions.dropsWinsLive.text'),
          link: 'More',
          url: '/tournaments/drops-wins-live',
        },
        {
          title: this.$t('weekly_derby.title'),
          prize: this.$t('promotions.weekly_derby.upTo'),
          image: 'derby-promotions.png',
          announce: this.$t('promotions.weekly_derby.name'),
          text: this.$t('promotions.weekly_derby.text'),
          link: 'More',
          url: '/tournaments/weekly_derby',
        },
        {
          title: this.$t('sunshine_spins_lottery.title'),
          prize: this.$t('sunshine_spins_lottery.prize'),
          image: 'sunshine-promo.png',
          announce: this.$t('sunshine_spins_lottery.name'),
          text: this.$t('sunshine_spins_lottery.text'),
          link: 'More',
          url: '/lottery/sunshine_spins_lottery',
        },
        {
          title: this.$t('promotions.demigods.title'),
          prize: this.$t('demigods.prize'),
          image: 'demigods-promotions.png',
          announce: this.$t('promotions.demigods.name'),
          text: this.$t('promotions.demigods.text'),
          link: 'More',
          url: '/tournaments/demigods',
        },
        {
          title: this.$t('tesla_lottery.title'),
          prize: this.$t('tesla_lottery.prize'),
          image: 'tesla-promotion.png',
          announce: this.$t('tesla_lottery.name'),
          text: this.$t('tesla_lottery.text'),
          link: 'More',
          url: '/lottery/tesla_lottery',
        },
        {
          title: this.$t('happy_harvest_lotto.title'),
          prize: this.$t('happy_harvest_lotto.prize'),
          image: 'harvest-promo.png',
          announce: this.$t('happy_harvest_lotto.promoTitle'),
          text: this.$t('happy_harvest_lotto.promoText'),
          link: 'More',
          url: '/lottery/happy_harvest_lotto',
        },
      ],
    };
  },
  head() {
    return {
      title: this.$t('metaTags.promotions.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('metaTags.promotions.description'),
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.PromotionsPage {
  &-Header {
    @media (min-width: $screen-m) {
      background-image: url(../assets/img/promotions-bg-1248.png);
      background-repeat: no-repeat;
      background-size: 100% auto;
    }
  }

  &-Title {
    min-width: 320px;
    max-width: 1248px;
    margin: 20px auto;
    padding-right: 16px;
    padding-left: 16px;
  }
}

.PromotionsCard {
  display: flex;
  flex-direction: column;

  &-Title {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      margin-bottom: 18px;
      font-size: 14px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 20px;
      font-size: 18px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 24px;
      font-size: 20px;
    }
  }

  &-Banner {
    height: 168px;

    @media (min-width: $screen-s) {
      height: 184px;
    }

    @media (min-width: $screen-l) {
      height: 224px;
    }

    @media (min-width: $screen-xl) {
      height: 278px;
    }
  }

  &-Footer {
    flex-grow: 1;
    margin-bottom: 4px;
    padding: 20px 16px;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      padding: 23px 27px;
    }

    @media (min-width: $screen-l) {
      padding: 23px 38px;
    }

    @media (min-width: $screen-xl) {
      padding: 34px 34px 53px;
    }
  }

  &-Btns {
    display: flex;
    width: 100%;
    margin-top: auto;
  }

  &-Btn {
    padding-right: 4px;
    padding-left: 4px;
  }

  &-Btn--small {
    width: 155px;
    margin-right: 4px;

    @media (min-width: $screen-l) {
      width: 162px;
    }

    @media (min-width: $screen-xl) {
      width: 256px;
    }
  }

  &-Btn--large {
    flex-grow: 1;
    font-size: 10px;

    @media (min-width: $screen-m) {
      font-size: 12px;
    }

    @media (min-width: $screen-l) {
      font-size: 16px;
    }
  }
}
</style>
