<template>
  <section class="Hero">
    <div class="Hero-Slider">
      <Slider :key="`${slides.length}_${width}`" v-bind="options">
        <template v-for="(slide, i) in slides">
          <div
            v-if="!slide.excludedCountries || !slide.excludedCountries.includes($i18n.locale)"
            :key="i"
            class="Hero-Item"
          >
            <picture class="Hero-Image">
              <source
                media="(max-width: 340px)"
                :srcset="require(`@/assets/img/${slide.bg}_320.png`)"
              />
              <source
                media="(max-width: 459px)"
                :srcset="require(`@/assets/img/${slide.bg}_460.png`)"
              />
              <source
                media="(max-width: 589px)"
                :srcset="require(`@/assets/img/${slide.bg}_600.png`)"
              />
              <source
                media="(max-width: 900px)"
                :srcset="require(`@/assets/img/${slide.bg}_900.png`)"
              />
              <source
                media="(max-width: 1400px)"
                :srcset="require(`@/assets/img/${slide.bg}_1248.png`)"
              />
              <img
                :src="require(`@/assets/img/${slide.bg}_1920.png`)"
                alt=""
                @load="setHeroBannerIsLoaded"
              />
            </picture>
            <div class="Hero-Content Hero-Content--centered">
              <div class="Hero-Description">
                <div class="Title Title--type-h1 Hero-Title" v-html="slide.title"></div>
                <!--          <div class="Hero-Text">€100 <span class="Colored">+</span> 55 Free Spins</div>-->
                <div class="Hero-Text" v-html="slide.text"></div>
              </div>
              <NuxtLink
                v-if="slide.url"
                :class="`Hero-Btn--${$i18n.locale}`"
                class="Btn Btn--common Hero-Btn"
                :to="localePath(slide.url)"
              >
                {{ slide.linkText }}
              </NuxtLink>
              <button
                v-else
                class="Btn Btn--common Hero-Btn"
                :class="`Hero-Btn--${$i18n.locale}`"
                @click="onClickBtnGtagEvent()"
              >
                {{ isLoggedIn ? $t('buttons.depositNow') : $t('buttons.signUp') }}
              </button>
            </div>
          </div>
        </template>
      </Slider>
    </div>
    <div class="Hero-Footer">
      <!--      <GamesSlider-->
      <!--        class="Hero-Winners GamesSlider&#45;&#45;winners"-->
      <!--        :items="winners"-->
      <!--        :slider-options="winnersSliderOptions"-->
      <!--        title="Last winners"-->
      <!--      />-->
    </div>
  </section>
</template>

<script>
// import GamesSlider from '@/components/GamesSlider';
import { mapGetters, mapMutations, mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';
import Slider from '@/components/Slider';
import gtagEvents from '@/mixins/gtagEvents';

export default {
  name: 'Hero',
  components: {
    // GamesSlider,
    Slider,
  },
  mixins: [showAuthDialog, gtagEvents],
  data() {
    return {
      options: {
        items: 1,
        loop: true,
        dots: true,
      },
      winners: [
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/sword_of_khans.jpg',
          badge: 'best',
          sum: '€ 11.574.60',
          text: 'Wild98 just won',
        },
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/ravens_eye.jpg',
          badge: 'best',
          sum: '€ 8.200.66',
          text: 'Luliana just won',
        },
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/well_of_wonders.jpg',
          badge: 'best',
          sum: '€ 6.483.67',
          text: 'Farisha just won',
        },
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/jin_chans_pond_of_riches.jpg',
          badge: 'best',
          sum: '€ 8.200.66',
          text: 'Luliana just won',
        },
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/midas_golden_touch.jpg',
          badge: 'best',
          sum: '€ 6.483.67',
          text: 'Farisha just won',
        },
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/riders_of_the_storm.jpg',
          badge: 'best',
          sum: '€ 11.574.60',
          text: 'Wild98 just won',
        },
      ],
      winnersSliderOptions: {
        items: 3,
        loop: true,
        nav: true,
        margin: 10,
      },
    };
  },
  computed: {
    ...mapState(['navIsOpen', 'depositNum', 'width']),
    ...mapState('games', ['games']),
    ...mapGetters(['isLoggedIn']),
    slides() {
      const slides = [
        {
          bg: 'banker-green-second',
          title: this.$t('homepage.heroBanner.deposit1.title'),
          text: this.$t('homepage.heroBanner.deposit1.text'),
          btnText: 'Deposit now',
        },
        {
          bg: 'banker-green-second',
          title: this.$t('homepage.heroBanner.deposit1.title'),
          text: this.$t('homepage.heroBanner.deposit1.text'),
          btnText: 'Deposit now',
        },
        {
          bg: 'banker-gold-second',
          title: this.$t('homepage.heroBanner.deposit2.title'),
          text: this.$t('homepage.heroBanner.deposit2.text'),
          btnText: 'Deposit now',
          excludedCountries: ['fi'],
        },
        {
          bg: 'banker-purple-second',
          title: this.$t('homepage.heroBanner.deposit3.title'),
          text: this.$t('homepage.heroBanner.deposit3.text'),
          btnText: 'Deposit now',
          excludedCountries: ['fi'],
        },
        {
          bg: 'tournaments',
          title: this.$t('homepage.heroBanner.deposit4.title'),
          text: this.$t('homepage.heroBanner.deposit4.text'),
          btnText: 'Deposit now',
          excludedCountries: ['fi'],
        },
        {
          bg: 'highroller',
          title: this.$t('homepage.heroBanner.highroller.title'),
          text: this.$t('homepage.heroBanner.highroller.text'),
          excludedCountries: ['fi'],
        },
        {
          bg: 'dropsSlots',
          title: this.$t('promotions.dropsWinsSlots.title'),
          text: `<span class="Colored">${this.$t('dropsWinsSlots.prize')}</span>`,
          url: '/tournaments/drops-wins-slots',
          linkText: this.$t('buttons.more'),
        },
        {
          bg: 'dropsLive',
          title: this.$t('promotions.dropsWinsLive.title'),
          text: `<span class="Colored">${this.$t('dropsWinsLive.prize')}</span>`,
          url: '/tournaments/drops-wins-live',
          linkText: this.$t('buttons.more'),
        },
        {
          bg: 'derby',
          title: this.$t('weekly_derby.title'),
          text: `<span class="Colored">${this.$t('weekly_derby.prize')}</span>`,
          url: '/tournaments/weekly_derby',
          linkText: this.$t('buttons.more'),
        },
        {
          bg: 'tesla',
          title: this.$t('tesla_lottery.title'),
          text: `<span class="Colored">${this.$t('tesla_lottery.prize')}</span>`,
          url: '/lottery/tesla_lottery',
          linkText: this.$t('buttons.more'),
        },
        {
          bg: 'harvest',
          title: this.$t('happy_harvest_lotto.title'),
          text: `<span class="Colored">${this.$t('happy_harvest_lotto.prize')}</span>`,
          url: '/lottery/happy_harvest_lotto',
          linkText: this.$t('buttons.more'),
        },
        {
          bg: 'beer',
          title: this.$t('letItBeer.title'),
          text: `<span class="Colored">${this.$t('letItBeer.prize')}</span>`,
          url: '/tournaments/let-it-beer',
          linkText: this.$t('buttons.more'),
        },
      ];
      if (!this.isLoggedIn) {
        slides.splice(1, 1);
        return slides;
      }
      return slides.slice(this.depositNum);
    },
  },
  methods: {
    ...mapMutations(['openNav', 'closeNav', 'setHeroBannerIsLoaded']),
    toggleNav() {
      if (this.navIsOpen) this.closeNav();
      else this.openNav();
    },
    onClickBtnGtagEvent() {
      let action = false;
      if (this.isLoggedIn) {
        action = 'deposit_button_pressed';
      } else {
        action = 'signup_button_pressed';
        this.gtagSendEvent('registration_form_shown', { source: 'click' });
      }
      this.gtagSendEvent(action, { position: 'banner' });
      this.onClickBtn();
    },
  },
};
</script>

<style lang="scss">
.Hero {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin-top: -75px;
  margin-bottom: 40px;
  padding-right: 0;
  padding-left: 0;

  @media (min-width: $screen-s) {
    margin-bottom: 0;
  }

  &-Slider {
    position: relative;
    margin-bottom: 12px;

    @media (min-width: $screen-m) {
      margin-bottom: 0;
    }

    .v_slider__dots li {
      padding: 5px;

      @media (min-width: $screen-s) {
        padding: 9px;
      }
    }

    .v_slider__dots li span {
      width: 5px;
      height: 5px;

      @media (min-width: $screen-xs) {
        width: 8px;
        height: 8px;
      }
    }

    .v_slider__dots {
      position: absolute;
      top: 50px;
      left: 50%;
      width: auto;
      transform: translateX(-50%);

      @media (min-width: $screen-xs) {
        top: 65px;
      }

      @media (min-width: $screen-s) {
        top: 250px;
        bottom: initial;
        left: 16px;
        transform: none;
      }

      @media (min-width: $screen-m) {
        top: 300px;
      }

      @media (min-width: $screen-l) {
        top: 290px;
        left: 200px;
      }

      @media (min-width: $screen-xl) {
        top: 360px;
        left: calc(50% - 364px);
      }
    }
  }

  &-Item {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  &-Content {
    text-align: left;

    @media (min-width: $screen-s) {
      position: absolute;
      top: 0;
      left: 16px;
    }

    &--centered {
      width: calc(100% - 32px);
      margin: 0 auto;
      text-align: center;

      @media (min-width: $screen-s) {
        text-align: left;
      }
    }
  }

  &-Description {
    @media (min-width: $screen-s) {
      position: absolute;
      top: 70px;
    }

    @media (min-width: $screen-m) {
      top: 74px;
    }

    @media (min-width: $screen-l) {
      top: 96px;
    }

    @media (min-width: $screen-xl) {
      top: 112px;
      left: calc(50% - 608px);
    }
  }

  &-Image {
    display: inline-block;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  &-Title {
    margin-bottom: 9px;

    @media (min-width: $screen-s) {
      margin-bottom: 9px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 12px;
    }
  }

  &-Text {
    margin-bottom: 18px;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.37;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-s) {
      margin-bottom: 10px;
      font-size: 14px;
    }

    @media (min-width: $screen-m) {
      margin-bottom: 16px;
      font-size: 20px;
    }

    @media (min-width: $screen-l) {
      font-size: 22px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 24px;
      font-size: 28px;
    }
  }

  &-Btn {
    width: 204px;

    @media (min-width: $screen-s) {
      position: absolute;
      top: 190px;
      width: auto;
    }

    @media (min-width: $screen-m) {
      top: 240px;
    }

    @media (min-width: $screen-l) {
      top: 290px;
    }

    @media (min-width: $screen-xl) {
      top: 360px;
      left: calc(50% - 608px);
      min-width: 217px;
    }

    &--cs {
      @media (min-width: $screen-xl) {
        padding-right: 25px;
        padding-left: 25px;
      }
    }
  }

  &-Nav {
    position: absolute;
    bottom: 14px;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;

    @media (min-width: $screen-xs) {
      display: none;
    }
  }

  &-NavItem {
    text-align: center;
  }

  &-NavName {
    font-size: 7px;
    font-weight: 400;
    line-height: 1.66;
    color: var(--color-text-main);
    text-transform: uppercase;
  }

  &-Footer {
    max-width: 100%;
    padding: 0 16px;

    @media (min-width: $screen-m) {
      position: absolute;
      right: calc(50% - 608px);
      bottom: 0;
      left: calc(50% - 608px);
      display: flex;
      align-items: flex-end;
      margin: 0 auto;
    }

    @media (min-width: $screen-xl) {
      max-width: 1248px;
      padding: 0;
    }
  }

  &-Winners {
    @media (min-width: $screen-m) {
      margin-right: 28px;
    }

    @media (min-width: $screen-l) {
      margin-right: 48px;
    }

    @media (min-width: $screen-xl) {
      margin-right: 114px;
    }
  }
}
</style>
