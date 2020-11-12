<template>
  <section class="Hero">
    <div class="Hero-Slider">
      <div class="Hero-Item">
        <picture class="Hero-Image">
          <source media="(max-width: 460px)" :srcset="require('@/assets/img/hero-bg-joker_mobile.png')">
          <source media="(max-width: 768px)" :srcset="require('@/assets/img/hero-bg-joker_768.jpg')">
          <source media="(max-width: 960px)" :srcset="require('@/assets/img/hero-bg-joker_960.jpg')">
          <source media="(max-width: 1248px)" :srcset="require('@/assets/img/hero-bg-joker.jpg')">
          <img srcset="@/assets/img/joker_1920.jpg" alt="">
        </picture>
        <div class="Hero-Content">
          <div class="Title Title--type-h1 Hero-Title">
            Sign up <span class="Colored">&</span> get <br/>
            welcome<br>
            bonus
          </div>
          <div class="Hero-Text">
            €100 <span class="Colored">+</span> 55 Free  Spins
          </div>
          <button class="Btn Hero-Btn" @click="onClickBtn()">
            {{ isLoggedIn ? 'Deposit now' : 'Sign up'}}
          </button>
        </div>
      </div>
      <nav class="Hero-Nav">
        <button class="Hero-NavItem" @click="toggleNav()">
          <svg class="Hero-NavIcon Toggle Toggle--colored">
            <use xlink:href="@/assets/img/icons.svg#toggle"></use>
          </svg>
          <div class="Hero-NavName">
            Menu
          </div>
        </button>
        <router-link class="Hero-NavItem" to="/">
          <svg width="17" height="16">
            <use xlink:href="@/assets/img/icons.svg#promotions"></use>
          </svg>
          <div class="Hero-NavName">
            Promotions
          </div>
        </router-link>
        <router-link class="Hero-NavItem" to="/">
          <svg width="18" height="15" >
            <use xlink:href="@/assets/img/icons.svg#deposit"></use>
          </svg>
          <div class="Hero-NavName">
            Deposit
          </div>
        </router-link>
        <router-link class="Hero-NavItem" to="/">
          <svg width="16" height="14">
            <use xlink:href="@/assets/img/icons.svg#support"></use>
          </svg>
          <div class="Hero-NavName">
            Support
          </div>
        </router-link>
      </nav>
    </div>
    <div class="Hero-Footer">
      <GamesSlider class="Hero-Winners" :items="winners" title="Last winners" />
      <div class="Advantages Hero-Advantages">
        <div class="Advantages-Item">
          <div class="Advantages-Icon">
            <img src="@/assets/img/fast.svg" alt="">
          </div>
          <div class="Advantages-Content">
            <div class="Advantages-Title">
              € 6.483.67
            </div>
            <div class="Advantages-Text">
              Fast Payouts
            </div>
          </div>
        </div>
        <div class="Advantages-Item">
          <div class="Advantages-Icon">
            <img src="@/assets/img/support.svg" alt="">
          </div>
          <div class="Advantages-Content">
            <div class="Advantages-Title">
              24/7
            </div>
            <div class="Advantages-Text">
              Support
            </div>
          </div>
        </div>
        <div class="Advantages-Item">
          <div class="Advantages-Icon">
            <img src="@/assets/img/games.svg" alt="">
          </div>
          <div class="Advantages-Content">
            <div class="Advantages-Title">
              250 K
            </div>
            <div class="Advantages-Text">
              Games
            </div>
          </div>
        </div>
        <div class="Advantages-Item">
          <div class="Advantages-Icon">
            <img src="@/assets/img/providers.svg" alt="">
          </div>
          <div class="Advantages-Content">
            <div class="Advantages-Title">
              1250K
            </div>
            <div class="Advantages-Text">
              Top providers
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueSlider from '@/components/homepage/Slider.vue';
import GamesSlider from '@/components/GamesSlider.vue';
import { mapMutations, mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'Hero',
  components: {
    GamesSlider,
  },
  mixins: [showAuthDialog],
  data() {
    return {
      options: {
        items: 1,
        loop: true,
        dots: true,
      },
      // slides: [
      //   {
      //     bg: 'hero-bg.jpg',
      //     title: 'Number one place to have fun!',
      //     text: `Make first deposit now and get 100%<br/>
      //           up to <span class="Colored Hero--colored">€100 + 55 Free  Spins</span>`,
      //     btnText: 'Deposit now',
      //   },
      //   {
      //     bg: 'hero-bg.jpg',
      //     title: 'Number one place to have fun!',
      //     text: `Make first deposit now and get 100%<br/>
      //           up to <span class="Colored Hero--colored">€100 + 55 Free  Spins</span>`,
      //     btnText: 'Deposit now',
      //   },
      // ],
      winners: [
        {
          imgUrl: 'https://static.egamings.com/games/thunderkick/sword_of_khans.jpg',
          badge: 'best',
          sum: '€ 11.574.60',
          text: 'Wild98 just won',
        },
        {
          imgUrl: 'https://static.egamings.com/games/thunderkick/ravens_eye.jpg',
          badge: 'best',
          sum: '€ 8.200.66',
          text: 'Luliana just won',
        },
        {
          imgUrl: 'https://static.egamings.com/games/thunderkick/well_of_wonders.jpg',
          badge: 'best',
          sum: '€ 6.483.67',
          text: 'Farisha just won',
        },
        {
          imgUrl: 'https://static.egamings.com/games/thunderkick/jin_chans_pond_of_riches.jpg',
          badge: 'best',
          sum: '€ 8.200.66',
          text: 'Luliana just won',
        },
        {
          imgUrl: 'https://static.egamings.com/games/thunderkick/midas_golden_touch.jpg',
          badge: 'best',
          sum: '€ 6.483.67',
          text: 'Farisha just won',
        },
        {
          imgUrl: 'https://static.egamings.com/games/thunderkick/riders_of_the_storm.jpg',
          badge: 'best',
          sum: '€ 11.574.60',
          text: 'Wild98 just won',
        },
      ],
    };
  },
  computed: {
    ...mapState(['navIsOpen', 'games']),
  },
  methods: {
    ...mapMutations(['openNav', 'closeNav']),
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

    @media(min-width: $screen-m) {
      font-size: 8px;
    }

    @media(min-width: $screen-l) {
      font-size: 10px;
    }

    @media(min-width: $screen-xl) {
      font-size: 11px;
    }
  }

  &-Text {
    font-size: 11px;
    font-weight: 700;
    line-height: 1.24;
    text-transform: uppercase;
    color: var(--color-text-ghost);

    @media(min-width: $screen-m) {
      font-size: 8px;
    }

    @media(min-width: $screen-l) {
      font-size: 10px;
    }

    @media(min-width: $screen-xl) {
      font-size: 11px;
    }
  }
}

.Hero {
  position: relative;
  max-width: 100%;
  width: 100%;
  margin-top: -75px;
  margin-bottom: 26px;
  padding-left: 0;
  padding-right: 0;

  @media(min-width: $screen-m) {
    margin-bottom: 32px;
  }

  @media(min-width: $screen-l) {
    margin-bottom: 60px;
  }

  @media(min-width: $screen-xl) {
    margin-bottom: 85px;
  }

  &-Slider {
    position: relative;
    margin-bottom: 12px;

    @media(min-width: $screen-m) {
      margin-bottom: 0;
    }

    .v_slider__dots {
      position: absolute;
      left: 180px;
      bottom: 70px;
      width: auto;

      @media(min-width: $screen-xs) {
        top: 220px;
        bottom: initial;
      }

      @media(min-width: $screen-m) {
        top: 240px;
      }

      @media(min-width: $screen-l) {
        top: 290px;
        left: 200px;
      }

      @media(min-width: $screen-xl) {
        top: 360px;
        left: calc(50% - 364px);
      }
    }
  }

  &-Item {
    position: relative;
    height: 100%;
    overflow: hidden;

    @media(min-width: $screen-l) {
      height: 640px;
    }
  }

  &-Content {
    position: absolute;
    left: 16px;
    bottom: 80px;
    text-align: left;

    @media(min-width: $screen-xs) {
      top: 70px;
      bottom: initial;
    }

    @media(min-width: $screen-m) {
      top: 74px;
    }

    @media(min-width: $screen-l) {
      top: 96px;
    }

    @media(min-width: $screen-xl) {
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
      height: 100%;
      object-fit: cover;
    }
  }

  &-Title {
    margin-bottom: 9px;

    @media(min-width: $screen-l) {
      margin-bottom: 12px;
    }
  }

  &-Text {
    margin-bottom: 18px;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.37;
    text-transform: uppercase;
    color: var(--color-text-main);

    @media(min-width: $screen-m) {
      margin-bottom: 16px;
    }

    @media(min-width: $screen-l) {
      font-size: 22px;
    }

    @media(min-width: $screen-xl) {
      margin-bottom: 24px;
      font-size: 28px;
    }
  }

  &-Nav {
    position: absolute;
    left: 0;
    bottom: 14px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;

    @media(min-width: $screen-xs) {
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
    text-transform: uppercase;
    color: var(--color-text-main);
  }

  &-Footer {
    padding: 0 16px;
    max-width: 100%;

    @media(min-width: $screen-m) {
      position: absolute;
      left: calc(50% - 608px);
      right: calc(50% - 608px);
      bottom: 0;
      display: flex;
      align-items: flex-end;
      margin: 0 auto;
    }

    @media(min-width: $screen-xl) {
      max-width: 1248px;
      padding: 0;
    }
  }

  &-Winners {
    @media(min-width: $screen-m) {
      margin-right: 28px;
    }

    @media(min-width: $screen-l) {
      margin-right: 48px;
    }

    @media(min-width: $screen-xl) {
      margin-right: 114px;
    }
  }

  &-Advantages {
    display: none;

    @media(min-width: $screen-m) {
      display: flex;
      flex-grow: 1;
    }
  }
}
</style>
