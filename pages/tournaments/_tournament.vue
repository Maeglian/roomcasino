<template>
  <section v-if="tournament" class="Page Page--full DailyTournamentPage">
    <GameModals />
    <div class="Page-Header DailyTournamentPage-Header" :class="`${tournament.class}-Header`">
      <div class="Wrapper">
        <div class="DailyTournamentPage-MainText">
          <h1
            v-if="tournament.title"
            class="Title Title--type-h1 Title--color1 DailyTournamentPage-Title"
            v-html="tournament.title"
          ></h1>
          <h1
            v-else
            class="Title Title--type-h1 DailyTournamentPage-Title"
            v-html="$t(`${tournament.translates}.title`)"
          ></h1>
          <div
            v-if="$t(`${tournament.translates}.prize`)"
            class="DailyTournamentPage-Subtitle DailyTournamentPage-Subtitle--color"
          >
            {{ $t(`${tournament.translates}.prize`) }}
          </div>
          <div
            v-if="width > 960"
            class="Text Text--additional2 DailyTournamentPage-Text"
            v-html="$t(`${tournament.translates}.text`)"
          ></div>
          <div
            v-else
            class="Text Text--additional2 DailyTournamentPage-Text"
            v-html="$t(`${tournament.translates}.textMobile`)"
          ></div>
        </div>
        <div v-if="tournament.id" class="DailyTournamentPage-Promotion">
          <div class="DailyTournamentPage-Deposit">
            <button class="Btn Btn--common DailyTournamentPage-Btn" @click="onClickBtn()">
              {{ isLoggedIn ? $t('buttons.depositNow') : $t('buttons.signUp') }}
            </button>
            <Counter :enddate="new Date(tournament.endDateTime * 1000)" />
          </div>
          <div class="DailyTournamentPage-Benefits">
            <div class="DailyTournamentPage-Benefit">
              <img src="@/assets/img/flower.svg" class="DailyTournamentPage-BenefitIcon" alt="" />
              <div>
                <div class="DailyTournamentPage-BenefitName">1 {{ $t('common.week') }}</div>
                <div class="DailyTournamentPage-BenefitAdditional">
                  {{ $t('tournaments.duration') }}
                </div>
              </div>
            </div>
            <div class="DailyTournamentPage-Benefit">
              <img src="@/assets/img/flower.svg" class="DailyTournamentPage-BenefitIcon" alt="" />
              <div>
                <div class="DailyTournamentPage-BenefitName">
                  <span class="Colored">{{ tournament.budget }} {{ tournament.currency }}</span>
                </div>
                <div class="DailyTournamentPage-BenefitAdditional">
                  {{ $t('common.prizePool') }}
                </div>
              </div>
            </div>
            <div v-if="tournament.maskingRate" class="DailyTournamentPage-Benefit">
              <img src="@/assets/img/flower.svg" class="DailyTournamentPage-BenefitIcon" alt="" />
              <div>
                <div class="DailyTournamentPage-BenefitName">
                  {{ tournament.maskingRate }} {{ tournament.currency }}
                </div>
                <div class="DailyTournamentPage-BenefitAdditional">
                  {{ $t('tournaments.betsPerPoint') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="DailyTournamentPage-Content">
      <div v-if="tournament.id" class="DailyTournamentPage-Row">
        <div class="DailyTournamentPage-Winners">
          <BaseTabs
            class="DailyTournamentPage-Tabs"
            :items="tabs"
            :current-item="round"
            @choose-tab="round = $event"
          />
          <div class="DailyTournamentPage-WinnersTable">
            <Loader v-if="tournamentResultIsLoading" />
            <div v-else class="DailyTournamentPage-Table Table--scrollable">
              <div class="Table TableBordered">
                <div class="Table-Row">
                  <div
                    class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th"
                  >
                    #
                  </div>
                  <div
                    class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th"
                  >
                    {{ $t('common.name') }}
                  </div>
                  <div
                    class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th"
                  >
                    {{ $t('common.points') }}
                  </div>
                  <div
                    class="Table-Cell TableBordered-Cell TableBordered-Th DailyTournamentPage-Th"
                  >
                    {{ $t('common.prize') }}
                  </div>
                </div>
                <div
                  v-for="(winner, i) in tournamentResult.resultList"
                  :key="winner.id"
                  class="Table-Row"
                >
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
                    <template
                      v-if="tournamentAwards.length && i < tournamentAwards[round].awards.length"
                    >
                      {{ tournamentAwards[round].awards[i].moneyAmount }} {{ tournament.currency }}
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="DailyTournamentPage-SliderSection">
          <Loader v-if="tournamentGamesAreLoading" />
          <PaginatedGames
            v-else
            :key="width"
            :games="tournamentGames"
            :title="$t('tournaments.games')"
          />
        </div>
      </div>
      <div v-else class="DailyTournamentPage-Games">
        <h2
          class="Title Title--type-h2 Page-Subtitle DailyTournamentPage-Subtitle DailyTournamentPage-Subtitle--color"
        >
          {{ $t('tournaments.games') }}
        </h2>
        <Loader v-if="tournamentGamesAreLoading" />
        <Games
          v-else
          class="DefaultGames-Cards"
          :games="tournamentGames"
          :games-to-show="12"
          btn-class="Btn--common Btn--dark"
        />
      </div>
      <h2 class="Title Title--type-h2 Page-Subtitle DailyTournamentPage-Subtitle">
        {{ $t('tournaments.terms') }}
      </h2>
      <div class="Page-Blocks DailyTournamentPage-Terms">
        <div
          v-for="(item, i) in $t(`${tournament.translates}.terms`)"
          :key="`txt${i}`"
          class="Page-Block"
        >
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
import moment from 'moment';
import showAuthDialog from '@/mixins/showAuthDialog';
import Loader from '@/components/Loader';
import PaginatedGames from '@/components/PaginatedGames';
import GameModals from '@/components/GameModals';

export default {
  name: 'DailyTournamentPage',
  components: {
    Loader,
    PaginatedGames,
    GameModals,
  },
  mixins: [showAuthDialog],
  layout: 'page',
  data() {
    return {
      winnersToShow: 10,
      round: 0,
      page: 1,
    };
  },
  head() {
    if (this.$route.params.tournament === 'demigods') {
      return {
        title: this.$t('demigods.metaInfo.title'),
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.$t('demigods.metaInfo.description'),
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
    ...mapState(['width']),
    ...mapState('tournaments', [
      'tournamentListLoadingStatus',
      'tournamentGames',
      'tournamentGamesAreLoading',
      'tournamentResult',
      'tournamentResultIsLoading',
      'tournamentAwards',
    ]),
    ...mapGetters('tournaments', ['tournaments']),
    tournament() {
      return this.tournaments[this.$route.params.tournament];
    },
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
      handler() {
        if (this.tournamentListLoadingStatus === 'loaded') {
          if (this.tournament) {
            const category = this.tournament.id ? 'slots' : this.tournament.slug;
            this.getTournamentGames({
              category,
            });
            if (this.tournament.id) this.getTournamentResult({ tournamentId: this.tournament.id });
            this.getTournamentList({ slug: this.tournament.slug, withAwards: 1, limit: 2 });
          } else this.$router.push(this.localePath('/404'));
        }
      },
    },
    round() {
      this.getTournamentResult({ tournamentId: this.tournamentAwards[this.round].id });
    },
  },
  methods: {
    ...mapActions('tournaments', [
      'getTournamentGames',
      'getTournamentList',
      'getTournamentResult',
    ]),
    countDuration(startdate, enddate) {
      return moment(enddate).diff(moment(startdate), 'minutes');
    },
  },
};
</script>

<style lang="scss">
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

    @media (min-width: $screen-l) {
      padding-top: 100px / 1248px * 100%;
      background-position: center center;
    }

    @media (min-width: $screen-xl) {
      padding-top: 120px;
      background-image: url(~@/assets/img/dropsSlots_1248.png);
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
      padding-top: 140px;
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

.Weekly_derby {
  &-Header {
    width: 100%;
    margin-top: -70px;
    margin-bottom: 22px;
    padding-top: 270px / 320px * 100%;
    background-image: url(~@/assets/img/derby_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: calc(100% - 32px) auto;

    @media (min-width: $screen-s) {
      margin-top: 0;
      padding-top: 80px / 1248px * 100%;
      background-image: url(~@/assets/img/derby_900.png);
    }

    @media (min-width: $screen-m) {
      padding-top: 50px / 1248px * 100%;
      background-position: center center;
    }

    @media (min-width: $screen-xl) {
      padding-top: 100px;
      background-image: url(~@/assets/img/derby_1248.png);
    }

    @media (min-width: $screen-xxl) {
      background-image: url(~@/assets/img/derby_1920.png);
    }

    .DailyTournamentPage-MainText {
      @media (min-width: $screen-s) {
        max-width: 50%;
      }

      @media (min-width: $screen-m) {
        max-width: 35%;
      }
    }
  }
}

.DemiGods {
  &-Header {
    width: 100%;
    margin-top: -70px;
    margin-bottom: 22px;
    padding-top: 270px / 320px * 100%;
    background-image: url(~@/assets/img/demigods_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: calc(100% - 32px) auto;

    @media (min-width: $screen-s) {
      margin-top: 0;
      padding-top: 80px / 1248px * 100%;
      background-image: url(~@/assets/img/demigods-page_900.png);
      background-position: center center;
    }

    @media (min-width: $screen-xl) {
      background-image: url(~@/assets/img/demigods-page_1248.png);
      background-position: center top;
    }

    @media (min-width: $screen-xxl) {
      background-image: url(~@/assets/img/demigods_1920.png);
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
}
</style>
