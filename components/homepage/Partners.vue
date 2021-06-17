<template>
  <div class="Partners">
    <!--    <client-only>
      <marquee-text :duration="durationSpeed">-->
    <div class="Partners-Wrapper">
      <template v-if="countriesLogos[defaultCountry]">
        <img
          v-for="(item, i) in countriesLogos[defaultCountry]"
          :key="`logo-${i}`"
          class="Partners-Partner"
          :src="item.logo"
          :width="item.width"
        />
      </template>
      <template v-else>
        <img
          v-for="(item, i) in logos"
          :key="`logo-${i}`"
          class="Partners-Partner"
          :src="item.logo"
          :width="item.width"
        />
      </template>
    </div>
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
        interacOnline: {
          logo: require('@/assets/img/interac-online.svg'),
          width: 100,
        },
        interacEtransfer: {
          logo: require('@/assets/img/interac-etransfer.svg'),
          width: 100,
        },
        instadebit: {
          logo: require('@/assets/img/instadebit.svg'),
          width: 100,
        },
        idebit: {
          logo: require('@/assets/img/idebit.svg'),
          width: 60,
        },
        muchbetter: {
          logo: require('@/assets/img/muchbetter.svg'),
          width: 130,
        },
        mastercard: {
          logo: require('@/assets/img/mastercard.svg'),
          width: 100,
        },
        visa: {
          logo: require('@/assets/img/visa.svg'),
          width: 80,
        },
        neosurf: {
          logo: require('@/assets/img/neosurf.svg'),
          width: 90,
        },
        flexepin: {
          logo: require('@/assets/img/flexepin.png'),
          width: 100,
        },
        skrill: {
          logo: require('@/assets/img/skrill.svg'),
          width: 80,
        },
        jeton: {
          logo: require('@/assets/img/jeton-logo.svg'),
          width: 100,
        },
        astropay: {
          logo: require('@/assets/img/astropay.svg'),
          width: 100,
        },
        klarna: {
          logo: require('@/assets/img/klarna.svg'),
          width: 80,
        },
        neteller: {
          logo: require('@/assets/img/neteller.svg'),
          width: 100,
        },
        paysafecard: {
          logo: require('@/assets/img/paysafe.svg'),
          width: 120,
        },
        volt: {
          logo: require('@/assets/img/volt.svg'),
          width: 50,
        },
        ecashout: {
          logo: require('@/assets/img/ecashout.svg'),
          width: 50,
        },
      },
      countriesLogos: {
        CA: [
          'interac',
          'instadebit',
          'idebit',
          'muchbetter',
          'mastercard',
          'visa',
          'neosurf',
          'flexepin',
          'skrill',
          'jeton',
          'astropay',
        ],
        AU: [
          'mastercard',
          'visa',
          'klarna',
          'skrill',
          'neteller',
          'paysafecard',
          'volt',
          'neosurf',
          'astropay',
          'muchbetter',
        ],
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
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);

  @media (min-width: $screen-m) {
    padding-bottom: 25px;
  }

  @media (min-width: $screen-xl) {
    padding-bottom: 30px;
  }

  &-Wrapper {
    display: grid;
    grid-template-columns: repeat(4, 69px);
    grid-auto-rows: 28px;
    grid-gap: 4px 4px;
    justify-items: center;
    justify-content: center;
    align-items: center;

    @media (min-width: $screen-xs) {
      grid-template-columns: repeat(6, 69px);
    }

    @media (min-width: $screen-s) {
      grid-template-columns: repeat(6, 90px);
      grid-auto-rows: 35px;
    }

    @media (min-width: $screen-m) {
      grid-template-columns: repeat(6, 127px);
      grid-auto-rows: 55px;
    }

    @media (min-width: $screen-m) {
      grid-template-columns: repeat(7, 127px);
      grid-gap: 10px 9px;
    }

    @media (min-width: $screen-xl) {
      grid-template-columns: repeat(9, 127px);
    }
  }

  &-Partner {
    flex-shrink: 0;
    max-width: 80%;
    max-height: 90%;
    opacity: 0.8;
    filter: grayscale(100%);

    @media (min-width: $screen-m) {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
