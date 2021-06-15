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
        },
        interacEtransfer: {
          logo: require('@/assets/img/interac-etransfer.svg'),
        },
        instadebit: {
          logo: require('@/assets/img/instadebit.svg'),
        },
        idebit: {
          logo: require('@/assets/img/idebit.svg'),
        },
        muchbetter: {
          logo: require('@/assets/img/muchbetter.svg'),
        },
        mastercard: {
          logo: require('@/assets/img/mastercard.svg'),
          width: 100,
        },
        visa: {
          logo: require('@/assets/img/visa.svg'),
        },
        neosurf: {
          logo: require('@/assets/img/neosurf.svg'),
        },
        flexepin: {
          logo: require('@/assets/img/flexepin.png'),
        },
        skrill: {
          logo: require('@/assets/img/skrill.svg'),
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
          width: 60,
        },
        ecashout: {
          logo: require('@/assets/img/ecashout.svg'),
          width: 60,
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
    //display: flex;
    //flex-wrap: nowrap;
    //justify-content: flex-start;
    //align-items: center;
    display: grid;
    grid-template-columns: repeat(9, 127px);
    grid-gap: 10px 9px;
    justify-items: center;
    align-items: center;
  }

  &-Partner {
    flex-shrink: 0;
    //margin-right: 16px;

    @media (min-width: $screen-m) {
      //margin-right: 25px;
    }

    @media (min-width: $screen-xl) {
      //margin-right: 37px;
    }
  }
}
</style>
