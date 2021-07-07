<template>
  <section v-if="tournaments[$route.params.tournament]" class="Page Page--full DailyTournamentPage">
    <GameModals />
    <div
      class="Page-Header DailyTournamentPage-Header"
      :class="`${tournaments[$route.params.tournament].class}-Header`"
    >
      <div class="Wrapper">
        <div
          class="DailyTournamentPage-MainText"
          :class="{
            'DailyTournamentPage-MainText--left': tournaments[$route.params.tournament].textLeft,
          }"
        >
          <h1
            v-if="tournaments[$route.params.tournament].title"
            class="Title Title--type-h1 Title--color1 DailyTournamentPage-Title"
            v-html="tournaments[$route.params.tournament].title"
          ></h1>
          <h1
            v-else
            class="Title Title--type-h1 Title--color1 DailyTournamentPage-Title"
            v-html="$t(`${tournaments[$route.params.tournament].translates}.title`)"
          ></h1>
          <div
            v-if="$t(`${tournaments[$route.params.tournament].translates}.prize`)"
            class="DailyTournamentPage-Subtitle"
          >
            {{ $t(`${tournaments[$route.params.tournament].translates}.prize`) }}
          </div>
          <div
            v-if="width > 960"
            class="Text Text--additional DailyTournamentPage-Text"
            v-html="$t(`${tournaments[$route.params.tournament].translates}.text`)"
          ></div>
          <div
            v-else
            class="Text Text--additional DailyTournamentPage-Text"
            v-html="$t(`${tournaments[$route.params.tournament].translates}.textMobile`)"
          ></div>
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
                <div class="DailyTournamentPage-BenefitName">1 week</div>
                <div class="DailyTournamentPage-BenefitAdditional">Duration</div>
              </div>
            </div>
            <div class="DailyTournamentPage-Benefit">
              <img src="@/assets/img/flower.svg" class="DailyTournamentPage-BenefitIcon" alt="" />
              <div>
                <div class="DailyTournamentPage-BenefitName">
                  <span class="Colored">1 000 eur</span>
                </div>
                <div class="DailyTournamentPage-BenefitAdditional">Prize pool</div>
              </div>
            </div>
            <div class="DailyTournamentPage-Benefit">
              <img src="@/assets/img/flower.svg" class="DailyTournamentPage-BenefitIcon" alt="" />
              <div>
                <div class="DailyTournamentPage-BenefitName">5 eur</div>
                <div class="DailyTournamentPage-BenefitAdditional">Bets per point</div>
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
            <Loader v-if="tournamentResultIsLoading" />
            <div v-else class="DailyTournamentPage-Table">
              <div class="Table TableBordered">
                <div class="Table-Row">
                  <div class="Table-Cell TableBordered-Cell TableBordered-Th">#</div>
                  <div class="Table-Cell TableBordered-Cell TableBordered-Th">Name</div>
                  <div class="Table-Cell TableBordered-Cell TableBordered-Th">Points</div>
                  <div class="Table-Cell TableBordered-Cell TableBordered-Th">Prize</div>
                </div>
                <div
                  v-for="(winner, i) in tournamentResult.awards"
                  :key="winner.id"
                  class="Table-Row"
                >
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
        <div class="DailyTournamentPage-SliderSection">
          <Loader v-if="tournamentGamesAreLoading" />
          <SectionsSlider
            v-else
            :key="width"
            class="SectionsSlider"
            :items="tournamentGames"
            :slider-options="sliderOptions"
            :items-in-screen="itemsInScreen"
            section-class="DailyTournamentPage-Games"
            :title="$t('tournaments.games')"
          />
        </div>
      </div>
      <h2 class="Title Title--type-h2 Page-Subtitle DailyTournamentPage-Subtitle">
        {{ $t('tournaments.terms') }}
      </h2>
      <div class="Page-Blocks DailyTournamentPage-Terms">
        <div
          v-for="(item, i) in $t(`${tournaments[$route.params.tournament].translates}.terms`)"
          :key="`txt${i}`"
          class="Page-Block"
        >
          <div class="Page-Number">{{ i + 1 }}.</div>
          <div>
            <div v-if="item.title" class="DailyTournamentPage-TermsTitle" v-html="item.title"></div>
            <div class="Text Text--additional" v-html="item.text"></div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import showAuthDialog from '@/mixins/showAuthDialog';
import { mapState, mapActions } from 'vuex';
import Loader from '@/components/Loader';
import SectionsSlider from '@/components/SectionsSlider';
import { TOURNAMENTS } from '@/config';
import GameModals from '@/components/GameModals';

export default {
  name: 'DailyTournamentPage',
  components: {
    Loader,
    SectionsSlider,
    GameModals,
  },
  mixins: [showAuthDialog],
  layout: 'page',
  data() {
    return {
      tournaments: TOURNAMENTS,
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
  head() {
    return {
      title: 'Daily Tournament At Ninecasino And Other Similar Events',
      meta: [
        {
          description:
            'On this page, you will find detailed information about the tournaments held by the gaming website. List of winners and terms and conditions of the events',
        },
      ],
    };
  },
  computed: {
    ...mapState(['width']),
    ...mapState('games', [
      'tournamentGames',
      'tournamentGamesAreLoading',
      'tournamentResult',
      'tournamentResultIsLoading',
    ]),
    itemsInScreen() {
      if (this.width >= 960) return 9;
      if (this.width < 960 && this.width >= 768) return 12;
      return 8;
    },
  },
  created() {
    this.getTournamentList();
    this.getTournamentResult({ tournamentId: '227904535263860741' });
    if (this.tournaments[this.$route.params.tournament])
      this.getTournamentGames({ category: this.tournaments[this.$route.params.tournament].slug });
    else this.$router.push(this.localePath('/404'));
  },
  methods: {
    ...mapActions('games', ['getTournamentGames', 'getTournamentList', 'getTournamentResult']),
  },
};
</script>

<style lang="scss">
.DailyTournamentPage {
  &-MainText {
    display: block;
    text-align: center;

    @media (min-width: $screen-s) {
      padding-left: 50%;
      text-align: left;

      &--left {
        max-width: 40%;
        padding-left: 0;
      }
    }
  }

  &-Title {
    margin-bottom: 11px;

    @media (min-width: $screen-m) {
      margin-bottom: 15px;
    }
  }

  &-Subtitle {
    margin-bottom: 18px;
    font-size: 18px;
    font-weight: 700;
    color: var(--color-text-main);

    @media (min-width: $screen-m) {
      margin-bottom: 25px;
      font-size: 22px;
    }

    @media (min-width: $screen-l) {
      font-size: 30px;
    }

    @media (min-width: $screen-xl) {
      font-size: 36px;
    }
  }

  &-Text {
    margin-bottom: 20px;

    @media (min-width: $screen-s) {
      margin-bottom: 30px;
      text-align: left;
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

  &-SliderSection {
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
    align-content: flex-start;
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

    @media (min-width: $screen-xl) {
      margin-bottom: 80px;
    }
  }

  &-TermsTitle {
    margin-bottom: 5px;
    font-weight: 600;
    color: var(--color-text-main);
  }
}

.MayMadness {
  &-Header {
    width: 100%;
    margin-bottom: 22px;
    padding-top: 183px / 320px * 100%;
    background-image: url(~@/assets/img/madness_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: calc(100% - 32px) auto;

    @media (min-width: $screen-xs) {
      padding-top: 200px / 320px * 100%;
    }

    @media (min-width: $screen-s) {
      padding-top: 0;
      background-image: url(~@/assets/img/madness_600.png);
      background-position: center left;
    }

    @media (min-width: $screen-m) {
      background-position: center center;
      background-size: auto auto;
    }

    @media (min-width: $screen-l) {
      background-image: url(~@/assets/img/madness_900.png);
    }

    @media (min-width: $screen-xl) {
      padding-top: 50px;
      background-image: url(~@/assets/img/madness_1248.png);
    }

    .DailyTournamentPage-MainText {
      @media (min-width: $screen-s) {
        max-width: 46%;
      }
    }
  }
}

.KnockoutFootball {
  &-Header {
    width: 100%;
    margin-bottom: 22px;
    padding-top: 280px / 320px * 100%;
    background-image: url(~@/assets/img/football_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: contain;

    @media (min-width: $screen-s) {
      padding-top: 0;
      background-image: url(~@/assets/img/football_600.png);
      background-position: center center;
      //background-size: auto auto;
    }

    @media (min-width: $screen-m) {
      background-image: url(~@/assets/img/footballBanner_900.png);
    }

    @media (min-width: $screen-l) {
      background-image: url(~@/assets/img/footballBanner_1248.png);
    }

    @media (min-width: $screen-xl) {
      padding-top: 50px;
      background-image: url(~@/assets/img/footballBanner_1920.png);
    }

    .DailyTournamentPage-MainText {
      @media (min-width: $screen-s) {
        max-width: 40%;
      }
    }
  }
}

.DropsWinsSlots {
  &-Header {
    width: 100%;
    margin-top: -70px;
    margin-bottom: 22px;
    padding-top: 270px / 320px * 100%;
    background-image: url(~@/assets/img/dropsSlots_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: calc(100% - 32px) auto;

    @media (min-width: $screen-s) {
      margin-top: 0;
      padding-top: 50px / 1248px * 100%;
      background-image: url(~@/assets/img/dropsSlots_900.png);
      background-position: center top;
    }

    @media (min-width: $screen-xl) {
      padding-top: 60px;
    }

    @media (min-width: $screen-xxl) {
      background-image: url(~@/assets/img/dropsSlots_1920.png);
    }

    .DailyTournamentPage-MainText {
      @media (min-width: $screen-s) {
        max-width: 35%;
      }
    }
  }
}

.DropsWinsLive {
  &-Header {
    width: 100%;
    margin-top: -70px;
    margin-bottom: 22px;
    padding-top: 270px / 320px * 100%;
    background-image: url(~@/assets/img/dropsLive_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: calc(100% - 32px) auto;

    @media (min-width: $screen-s) {
      margin-top: 0;
      padding-top: 80px / 1248px * 100%;
      background-image: url(~@/assets/img/dropsLive_900.png);
      background-position: center center;
    }

    @media (min-width: $screen-m) {
      padding-top: 50px / 1248px * 100%;
    }

    @media (min-width: $screen-xl) {
      padding-top: 120px;
      background-image: url(~@/assets/img/dropsLive_1248.png);
    }

    @media (min-width: $screen-xxl) {
      background-image: url(~@/assets/img/dropsLive_1920.png);
    }

    .DailyTournamentPage-MainText {
      @media (min-width: $screen-s) {
        max-width: 35%;
      }
    }
  }
}
</style>
