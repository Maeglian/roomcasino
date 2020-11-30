<template>
  <section class="Jackpots">
    <div class="Wrapper Jackpots-Wrapper">
      <div class="Jackpots-Daily">
        <div class="Title Title--type-h1 Jackpots-Title">
          Our <span class="Colored">Jackpot</span> <br/>
          in Roomcasino
        </div>
        <GamesSlider
          class="Jackpots-Winners GamesSlider--winners"
          :items="jackpots"
          :sliderOptions="winnersSliderOptions"
          title="Daily jackpots"
        />
      </div>
      <div class="Jackpots-Mega">
        <div class="Jackpots-Text">
          Mega jackpot
        </div>
        <div class="Jackpots-Sum">
          € 11.574.600
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GamesSlider from '@/components/GamesSlider.vue';

export default {
  name: 'Jackpots',
  components: {
    GamesSlider,
  },
  data() {
    return {
      jackpots: [
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/falcon_huntress.jpg',
          badge: 'best',
          sum: '€ 11.574.60',
          text: 'Wild98 just won',
        },
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/crystal_quest_1_deep_jungle.jpg',
          badge: 'best',
          sum: '€ 8.200.66',
          text: 'Luliana just won',
        },
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/tiger_rush.jpg',
          badge: 'best',
          sum: '€ 6.483.67',
          text: 'Farisha just won',
        },
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/beat_the_beast_krakens_lair.jpg',
          badge: 'best',
          sum: '€ 11.574.60',
          text: 'Wild98 just won',
        },
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/pink_elephants_2.jpg',
          badge: 'best',
          sum: '€ 8.200.66',
          text: 'Luliana just won',
        },
        {
          imageUrl: 'https://static.egamings.com/games/thunderkick/spectra.jpg',
          badge: 'best',
          sum: '€ 6.483.67',
          text: 'Farisha just won',
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
};
</script>

<style lang="scss">
.Jackpots {
  max-width: 100%;
  margin-bottom: 30px;
  padding: 20px 0;
  background-image: url('../../assets/img/jackpot-bg_460.png');
  background-position: right top;
  background-size: auto 100%;
  background-repeat: no-repeat;

  @media(min-width: $screen-m) {
    padding: 46px 0;
    margin-bottom: 38px;
    background-image: url('../../assets/img/jackpot-bg_768.png');
  }

  @media(min-width: $screen-l) {
    padding: 50px 0 50px 0;
    background-image: url('../../assets/img/jackpot-bg_960.png');
  }

  @media(min-width: $screen-xl) {
    margin-bottom: 80px;
    padding: 90px 0 90px 0;
    background-image: url('../../assets/img/jackpot-bg_1248.png');
  }

  @media(min-width: $screen-xxxl) {
    background-image: url('../../assets/img/jackpot-bg_1920.png');
  }

  &-Wrapper {
    display: flex;
    flex-direction: column;

    @media(min-width: $screen-m) {
      flex-direction: row;
      align-items: center;
    }
  }

  &-Title {
    margin-bottom: 14px;

    @media(min-width: $screen-l) {
      margin-bottom: 24px;
    }

    @media(min-width: $screen-xl) {
      margin-bottom: 30px;
    }
  }

  &-Winners {
    @media(min-width: $screen-m) {
      margin-right: 64px;
    }

    @media(min-width: $screen-l) {
      margin-right: 86px;
    }

    @media(min-width: $screen-xl) {
      margin-right: 126px;
    }
  }

  &-Mega {
    position: relative;
    flex-grow: 1;
    order: 0;
    padding: 17px 10px;
    margin-bottom: 24px;
    text-align: center;

    border: 28px solid var(--color-main1);
    border-image-source: url(../../assets/img/dotted-border.png);
    border-image-repeat: repeat;
    border-image-slice: 209 223;
    border-image-width: 20px;

    @media(min-width: $screen-m ) {
      border-width: 9px;
    }

    @media(min-width: $screen-xs) {
      border-image-slice: 214 223;
      border-image-width: 25px;
    }

    @media(min-width: $screen-s) {
      border-image-slice: 218 219;
      border-image-width: 27px;
    }

    @media(min-width: $screen-m) {
      border-image-slice: 197 200;
      border-image-width: 24px;
    }

    @media(min-width: $screen-l) {
      padding: 22px 10px;
      border-width: 13px;
    }

    @media(min-width: $screen-xl) {
      padding: 35px 10px;
      border-width: 18px;

      border-image-slice: 230 232;
      border-image-width: 47px;
    }
  }

  &-Daily {
    order: 1;

    @media(min-width: $screen-m) {
      order: 0;
    }
  }

  &-Text {
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--color-text-main);

    @media(min-width: $screen-l) {
      font-size: 20px;
    }

    @media(min-width: $screen-xl) {
      font-size: 24px;
    }
  }

  &-Sum {
    font-size: 36px;
    font-weight: 800;
    color: var(--color-main1);
    white-space: nowrap;

    @media(min-width: $screen-m) {
      font-size: 40px;
    }

    @media(min-width: $screen-l) {
      font-size: 62px;
    }

    @media(min-width: $screen-xl) {
      font-size: 84px;
    }
  }
}
</style>
