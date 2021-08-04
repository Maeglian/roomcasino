<template>
  <section class="Page Page--full LotteryPage DailyTournamentPage">
    <div class="Page-Header LotteryPage-Header">
      <div class="Wrapper">
        <div class="DailyTournamentPage-MainText">
          <h1
            class="Title Title--type-h1 DailyTournamentPage-Title"
            v-html="$t('lottery.title')"
          ></h1>
          <div class="DailyTournamentPage-Subtitle" v-html="$t('lottery.prize')"></div>
          <div
            class="Text Text--additional2 DailyTournamentPage-Text"
            v-html="$t('lottery.text')"
          ></div>
        </div>
        <div class="DailyTournamentPage-Promotion">
          <div class="DailyTournamentPage-Deposit">
            <button class="Btn Btn--common DailyTournamentPage-Btn" @click="onClickBtn()">
              {{ isLoggedIn ? $t('buttons.deposit') : $t('buttons.signUp') }}
            </button>
            <!--            <Counter :enddate="new Date(tournament.endDateTime * 1000)" />-->
            <Counter :enddate="new Date('2021-08-30')" />
          </div>
        </div>
        <div class="Advantages Advantages--min LotteryPage-Advantages">
          <div class="Advantages-Advantage">
            <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
            <div class="Advantages-AdvantageBlock">
              <div class="Advantages-AdvantageTitle">
                {{ $t('lottery.advantages.text1-highlighted') }}
              </div>
              <div class="Advantages-AdvantageInfo">
                {{ $t('lottery.advantages.text1') }}
              </div>
            </div>
          </div>
          <div class="Advantages-Advantage">
            <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
            <div class="Advantages-AdvantageBlock">
              <div class="Advantages-AdvantageTitle">
                {{ $t('lottery.advantages.text2-highlighted') }}
              </div>
              <div class="Advantages-AdvantageInfo">
                {{ $t('lottery.advantages.text2') }}
              </div>
            </div>
          </div>
          <div class="Advantages-Advantage">
            <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
            <div class="Advantages-AdvantageBlock">
              <div class="Advantages-AdvantageTitle">
                <span class="Colored">
                  {{ $t('lottery.advantages.text3-highlighted') }}
                </span>
              </div>
              <div class="Advantages-AdvantageInfo">
                {{ $t('lottery.advantages.text3') }}
              </div>
            </div>
          </div>
          <div class="Advantages-Advantage">
            <img src="@/assets/img/star-circle.svg" alt="" class="AboutUsPage-AdvantageIcon" />
            <div class="Advantages-AdvantageBlock">
              <div class="Advantages-AdvantageTitle">
                {{ $t('lottery.advantages.text4-highlighted') }}
              </div>
              <div class="Advantages-AdvantageInfo">
                {{ $t('lottery.advantages.text4') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="DailyTournamentPage-Content">
      <div class="LotteryPage-WinnersTables">
        <!--        <Loader v-if="tournamentResultIsLoading" />-->
        <div class="DailyTournamentPage-TableSection">
          <div class="LotteryPage-WinnersTitle">
            {{ $t('tournaments.currentWinners') }}
          </div>
          <div class="DailyTournamentPage-Table LotteryPage-Table Table--scrollable">
            <div class="Table TableBordered">
              <div class="Table-Row">
                <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                  #
                </div>
                <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                  {{ $t('common.name') }}
                </div>
                <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                  {{ $t('common.points') }}
                </div>
                <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                  {{ $t('common.prize') }}
                </div>
              </div>
              <div v-for="(winner, i) in lotteryWinnersList" :key="winner.id" class="Table-Row">
                <div class="Table-Cell TableBordered-Cell">
                  {{ i + 1 }}
                </div>
                <div class="Table-Cell TableBordered-Cell DailyTournamentPage-WinnerNick">
                  {{ winner.nickname }}
                </div>
                <div class="Table-Cell TableBordered-Cell">
                  {{ winner.points }}
                </div>
                <div class="Table-Cell TableBordered-Cell DailyTournamentPage-Prize">
                  <!--                <template-->
                  <!--                  v-if="tournamentAwards.length && i < tournamentAwards[round].awards.length"-->
                  <!--                >-->
                  <!--                  {{ tournamentAwards[round].awards[i].moneyAmount }} {{ tournament.currency }}-->
                  <!--                </template>-->
                  {{ winner.prize }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="DailyTournamentPage-TableSection">
          <div class="LotteryPage-WinnersTitle">
            {{ $t('tournaments.previousRound') }}
          </div>
          <div class="DailyTournamentPage-Table LotteryPage-Table Table--scrollable">
            <div class="Table TableBordered">
              <div class="Table-Row">
                <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                  #
                </div>
                <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                  {{ $t('common.name') }}
                </div>
                <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                  {{ $t('common.points') }}
                </div>
                <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                  {{ $t('common.prize') }}
                </div>
              </div>
              <div v-for="(winner, i) in lotteryWinnersList" :key="winner.id" class="Table-Row">
                <div class="Table-Cell TableBordered-Cell">
                  {{ i + 1 }}
                </div>
                <div class="Table-Cell TableBordered-Cell DailyTournamentPage-WinnerNick">
                  {{ winner.nickname }}
                </div>
                <div class="Table-Cell TableBordered-Cell">
                  {{ winner.points }}
                </div>
                <div class="Table-Cell TableBordered-Cell DailyTournamentPage-Prize">
                  <!--                <template-->
                  <!--                  v-if="tournamentAwards.length && i < tournamentAwards[round].awards.length"-->
                  <!--                >-->
                  <!--                  {{ tournamentAwards[round].awards[i].moneyAmount }} {{ tournament.currency }}-->
                  <!--                </template>-->
                  {{ winner.prize }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="Title Title--type-h2 Page-Subtitle DailyTournamentPage-Subtitle">
        {{ $t('lottery.termsTitle') }}
      </h2>
      <div class="Page-Blocks DailyTournamentPage-Terms">
        <div v-for="(item, i) in $t('lottery.terms')" :key="`txt${i}`" class="Page-Block">
          <div class="Page-Number">{{ i + 1 }}.</div>
          <div>
            <div v-if="item.title" class="DailyTournamentPage-TermsTitle" v-html="item.title"></div>
            <div class="Text Text--additional2" v-html="item.text"></div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import showAuthDialog from '@/mixins/showAuthDialog';
import { mapState, mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'DailyTournamentPage',
  components: {},
  mixins: [showAuthDialog],
  layout: 'page',
  data() {
    return {
      winnersToShow: 10,
      round: 0,
      page: 1,
      lotteryWinnersList: [
        {
          nickname: 'Valeria',
          place: 1,
          points: 859,
          prize: '200 EUR',
        },
        {
          nickname: 'dfdf',
          place: 2,
          points: 40,
          prize: '150 EUR',
        },
        {
          nickname: 'Marfa',
          place: 3,
          points: 26,
          prize: '120 EUR',
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
        {
          nickname: 'Pupa',
          place: 4,
          points: 8,
        },
      ],
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
      'tournamentListLoadingStatus',
      'tournamentGames',
      'tournamentGamesAreLoading',
      'tournamentResult',
      'tournamentResultIsLoading',
      'tournamentAwards',
    ]),
    ...mapGetters('games', ['tournaments']),
    tabs() {
      const tabs = [
        {
          value: 0,
          name: this.$t('tournaments.currentWinners'),
        },
      ];
      if (this.tournamentAwards.length > 1)
        tabs.push({
          value: 1,
          name: this.$t('tournaments.previousRound'),
        });

      return tabs;
    },
  },
  watch: {
    tournamentListLoadingStatus: {
      immediate: true,
      handler() {},
    },
    round() {
      this.getTournamentResult({ tournamentId: this.tournamentAwards[this.round].id });
    },
  },
  methods: {
    ...mapActions('games', ['getTournamentGames', 'getTournamentList', 'getTournamentResult']),
    countDuration(startdate, enddate) {
      return moment(enddate).diff(moment(startdate), 'minutes');
    },
  },
};
</script>

<style lang="scss">
.LotteryPage {
  &-Advantages {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    margin-top: 38px;

    @media (min-width: $screen-m) {
      grid-column-gap: 0;
      grid-row-gap: 12px;
      margin-top: 48px;
      margin-bottom: 48px;
    }

    @media (min-width: $screen-l) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-row-gap: 0;
      margin-top: 28px;
      margin-bottom: 35px;
    }

    @media (min-width: $screen-xl) {
      margin-top: 50px;
      margin-bottom: 60px;
    }
  }

  &-Header {
    width: 100%;
    margin-top: -70px;
    margin-bottom: 22px;
    padding-top: 190px / 320px * 100%;
    background-image: url(~@/assets/img/lottery_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: calc(100% - 32px) auto;

    @media (min-width: $screen-s) {
      margin-top: 0;
      padding-top: 18px / 768px * 100%;
      background-image: url(~@/assets/img/lottery_768.png);
    }

    @media (min-width: $screen-l) {
      background-image: url(~@/assets/img/lottery_960.png);
    }

    @media (min-width: $screen-xl) {
      padding-top: 36px;
      background-image: url(~@/assets/img/lottery_1248.png);
    }

    .DailyTournamentPage-MainText {
      @media (min-width: $screen-s) {
        max-width: 50%;
      }

      @media (min-width: $screen-xl) {
        max-width: 35%;
      }
    }
  }

  &-WinnersTables {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 48px;
    margin-bottom: 38px;

    @media (min-width: $screen-m) {
      margin-bottom: 48px;
    }

    @media (min-width: $screen-l) {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 12px;
      margin-bottom: 80px;
    }
  }

  &-Table {
    background: var(--color-bg);
  }

  &-WinnersTitle {
    display: flex;
    align-items: center;
    height: 55px;
    margin-bottom: 4px;
    padding: 0 15px;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      height: 60px;
      padding: 0 34px;
    }

    @media (min-width: $screen-l) {
      height: 60px;
      padding: 0 18px;
      font-size: 16px;
    }

    @media (min-width: $screen-l) {
      height: 70px;
      padding: 0 24px;
      font-size: 20px;
    }
  }

  .Table--scrollable {
    max-height: 430px;
  }
}
</style>
