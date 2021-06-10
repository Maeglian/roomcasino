<template>
  <div class="Partners">
    <client-only>
      <marquee-text :duration="durationSpeed"
        ><div class="Partners-Wrapper">
          <template v-if="countriesLogos[defaultCountry]">
            <img
              v-for="item in countriesLogos[defaultCountry]"
              :key="item"
              class="Partners-Partner"
              :src="item.logo"
              :width="item.width"
            />
          </template>
          <template v-else>
            <img
              v-for="item in logos"
              :key="item"
              class="Partners-Partner"
              :src="item.logo"
              :width="item.width"
            />
          </template>
        </div>
      </marquee-text>
    </client-only>
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
          logo: require('@/assets/img/interac.svg'),
          width: 60,
        },
        instadebit: {
          logo: require('@/assets/img/instadebit.svg'),
          width: 190,
        },
        idebit: {
          logo: require('@/assets/img/idebit.svg'),
          width: 80,
        },
        muchbetter: {
          logo: require('@/assets/img/muchbetter.png'),
          width: 150,
        },
        mastercard: {
          logo: require('@/assets/img/mastercard.svg'),
          width: 60,
        },
        visa: {
          logo: require('@/assets/img/visa.svg'),
          width: 60,
        },
        neosurf: {
          logo: require('@/assets/img/neosurf.svg'),
          width: 100,
        },
        flexepin: {
          logo: require('@/assets/img/flexepin.png'),
          width: 80,
        },
        skrill: {
          logo: require('@/assets/img/skrill.png'),
          width: 80,
        },
        jeton: {
          logo: require('@/assets/img/jeton-logo.svg'),
          width: 90,
        },
        astropay: {
          logo: require('@/assets/img/astropay.svg'),
          width: 120,
        },
        klarna: {
          logo: require('@/assets/img/klarna.svg'),
          width: 80,
        },
        neteller: {
          logo: require('@/assets/img/neteller.svg'),
          width: 120,
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
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  &-Partner {
    flex-shrink: 0;
    margin-right: 16px;

    @media (min-width: $screen-m) {
      margin-right: 25px;
    }

    @media (min-width: $screen-xl) {
      margin-right: 37px;
    }
  }
}
</style>
