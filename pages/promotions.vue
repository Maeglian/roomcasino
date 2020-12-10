<template>
  <section class="Page PromotionsPage">
    <div class="Page-Header PromotionsPage-Header">
      <h1 class="Title Title--type-h1 Page-Title PromotionsPage-Title">
        Current promotions
      </h1>
      <div class="Page-Text Text Text--additional">
        Roomcasino is constantly working to deliver the best promotions. We use the latest
        technology and the feedback from our players to re-design our promotions. Enjoy!
      </div>
    </div>
    <section class="Page-Content">
      <div class="Page-Cards PromotionsPage-Promotions">
        <article
          v-for="(item, i) in promotions"
          :key="`prom_${i}`"
          class="PromotionsCard Page-Card"
        >
          <Banner class="PromotionsCard-Banner" :image="item.image">
            <template #title>
              <span v-html="item.title"></span>
            </template>
            <template #subtitle>
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
            <button
              class="Btn Btn--common PromotionsCard-Btn PromotionsCard-Btn--small"
              @click="onClickBtn()"
            >
              {{ isLoggedIn ? 'Get bonus' : 'Sign up' }}
            </button>
            <NuxtLink
              to="/bonus-terms"
              class="Btn Btn--common Btn--dark PromotionsCard-Btn PromotionsCard-Btn--large"
            >
              Bonus terms & conditions
            </NuxtLink>
          </div>
        </article>
      </div>
      <h2 class="Title Title--type-h2 Page-Subtitle PromotionsPage-Subtitle">
        Tournaments
      </h2>
      <div class="Page-Cards PromotionsPage-Tournaments">
        <article
          v-for="(item, i) in tournaments"
          :key="`tour_${i}`"
          class="PromotionsCard Page-Card"
        >
          <Banner class="PromotionsCard-Banner Banner--withCounter" :image="item.image">
            <template #title>
              <span v-html="item.title"></span>
            </template>
            <template #subtitle>
              <span v-html="item.subtitle"></span>
            </template>
            <template #counter>
              <Counter :enddate="item.enddate" />
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
            <button
              class="Btn Btn--common PromotionsCard-Btn PromotionsCard-Btn--small"
              @click="onClickBtn()"
            >
              {{ isLoggedIn ? 'Deposit' : 'Sign up' }}
            </button>
            <NuxtLink
              to="#"
              class="Btn Btn--common Btn--dark PromotionsCard-Btn PromotionsCard-Btn--large"
            >
              Terms & conditions
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<script>
import Banner from '@/components/Banner';
import Counter from '@/components/Counter';
import { mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'Promotions',
  components: {
    Banner,
    Counter,
  },
  mixins: [showAuthDialog],
  layout: 'page',
  data() {
    return {
      promotions: [
        {
          title: '100%<br/> of the deposit<br/> amount',
          subtitle: '€ 500 <span class="Colored">+</span> 500 Free Spins',
          image: 'promotion1.png',
          announce: 'First deposit bonus',
          text:
            '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
        },
        {
          title: '55%<br/> of the deposit<br/> amount',
          subtitle: '€ 150 <span class="Colored">+</span> 100 Free Spins',
          image: 'promotion2.png',
          announce: 'Second deposit bonus',
          text:
            '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
        },
        {
          title: '100%<br/> of the deposit<br/> amount',
          subtitle: '€ 500 <span class="Colored">+</span> 500 Free Spins',
          image: 'promotion3.png',
          announce: 'First deposit bonus',
          text:
            '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
        },
        {
          title: '55%<br/> of the deposit<br/> amount',
          subtitle: '€ 150 <span class="Colored">+</span> 100 Free Spins',
          image: 'promotion4.png',
          announce: 'Second deposit bonus',
          text:
            '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
        },
        {
          title: '100%<br/> of the deposit<br/> amount',
          subtitle: '€ 500 <span class="Colored">+</span> 500 Free Spins',
          image: 'promotion5.png',
          announce: 'First deposit bonus',
          text:
            '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
        },
        {
          title: '55%<br/> of the deposit<br/> amount',
          subtitle: '€ 150 <span class="Colored">+</span> 100 Free Spins',
          image: 'promotion6.png',
          announce: 'Second deposit bonus',
          text:
            '<p>Make your first deposit of $20 or more, and get up to $150 and 55 free spins in The Sword and The Grail, Domnitors and Domnitors Deluxe slots.</p><p>The bonus will be credited automatically.</p>',
        },
      ],
    };
  },
  computed: {
    ...mapState(['tournaments']),
  },
};
</script>

<style lang="scss">
.PromotionsPage {
  &-Header {
    @media (min-width: $screen-m) {
      background-image: url(../assets/img/promotions-bg-1248.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}

.PromotionsCard {
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
  }

  &-Btn {
    padding-right: 0;
    padding-left: 0;
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
