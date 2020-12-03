<template>
  <section class="Page Page--full DailyTournamentPage">
    <div class="Page-Header DailyTournamentPage-Header">
      <div class="Wrapper">
        <h1 class="Title Title--type-h1 Page-Title DailyTournamentPage-Title">
          Daily tournament
        </h1>
        <div class="Page-Text Text Text--additional DailyTournamentPage-Text">
          <template v-if="width >= 768">
            Roomcasino is constantly working to deliver the best promotions.<br />
            We use the latest technology and the feedback from our players to re-design our
            promotions. Enjoy!
          </template>
          <template v-else>
            Roomcasino is constantly working to deliver the best promotions. Enjoy!
          </template>
        </div>
        <div class="DailyTournamentPage-Bonus">
          € 500 <span class="Colored">+</span> 500 Free Spins
        </div>
        <div class="DailyTournamentPage-Promotion">
          <div class="DailyTournamentPage-Deposit">
            <button class="Btn Btn--common DailyTournamentPage-Btn" @click="onClickBtn()">
              {{ isLoggedIn ? 'Deposit' : 'Sign up' }}
            </button>
            <Counter enddate="2020-12-31" />
          </div>
          <div class="DailyTournamentPage-Benefits">
            <div class="DailyTournamentPage-Benefit">
              <img src="@/assets/img/flower.svg" class="DailyTournamentPage-BenefitIcon" alt="" />
              <div>
                <div class="DailyTournamentPage-BenefitName">
                  1 week
                </div>
                <div class="DailyTournamentPage-BenefitAdditional">
                  Duration
                </div>
              </div>
            </div>
            <div class="DailyTournamentPage-Benefit">
              <img src="@/assets/img/flower.svg" class="DailyTournamentPage-BenefitIcon" alt="" />
              <div>
                <div class="DailyTournamentPage-BenefitName">
                  <span class="Colored">1 000 eur</span>
                </div>
                <div class="DailyTournamentPage-BenefitAdditional">
                  Prize pool
                </div>
              </div>
            </div>
            <div class="DailyTournamentPage-Benefit">
              <img src="@/assets/img/flower.svg" class="DailyTournamentPage-BenefitIcon" alt="" />
              <div>
                <div class="DailyTournamentPage-BenefitName">
                  5 eur
                </div>
                <div class="DailyTournamentPage-BenefitAdditional">
                  Bets per point
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="DailyTournamentPage-Content">
      <div class="DailyTournamentPage-Row">
        <div class="DailyTournamentPage-Winners">
          <BaseTabs
            class="DailyTournamentPage-Tabs"
            :items="tabs"
            :current-item="round"
            @choose-tab="round = $event"
          />
          <div class="DailyTournamentPage-WinnersTable">
            <Loader v-if="winnersAreLoading" />
            <div v-else class="DailyTournamentPage-Table">
              <div class="Table TableBordered">
                <div class="Table-Row">
                  <div class="Table-Cell TableBordered-Cell TableBordered-Th">
                    #
                  </div>
                  <div class="Table-Cell TableBordered-Cell TableBordered-Th">
                    Name
                  </div>
                  <div class="Table-Cell TableBordered-Cell TableBordered-Th">
                    Points
                  </div>
                  <div class="Table-Cell TableBordered-Cell TableBordered-Th">
                    Prize
                  </div>
                </div>
                <div v-for="(winner, i) in winners" :key="winner.id" class="Table-Row">
                  <div class="Table-Cell TableBordered-Cell">
                    {{ i + 1 }}
                  </div>
                  <div class="Table-Cell TableBordered-Cell">
                    {{ winner.name }}
                  </div>
                  <div class="Table-Cell TableBordered-Cell">
                    {{ winner.points }}
                  </div>
                  <div class="Table-Cell TableBordered-Cell DailyTournamentPage-Prize">
                    {{ winner.prize }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SectionsSlider
          class="DailyTournamentPage-Slider GamesSlider"
          :items="games"
          :slider-options="sliderOptions"
          :items-in-screen="itemsInScreen"
          section-class="DailyTournamentPage-Games"
          title="Games in this tournament"
        />
      </div>
      <h2 class="Title Title--type-h2 Page-Subtitle DailyTournamentPage-Subtitle">
        Agreement to these terms
      </h2>
      <div class="Page-Blocks DailyTournamentPage-Terms">
        <div v-for="(item, i) in terms" :key="`txt${i}`" class="Page-Block">
          <div class="Page-Number">{{ i + 1 }}.</div>
          <div class="Text Text--additional" v-html="item"></div>
        </div>
      </div>
      <h2 class="Title Title--type-h2 Page-Subtitle DailyTournamentPage-Subtitle">
        Featured tournaments
      </h2>
      <div class="Page-Cards DailyTournamentPage-Tournaments">
        <article
          v-for="(item, i) in tournaments"
          :key="`tour_${i}`"
          class="PromotionsCard Page-Card"
        >
          <Banner class="PromotionsCard-Banner Banner--withCounter" :image="item.image">
            <template #title>
              <span v-html="item.title"></span>
            </template>
            <template #subtitle>
              <span v-html="item.subtitle"></span>
            </template>
            <template #counter>
              <Counter :enddate="item.enddate" />
            </template>
          </Banner>
          <div class="PromotionsCard-Btns">
            <NuxtLink
              to="#"
              class="Btn Btn--common Btn--dark PromotionsCard-Btn PromotionsCard-Btn--large"
            >
              More Info
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>

<script>
import Counter from '@/components/Counter';
import showAuthDialog from '@/mixins/showAuthDialog';
import BaseTabs from '@/components/base/BaseTabs';
import { mapState } from 'vuex';
import Loader from '@/components/Loader';

const SectionsSlider = () => import('@/components/SectionsSlider.vue');

export default {
  name: 'DailyTournamentPage',
  components: {
    Counter,
    BaseTabs,
    Loader,
    SectionsSlider,
  },
  mixins: [showAuthDialog],
  layout: 'page',
  data() {
    return {
      winnersToShow: 10,
      tabs: [
        {
          value: 'current',
          name: 'Current winners',
        },
        {
          value: 'prev',
          name: 'Previous winners',
        },
      ],
      round: 'current',
      sliderOptions: {
        items: 1,
        loop: true,
        nav: true,
      },
    };
  },
  computed: {
    ...mapState([
      'width',
      'games',
      'winnersAreLoading',
      'currentTournamentWinners',
      'previousTournamentWinners',
      'terms',
      'tournaments',
    ]),
    winners() {
      return this.round === 'current'
        ? this.currentTournamentWinners
        : this.previousTournamentWinners;
    },
    itemsInScreen() {
      if (this.width >= 960) return 9;
      if (this.width < 960 && this.width >= 768) return 12;
      return 8;
    },
  },
};
</script>

<style lang="scss">
.DailyTournamentPage {
  &-Header {
    margin-bottom: 46px;
    padding-top: 172px / 320px * 100%;
    padding-bottom: 0;
    text-align: center;
    background-image: url(../assets/img/daily-tournament-bg_460.png);
    background-repeat: no-repeat;
    background-position: top right;
    background-size: 100% auto;

    @media (min-width: $screen-s) {
      padding-top: 60px;
      text-align: initial;
      background-image: url(../assets/img/daily-tournament-bg_768.png);
      background-size: cover;
    }

    @media (min-width: $screen-m) {
      margin-bottom: 122px;
      padding-top: 123px;
      background-size: auto auto;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 81px;
      background-image: url(../assets/img/daily-tournament-bg_960.png);
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 115px;
      padding-top: 147px;
      background-image: url(../assets/img/daily-tournament-bg_1248.png);
    }

    @media (min-width: $screen-xxl) {
      background-image: url(../assets/img/daily-tournament-bg_1920.png);
      background-size: contain;
    }
  }

  &-Title {
    margin-bottom: 9px;

    @media (min-width: $screen-s) {
      text-align: left;
    }

    @media (min-width: $screen-m) {
      margin-bottom: 16px;
      text-align: left;
    }
  }

  &-Text {
    margin-bottom: 20px;

    @media (min-width: $screen-s) {
      margin-right: 0;
      margin-left: 0;
      padding: 0;
      text-align: left;
    }

    @media (min-width: $screen-m) {
      margin-bottom: 30px;
    }
  }

  &-Bonus {
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-main);

    @media (min-width: $screen-m) {
      margin-bottom: 36px;
      font-size: 14px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 24px;
      font-size: 18px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 71px;
      font-size: 20px;
    }
  }

  &-Promotion {
    position: relative;

    @media (min-width: $screen-m) {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
  }

  &-Btn {
    width: 100%;
    margin-bottom: 23px;

    @media (min-width: $screen-s) {
      width: 168px;
      margin-right: 20px;
      margin-bottom: 0;
      text-align: left;
    }
  }

  &-Deposit {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: $screen-s) {
      flex-direction: row;
      align-items: center;
    }
  }

  &-Benefits {
    display: none;

    @media (min-width: $screen-m) {
      position: absolute;
      right: 0;
      bottom: 0;
      display: block;
    }

    @media (min-width: $screen-xl) {
      position: relative;
      right: auto;
      bottom: auto;
      display: flex;
    }
  }

  &-Benefit {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;

    @media (min-width: $screen-xl) {
      margin-right: 55px;
      margin-bottom: 0;

      &:last-child {
        margin-right: 0;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-BenefitIcon {
    width: 13px;
    margin-right: 10px;

    @media (min-width: $screen-l) {
      width: 17px;
    }

    @media (min-width: $screen-xl) {
      width: 20px;
    }
  }

  &-BenefitName {
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-l) {
      font-size: 20px;
    }
  }

  &-BenefitAdditional {
    font-size: 9px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;

    @media (min-width: $screen-l) {
      font-size: 12px;
    }
  }

  &-Tabs {
    width: 100%;
    margin-bottom: 4px;
    font-size: 11px;
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      font-size: 12px;
    }
  }

  &-Table {
    padding: 21px 10px;
    font-size: 10px;

    @media (min-width: $screen-m) {
      font-size: 12px;
    }
  }

  &-Prize {
    font-size: 11px;
    text-align: right;
    color: var(--color-main1);

    @media (min-width: $screen-m) {
      font-size: 14px;
    }
  }

  &-Winners {
    @media (min-width: $screen-l) {
      width: calc(50% - 10px);
    }

    @media (min-width: $screen-xl) {
      width: calc(50% - 25px);
    }
  }

  &-WinnersTable {
    margin-bottom: 37px;

    @media (min-width: $screen-m) {
      margin-bottom: 55px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 0;
    }
  }

  &-Slider {
    width: 100%;

    @media (min-width: $screen-l) {
      width: calc(50% - 10px);
      margin-top: 25px;
    }

    @media (min-width: $screen-xl) {
      width: calc(50% - 25px);
    }

    //.v_slider, .v_slider__list, .v_slider__track {
    //  height: 100%;
    //}
  }

  &-Games {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    align-content: center;
    //height: 100%;

    @media (min-width: $screen-m) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media (min-width: $screen-l) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  &-Row {
    margin-bottom: 37px;

    @media (min-width: $screen-m) {
      margin-bottom: 41px;
    }

    @media (min-width: $screen-l) {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 80px;
    }
  }

  &-Terms {
    margin-bottom: 37px;

    @media (min-width: $screen-m) {
      margin-bottom: 56px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 60px;
    }

    @media (min-width: $screen-m) {
      margin-bottom: 80px;
    }
  }
}
</style>
