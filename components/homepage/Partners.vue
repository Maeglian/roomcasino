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
          :src="logos[item].logo"
          :width="logos[item].width"
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
          width: 150,
        },
        instadebit: {
          logo: require('@/assets/img/instadebit.svg'),
          width: 150,
        },
        muchbetter: {
          logo: require('@/assets/img/muchbetter.svg'),
          width: 150,
        },
        mastercard: {
          logo: require('@/assets/img/mastercard.svg'),
          width: 100,
        },
        visa: {
          logo: require('@/assets/img/visa.svg'),
          width: 100,
        },
        skrill: {
          logo: require('@/assets/img/skrill.svg'),
          width: 100,
        },
        klarna: {
          logo: require('@/assets/img/klarna.svg'),
          width: 100,
        },
        neteller: {
          logo: require('@/assets/img/neteller.svg'),
          width: 100,
        },
        paysafecard: {
          logo: require('@/assets/img/paysafe.svg'),
          width: 100,
        },
        playngo: {
          logo: require('@/assets/img/playngo-white.svg'),
          width: 100,
        },
        pragmatic: {
          logo: require('@/assets/img/pragmatic-white.svg'),
          width: 100,
        },
        evolution: {
          logo: require('@/assets/img/evolution.svg'),
          width: 100,
        },
        /* microgaming: {
          logo: require('@/assets/img/microgaming-white.svg'),
          width: 120,
        }, */
        netent: {
          logo: require('@/assets/img/netent-white.svg'),
          width: 120,
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  &-Partner {
    width: 80px;
    margin: 5px 10px 5px;
    opacity: 0.8;
    filter: grayscale(100%);

    @media (min-width: $screen-m) {
      width: 100px;
      margin: 5px 15px 5px;
    }
  }
}
</style>
