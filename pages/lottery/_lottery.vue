<template>
  <section class="Page Page--full LotteryPage DailyTournamentPage">
    <div class="Page-Header LotteryPage-Header" :class="`${slug}-Header`">
      <div class="Wrapper">
        <div class="DailyTournamentPage-MainText">
          <h1
            class="Title Title--type-h1 DailyTournamentPage-Title"
            v-html="$t(`${slug}.title`)"
          ></h1>
          <div
            class="DailyTournamentPage-Subtitle DailyTournamentPage-Subtitle--color"
            v-html="$t(`${slug}.prize`)"
          ></div>
          <div
            class="Text Text--additional2 DailyTournamentPage-Text"
            v-html="$t(`${slug}.text`)"
          ></div>
        </div>
        <div class="DailyTournamentPage-Promotion">
          <div class="DailyTournamentPage-Deposit">
            <button class="Btn Btn--common DailyTournamentPage-Btn" @click="onClickBtn()">
              {{ isLoggedIn ? $t('buttons.deposit') : $t('buttons.signUp') }}
            </button>
            <Counter v-if="lottery" :enddate="new Date(lottery.endDateTime * 1000)" />
          </div>
        </div>
        <template v-if="lottery">
          <div class="Advantages Advantages--min LotteryPage-Advantages">
            <div class="Advantages-Advantage">
              <BaseIcon class="Advantages-AdvantageIcon Icon--fill" name="advantage-cup" />
              <div class="Advantages-AdvantageBlock">
                <div class="Advantages-AdvantageTitle">
                  {{ lottery.awardList.length }}
                </div>
                <div class="Advantages-AdvantageInfo">
                  {{ $t('common.winners') }}
                </div>
              </div>
            </div>
            <div class="Advantages-Advantage">
              <BaseIcon class="Advantages-AdvantageIcon Icon--fill" name="advantage-calendar" />
              <div class="Advantages-AdvantageBlock">
                <div class="Advantages-AdvantageTitle">
                  <template v-if="slug === 'tesla_lottery'"> 40 {{ $t('common.days') }}</template>
                  <template v-else>
                    {{ lottery.recurringShift }} {{ lottery.recurringUnit }}
                  </template>
                </div>
                <div class="Advantages-AdvantageInfo">
                  {{ $t('tournaments.duration') }}
                </div>
              </div>
            </div>
            <div class="Advantages-Advantage">
              <BaseIcon
                class="Advantages-AdvantageIcon Icon--stroke Icon--fill"
                name="advantage-star"
              />
              <div class="Advantages-AdvantageBlock">
                <div class="Advantages-AdvantageTitle">
                  <span class="Colored">
                    <template v-if="slug === 'tesla_lottery'">
                      {{ $t('tesla_lottery.prize') }}
                    </template>
                    <template v-else>
                      <template v-if="lottery.budget">
                        {{ lottery.budget }} {{ lottery.currency }}<br />
                      </template>
                      <template v-if="lottery.freeSpinBudget">
                        {{ lottery.freeSpinBudget }} {{ $t('common.freeSpins') }}
                      </template>
                    </template>
                  </span>
                </div>
                <div class="Advantages-AdvantageInfo">
                  {{ $t('common.prizePool') }}
                </div>
              </div>
            </div>
            <div class="Advantages-Advantage">
              <BaseIcon class="Advantages-AdvantageIcon Icon--fill" name="advantage-ticket" />
              <div class="Advantages-AdvantageBlock">
                <div class="Advantages-AdvantageTitle">
                  {{ lottery.ticketCost }} {{ lottery.currency }}
                </div>
                <div class="Advantages-AdvantageInfo">
                  {{ $t('lottery.ticket') }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="isLoggedIn" class="LotteryPage-Tickets">
            <div class="LotteryPage-User LotteryPage-HighlightedText">
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="LotteryPage-Ticket LotteryPage-HighlightedText">
              <div>{{ $t('lottery.tickets') }}:</div>
              <div class="LotteryPage-TicketCount Colored">{{ lottery.playerTicketsCount }}</div>
              <img src="@/assets/img/ticket.svg" class="LotteryPage-TicketImg" alt="ticket icon" />
            </div>
          </div>
        </template>
      </div>
    </div>
    <section class="DailyTournamentPage-Content">
      <Loader v-if="lotteryResultListIsLoading" />
      <template v-else-if="winners.length">
        <div class="LotteryPage-WinnersTitle">
          {{ $t('lottery.lastRoundWinners') }}
        </div>
        <div class="DailyTournamentPage-Table LotteryPage-Table Table--scrollable">
          <div class="Table TableBordered">
            <div class="Table-Row">
              <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                #
              </div>
              <div
                class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th"
              ></div>
              <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                {{ $t('common.name') }}
              </div>
              <div class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th">
                {{ $t('common.prize') }}
              </div>
            </div>
            <div v-for="(winner, i) in winners" :key="winner.id" class="Table-Row">
              <div class="Table-Cell TableBordered-Cell LotteryPage-NumCell">
                {{ i + 1 }}
              </div>
              <div class="Table-Cell TableBordered-Cell LotteryPage-WinnerBadgeCell">
                <svg class="LotteryPage-WinnerBadge" :class="`LotteryPage-WinnerBadge--${i + 1}`">
                  <use xlink:href="@/assets/img/icons.svg#winner-badge"></use>
                </svg>
              </div>
              <div class="Table-Cell TableBordered-Cell DailyTournamentPage-WinnerNick">
                {{ winner.nickname }}
              </div>
              <div class="Table-Cell TableBordered-Cell DailyTournamentPage-Prize">
                <template v-if="winner.moneyAmount">
                  {{ winner.moneyAmount }} {{ winner.currency }}<br />
                </template>
                <template v-if="winner.freespinAmount">
                  {{ winner.freespinAmount }} {{ $t('common.freeSpins') }}
                </template>
                <!--                <template-->
                <!--                  v-if="tournamentAwards.length && i < tournamentAwards[round].awards.length"-->
                <!--                >-->
                <!--                  {{ tournamentAwards[round].awards[i].moneyAmount }} {{ tournament.currency }}-->
                <!--                </template>-->
              </div>
            </div>
          </div>
        </div>
      </template>
      <h2 class="Title Title--type-h2 Page-Subtitle DailyTournamentPage-Subtitle">
        {{ $t('lottery.termsTitle') }}
      </h2>
      <div class="Page-Blocks DailyTournamentPage-Terms">
        <div v-for="(item, i) in $t(`${slug}.terms`)" :key="`txt${i}`" class="Page-Block">
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
import { mapState, mapActions, mapGetters } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'LotteryPage',
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
    if (this.slug === 'tesla_lottery') {
      return {
        title: this.$t(`${this.slug}.metaTitle`),
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.$t(`${this.slug}.metaDescription`),
          },
        ],
      };
    }
    return {
      title: 'Daily Tournament At Ninecasino And Other Similar Events',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'On this page, you will find detailed information about the tournaments held by the gaming website. List of winners and terms and conditions of the events',
        },
      ],
    };
  },
  computed: {
    ...mapState(['width', 'user']),
    ...mapState('tournaments', [
      'lotteryList',
      'lotteryListLoadingStatus',
      'lotteryResultListIsLoading',
      'lotteryResultList',
    ]),
    ...mapGetters('tournaments', ['tournaments']),
    ...mapGetters(['isLoggedIn']),
    slug() {
      return this.$route.params.lottery;
    },
    lottery() {
      return this.lotteryResultList.find(lottery => lottery.status === 'enabled');
    },
    winners() {
      const finishedLotteries = this.lotteryResultList.filter(
        lottery => lottery.status === 'finished',
      );
      if (!finishedLotteries.length) return [];
      const lastLottery = finishedLotteries.sort(
        (l1, l2) => l2.startDateTime - l1.startDateTime,
      )[0];
      if (lastLottery.awardList.some(award => award.status === 'noWinners')) return [];
      return [...lastLottery.awardList].sort((winner1, winner2) => winner1.place - winner2.place);
    },
  },
  watch: {
    lotteryListLoadingStatus: {
      immediate: true,
      handler(newVal) {
        if (newVal === 'loaded') {
          if (!this.lotteryList.find(l => l.slug === this.slug)) {
            this.$router.push(this.localePath('/404'));
            return;
          }

          this.getLotteryResultList({
            slug: this.slug,
            offset: 0,
            limit: 100,
          });
        }
      },
    },
  },
  methods: {
    ...mapActions('tournaments', ['getLotteryResultList']),
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
      margin-bottom: 12px;
    }

    @media (min-width: $screen-l) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-row-gap: 0;
      margin-top: 28px;
      margin-bottom: 13px;
    }

    @media (min-width: $screen-xl) {
      margin-top: 50px;
      margin-bottom: 16px;
    }
  }

  &-Header {
    width: 100%;
    margin-top: -70px;
    padding-top: 190px / 320px * 100%;
    background-image: url(~@/assets/img/lottery_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: calc(100% - 32px) auto;

    @media (min-width: $screen-s) {
      background-image: url(~@/assets/img/lottery_600.png);
    }

    @media (min-width: $screen-m) {
      margin-top: 0;
      padding-top: 18px / 768px * 100%;
      padding-bottom: 35px;
      background-image: url(~@/assets/img/lottery_960.png);
    }

    @media (min-width: $screen-xl) {
      padding-top: 36px;
      padding-bottom: 60px;
      background-image: url(~@/assets/img/lottery_1248.png);
    }

    .DailyTournamentPage-MainText {
      @media (min-width: $screen-s) {
        max-width: 100%;
      }

      @media (min-width: $screen-m) {
        max-width: 50%;
      }

      @media (min-width: $screen-xl) {
        max-width: 35%;
      }
    }
  }

  &-Table {
    margin-bottom: 38px;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      margin-bottom: 48px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 80px;
    }
  }

  &-NumCell,
  &-WinnerBadgeCell {
    width: 50px;

    @media (min-width: $screen-m) {
      width: 80px;
    }
  }

  &-WinnerBadge {
    width: 17px;
    height: 17px;

    @media (min-width: $screen-xl) {
      width: 21px;
      height: 21px;
    }

    &--1 {
      fill: var(--color-main1);
      stroke: var(--color-main1);
    }

    &--2 {
      fill: var(--color-text-faded);
      stroke: var(--color-text-faded);
    }

    &--3 {
      fill: #f37833;
      stroke: #f37833;
    }
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

  &-Tickets {
    display: flex;
    justify-content: space-between;
    padding: 16px 16px 16px 100px;
    background-color: var(--color-bg);
    background-image: url(~@/assets/img/tickets-bg-mobile.png);
    background-repeat: no-repeat;
    background-size: contain;

    @media (min-width: $screen-m) {
      padding-left: 250px;
      background-image: url(~@/assets/img/tickets-bg.png);
    }
  }

  &-Ticket {
    text-align: right;

    @media (min-width: $screen-m) {
      display: flex;
    }
  }

  &-TicketCount {
    margin-left: 12px;
  }

  &-TicketImg {
    display: none;

    @media (min-width: $screen-m) {
      display: block;
      margin-left: 10px;
    }
  }

  &-HighlightedText {
    font-size: 12px;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      font-size: 14px;
    }

    @media (min-width: $screen-l) {
      font-size: 16px;
    }

    @media (min-width: $screen-xl) {
      font-size: 20px;
    }
  }

  .Table--scrollable {
    max-height: 430px;
  }

  .Advantages-AdvantageIcon {
    width: 34px;
    flex-shrink: 0;

    @media (min-width: $screen-m) {
      width: 44px;
    }
  }
}

.sunshine_spins_lottery {
  &-Header {
    background-image: url(~@/assets/img/sunshine-page_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: calc(100% - 32px) auto;

    @media (min-width: $screen-s) {
      background-image: url(~@/assets/img/sunshine-page_600.png);
    }

    @media (min-width: $screen-m) {
      background-image: url(~@/assets/img/sunshine-page_900.png);
      background-position: center 20%;
    }

    @media (min-width: $screen-xl) {
      background-image: url(~@/assets/img/sunshine-page_1248.png);
      background-position: center top;
    }
  }
}

.tesla_lottery {
  &-Header {
    padding-top: 270px / 320px * 100%;
    background-image: url(~@/assets/img/tesla_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: calc(100% - 32px) auto;

    @media (min-width: $screen-s) {
      background-image: url(~@/assets/img/tesla_600.png);
    }

    @media (min-width: $screen-m) {
      padding-top: 50px / 768px * 100%;
      background-image: url(~@/assets/img/tesla_900.png);
      background-position: center 10%;
    }

    @media (min-width: $screen-xl) {
      padding-top: 70px / 1248px * 100%;
      background-image: url(~@/assets/img/tesla_1248.png);
      background-position: center top;
    }

    @media (min-width: $screen-xxl) {
      padding-top: 100px / 1920px * 100%;
      background-image: url(~@/assets/img/tesla_1920.png);
      background-position: center top;
    }

    @media (min-width: $screen-xxxl) {
      padding-top: 160px / 1920px * 100%;
    }
  }
}

.happy_harvest_lotto {
  &-Header {
    padding-top: 270px / 320px * 100%;
    background-image: url(~@/assets/img/harvest_460.png);

    @media (min-width: $screen-s) {
      padding-top: 300px / 320px * 100%;
      background-image: url(~@/assets/img/harvest_600.png);
    }

    @media (min-width: $screen-m) {
      padding-top: 50px / 768px * 100%;
      background-image: url(~@/assets/img/harvest_900.png);

      .DailyTournamentPage-MainText {
        max-width: 35%;
      }
    }

    @media (min-width: $screen-xl) {
      padding-top: 120px / 768px * 100%;
      background-image: url(~@/assets/img/harvest_1248.png);
    }

    @media (min-width: $screen-xxl) {
      padding-top: 80px;
      background-image: url(~@/assets/img/harvest_1920.png);
    }

    @media (min-width: $screen-xxxl) {
      padding-top: 160px / 1920px * 100%;
    }
  }
}
</style>
