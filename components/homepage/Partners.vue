<template>
  <div class="Partners">
    <!--    <client-only>
      <marquee-text :duration="durationSpeed">-->
    <div class="Partners-Wrapper">
      <template v-if="countriesLogos[defaultCountry]">
        <div
          v-for="(item, i) in countriesLogos[defaultCountry]"
          :key="`logo-${i}`"
          class="Partners-Partner"
        >
          <img
            class="Partners-Image"
            :class="`Partners-Image--${item}`"
            :src="logos[item].logo"
            :width="logos[item].width"
          />
        </div>
      </template>
      <template v-else>
        <div v-for="(item, name) in logos" :key="`logo-${name}`" class="Partners-Partner">
          <img
            class="Partners-Image"
            :class="`Partners-Image--${name}`"
            :src="item.logo"
            :width="item.width"
          />
        </div>
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
        microgaming: {
          logo: require('@/assets/img/microgaming-white.svg'),
          width: 120,
        },
        netent: {
          logo: require('@/assets/img/netent-white.svg'),
          width: 120,
        },
      },
      countriesLogos: {
        CA: ['interacOnline', 'instadebit', 'muchbetter', 'skrill', 'paysafecard'],
        AT: ['skrill'],
        CZ: ['skrill'],
        SI: ['skrill'],
        IE: ['skrill'],
        ZA: ['skrill'],
        RO: ['skrill'],
        DK: ['skrill'],
        EE: ['skrill'],
        FI: ['skrill'],
        GR: ['skrill'],
        SK: ['skrill'],
        HR: ['skrill'],
        BG: ['skrill'],
        DE: [],
        AU: ['skrill'],
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    margin-bottom: 4px;
    opacity: 0.8;
    filter: grayscale(100%);

    @media (min-width: $screen-m) {
      width: 130px;
      margin-bottom: 10px;
    }

    @media (min-width: $screen-xl) {
      width: 170px;
      margin-bottom: 15px;
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
