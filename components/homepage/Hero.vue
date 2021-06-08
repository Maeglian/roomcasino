<template>
  <section class="Hero">
    <div class="Hero-Slider">
      <Slider :key="`${slides.length}_${width}`" v-bind="options">
        <div v-for="(slide, i) in slides" :key="i" class="Hero-Item">
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
              media="(max-width: 1248px)"
              :srcset="require(`@/assets/img/${slide.bg}_1248.png`)"
            />
            <img
              :srcset="require(`@/assets/img/${slide.bg}_1920.png`)"
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
              @click="onClickBtn()"
            >
              {{ isLoggedIn ? $t('buttons.depositNow') : $t('buttons.register') }}
            </button>
          </div>
        </div>
      </Slider>
    </div>
    <div class="Hero-Footer">
      <!--      <GamesSlider-->
      <!--        class="Hero-Winners GamesSlider&#45;&#45;winners"-->
      <!--        :items="winners"-->
      <!--        :slider-options="winnersSliderOptions"-->
      <!--        title="Last winners"-->
      <!--      />-->
      <div class="Advantages Hero-Advantages">
        <div class="Advantages-Item">
          <div class="Advantages-Icon">
            <img src="@/assets/img/fast.svg" alt="" />
          </div>
          <div class="Advantages-Content">
            <div class="Advantages-Title">{{ $t('homepage.advantages.first.highlighted') }}</div>
            <div class="Advantages-Text">{{ $t('homepage.advantages.first.ghost') }}</div>
          </div>
        </div>
        <div class="Advantages-Item">
          <div class="Advantages-Icon">
            <img src="@/assets/img/support.svg" alt="" />
          </div>
          <div class="Advantages-Content">
            <div class="Advantages-Title">{{ $t('homepage.advantages.second.highlighted') }}</div>
            <div class="Advantages-Text">{{ $t('homepage.advantages.second.ghost') }}</div>
          </div>
        </div>
        <div class="Advantages-Item">
          <div class="Advantages-Icon">
            <img src="@/assets/img/games.svg" alt="" />
          </div>
          <div class="Advantages-Content">
            <div class="Advantages-Title">{{ $t('homepage.advantages.third.highlighted') }}</div>
            <div class="Advantages-Text">{{ $t('homepage.advantages.third.ghost') }}</div>
          </div>
        </div>
        <div class="Advantages-Item">
          <div class="Advantages-Icon">
            <img src="@/assets/img/providers.svg" alt="" />
          </div>
          <div class="Advantages-Content">
            <div class="Advantages-Title">{{ $t('homepage.advantages.fourth.highlighted') }}</div>
            <div class="Advantages-Text">{{ $t('homepage.advantages.fourth.ghost') }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import GamesSlider from '@/components/GamesSlider';
import { mapGetters, mapMutations, mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';
import Slider from '@/components/Slider';

export default {
  name: 'Hero',
  components: {
    // GamesSlider,
    Slider,
  },
  mixins: [showAuthDialog],
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
    ...mapState(['navIsOpen', 'games', 'depositNum', 'width']),
    ...mapGetters(['isLoggedIn']),
    slides() {
      const slides = [
        {
          bg: 'wolf',
          title: this.$t('homepage.heroBanner.deposit1.title'),
          text: this.$t('homepage.heroBanner.deposit1.text'),
          btnText: 'Deposit now',
        },
        {
          bg: 'joker',
          title: this.$t('homepage.heroBanner.deposit1.title'),
          text: this.$t('homepage.heroBanner.deposit1.text'),
          btnText: 'Deposit now',
        },
        {
          bg: 'aztec',
          title: this.$t('homepage.heroBanner.deposit2.title'),
          text: this.$t('homepage.heroBanner.deposit2.text'),
          btnText: 'Deposit now',
        },
        {
          bg: 'book',
          title: this.$t('homepage.heroBanner.deposit3.title'),
          text: this.$t('homepage.heroBanner.deposit3.text'),
          btnText: 'Deposit now',
        },
        {
          bg: 'tournaments',
          title: this.$t('homepage.heroBanner.deposit4.title'),
          text: this.$t('homepage.heroBanner.deposit4.text'),
          btnText: 'Deposit now',
        },
        {
          bg: 'highroller',
          title: this.$t('homepage.heroBanner.highroller.title'),
          text: this.$t('homepage.heroBanner.highroller.text'),
        },
        {
          bg: 'dropsBanner',
          title: this.$t('promotions.dropsWins.title'),
          text: `<span class="Colored">${this.$t('dropsWins.prize')}</span>`,
          url: '/tournaments/drops-wins',
          linkText: this.$t('buttons.more'),
        },
        {
          bg: 'footballBanner',
          title: this.$t('promotions.knockoutFootball.title'),
          text: `<span class="Colored">${this.$t('knockoutFootball.prize')}</span>`,
          url: '/tournaments/knockout-football',
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
  },
};
</script>

<style lang="scss">
.Advantages {
  display: flex;
  justify-content: space-between;

  &-Item {
    display: flex;
    align-items: center;
  }

  &-Icon {
    margin-right: 14px;
  }

  &-Title {
    margin-bottom: 5px;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.24;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      font-size: 8px;
    }

    @media (min-width: $screen-l) {
      font-size: 10px;
    }

    @media (min-width: $screen-xl) {
      font-size: 11px;
    }
  }

  &-Text {
    font-size: 11px;
    font-weight: 700;
    line-height: 1.24;
    color: var(--color-text-ghost);
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      font-size: 8px;
    }

    @media (min-width: $screen-l) {
      font-size: 10px;
    }

    @media (min-width: $screen-xl) {
      font-size: 11px;
    }
  }
}

.Hero {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin-top: -75px;
  margin-bottom: 26px;
  padding-right: 0;
  padding-left: 0;

  @media (min-width: $screen-m) {
    margin-bottom: 32px;
  }

  @media (min-width: $screen-l) {
    margin-bottom: 60px;
  }

  @media (min-width: $screen-xl) {
    margin-bottom: 85px;
  }

  &-Slider {
    position: relative;
    margin-bottom: 12px;

    @media (min-width: $screen-m) {
      margin-bottom: 0;
    }

    .v_slider__dots li {
      padding: 7px;

      @media (min-width: $screen-xs) {
        padding: 9px;
      }
    }

    .v_slider__dots li span {
      width: 6px;
      height: 6px;

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
        top: 190px;
        bottom: initial;
        left: 180px;
        transform: none;
      }

      @media (min-width: $screen-m) {
        top: 240px;
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

    @media (min-width: $screen-l) {
      height: 640px;
    }
  }

  &-Content {
    position: absolute;
    top: 53%;
    left: 16px;
    text-align: left;

    @media (min-width: $screen-xs) {
      top: 58%;
    }

    @media (min-width: $screen-s) {
      top: 0;
    }

    &--centered {
      width: calc(100% - 32px);
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

  &-Advantages {
    display: none;

    @media (min-width: $screen-m) {
      display: flex;
      flex-grow: 1;
    }
  }
}
</style>
