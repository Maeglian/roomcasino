<template>
  <div class="Partners">
    <!--    <client-only>
      <marquee-text :duration="durationSpeed">-->
    <template v-if="countriesLogos[defaultCountry]">
      <div class="Partners-Wrapper">
        <div
          v-for="item in countriesLogos[defaultCountry]"
          :key="`logo-${logos[item].name}`"
          class="Partners-Partner"
        >
          <img
            class="Partners-Image"
            :class="`Partners-Image--${logos[item].name}`"
            :src="logos[item].logo"
            :width="logos[item].width"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="Partners-Wrapper">
        <div v-for="item in paymentList" :key="`logo-${logos[item].name}`" class="Partners-Partner">
          <img
            class="Partners-Image"
            :class="`Partners-Image--${logos[item].name}`"
            :src="logos[item].logo"
            :width="logos[item].width"
          />
        </div>
      </div>
    </template>
    <template>
      <div class="Partners-Wrapper">
        <div
          v-for="item in gameProducers"
          :key="`logo-${logos[item].name}`"
          class="Partners-Partner"
        >
          <img
            class="Partners-Image"
            :class="`Partners-Image--${logos[item].name}`"
            :src="logos[item].logo"
            :width="logos[item].width"
          />
        </div>
      </div>
    </template>
    <!--      </marquee-text>-->
    <!--    </client-only>-->
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Partners',
  data() {
    return {
      logos: {
        interac: {
          name: 'interac',
          logo: require('@/assets/img/interac-online.svg'),
          width: 150,
        },
        instadebit: {
          name: 'instadebit',
          logo: require('@/assets/img/instadebit.svg'),
          width: 150,
        },
        muchbetter: {
          name: 'muchbetter',
          logo: require('@/assets/img/muchbetter.svg'),
          width: 150,
        },
        mastercard: {
          name: 'mastercard',
          logo: require('@/assets/img/mastercard.svg'),
          width: 100,
        },
        visa: {
          name: 'visa',
          logo: require('@/assets/img/visawhite.svg'),
          width: 120,
        },
        skrill: {
          name: 'skrill',
          logo: require('@/assets/img/skrill.svg'),
          width: 100,
        },
        klarna: {
          name: 'klarna',
          logo: require('@/assets/img/klarna.svg'),
          width: 100,
        },
        neteller: {
          name: 'neteller',
          logo: require('@/assets/img/neteller.svg'),
          width: 100,
        },
        paysafecard: {
          name: 'paysafecard',
          logo: require('@/assets/img/paysafe.svg'),
          width: 100,
        },
        playngo: {
          name: 'playngo',
          logo: require('@/assets/img/playngo-white.svg'),
          width: 100,
        },
        pragmatic: {
          name: 'pragmatic',
          logo: require('@/assets/img/pragmatic-white.svg'),
          width: 100,
        },
        evolution: {
          name: 'evolution',
          logo: require('@/assets/img/evolution.svg'),
          width: 100,
        },
        microgaming: {
          name: 'microgaming',
          logo: require('@/assets/img/microgaming-white.svg'),
          width: 120,
        },
        netent: {
          name: 'netent',
          logo: require('@/assets/img/netent-white.svg'),
          width: 120,
        },
        ezeewallet: {
          name: 'ezeewallet',
          logo: require('@/assets/img/ezeewallet.svg'),
          width: 120,
        },
        instanteft: {
          name: 'instanteft',
          logo: require('@/assets/img/instanteft.png'),
          width: 120,
        },
        astropay: {
          name: 'astropay',
          logo: require('@/assets/img/astropay.svg'),
          width: 120,
        },
        volt: {
          name: 'volt',
          logo: require('@/assets/img/volt.svg'),
          width: 120,
        },
        neosurf: {
          name: 'neosurf',
          logo: require('@/assets/img/neosurf.svg'),
          width: 120,
        },
        sofort: {
          name: 'sofort',
          logo: require('@/assets/img/sofort.svg'),
          width: 120,
        },
      },
      paymentList: [
        'interac',
        'instadebit',
        'muchbetter',
        'mastercard',
        'visa',
        'skrill',
        'klarna',
        'neteller',
        'paysafecard',
        'ezeewallet',
        'instanteft',
        'astropay',
        'volt',
        'neosurf',
        'sofort',
      ],
      gameProducers: ['playngo', 'pragmatic', 'evolution', 'microgaming', 'netent'],
      countriesLogos: {
        CA: ['interac', 'instadebit', 'muchbetter', 'mastercard', 'visa', 'skrill'],
        AT: ['mastercard', 'visa', 'skrill', 'ezeewallet'],
        CZ: ['mastercard', 'visa', 'skrill', 'ezeewallet'],
        SI: ['mastercard', 'visa', 'skrill', 'ezeewallet'],
        IE: ['mastercard', 'visa', 'skrill', 'ezeewallet'],
        ZA: ['mastercard', 'visa', 'skrill', 'instanteft', 'astropay'],
        RO: ['mastercard', 'visa', 'skrill', 'ezeewallet', 'volt'],
        DK: ['mastercard', 'visa', 'skrill', 'ezeewallet', 'volt'],
        EE: ['mastercard', 'visa', 'skrill', 'ezeewallet', 'volt'],
        FI: ['mastercard', 'visa', 'skrill', 'ezeewallet', 'volt', 'neosurf'],
        GR: ['mastercard', 'visa', 'skrill', 'ezeewallet', 'volt'],
        SK: ['mastercard', 'visa', 'skrill', 'ezeewallet', 'volt'],
        HR: ['mastercard', 'visa', 'skrill', 'ezeewallet', 'volt'],
        BG: ['mastercard', 'visa', 'skrill', 'ezeewallet', 'volt'],
        DE: ['mastercard', 'visa', 'sofort', 'ezeewallet', 'volt'],
        AU: ['mastercard', 'visa', 'skrill', 'astropay', 'volt'],
      },
    };
  },
  computed: {
    ...mapState(['width', 'defaultCountry']),
    durationSpeed() {
      return this.width > 460 ? 60 : 30;
    },
  },
};
</script>

<style lang="scss">
.Partners {
  &-Wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    padding: 20px 0;
    border-bottom: 1px solid var(--color-border);

    @media (min-width: $screen-m) {
      padding: 25px 0;
    }

    @media (min-width: $screen-xl) {
      padding: 30px 0;
    }
  }

  &-Partner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    margin: 4px 0;
    filter: grayscale(100%);

    @media (min-width: $screen-m) {
      width: 130px;
      margin: 10px 0;
    }

    @media (min-width: $screen-xl) {
      width: 150px;
      margin: 15px 0;
    }
  }

  &-Image {
    max-width: 70%;
    max-height: 20px;

    @media (min-width: $screen-m) {
      max-height: 25px;
    }

    @media (min-width: $screen-xl) {
      max-height: 35px;
    }

    &--interacOnline {
      max-width: 90%;
    }
  }
}
</style>
