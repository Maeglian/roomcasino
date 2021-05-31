<template>
  <section v-if="tournaments[$route.params.tournament]" class="Page Page--full DailyTournamentPage">
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
            class="Title Title--type-h1 Title--color1 DailyTournamentPage-Title"
            v-html="tournaments[$route.params.tournament].title"
          ></h1>
          <div class="DailyTournamentPage-Subtitle">
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
      </div>
    </div>
    <section class="DailyTournamentPage-Content">
      <div class="DailyTournamentPage-Games">
        <h2 class="Title Title--type-h2 Page-Subtitle DailyTournamentPage-Subtitle">
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
          v-for="(item, i) in $t(`${tournaments[$route.params.tournament].translates}.terms`)"
          :key="`txt${i}`"
          class="Page-Block"
        >
          <div class="Page-Number">{{ i + 1 }}.</div>
          <div class="Text Text--additional" v-html="item.text"></div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import showAuthDialog from '@/mixins/showAuthDialog';
import { mapState, mapActions } from 'vuex';
import Loader from '@/components/Loader';
import Games from '@/components/Games';
import { TOURNAMENTS } from '@/config';

export default {
  name: 'DailyTournamentPage',
  components: {
    Loader,
    Games,
  },
  mixins: [showAuthDialog],
  layout: 'page',
  data() {
    return {
      tournaments: TOURNAMENTS,
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
    ...mapState(['tournamentGames', 'tournamentGamesAreLoading', 'width']),
  },
  created() {
    if (this.tournaments[this.$route.params.tournament])
      this.getTournamentGames({ category: this.tournaments[this.$route.params.tournament].slug });
    else this.$router.push(this.localePath('/404'));
  },
  methods: {
    ...mapActions(['getTournamentGames']),
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

  &-Games {
    margin-bottom: 29px;

    @media (min-width: $screen-m) {
      margin-bottom: 50px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 97px;
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

.DropsWins {
  &-Header {
    width: 100%;
    margin-bottom: 22px;
    padding-top: 183px / 320px * 100%;
    background-image: url(~@/assets/img/drops_460.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: calc(100% - 32px) auto;

    @media (min-width: $screen-s) {
      padding-top: 147px / 1248px * 100%;
      background-image: url(~@/assets/img/drops_624.png);
      background-position: center left;
    }

    @media (min-width: $screen-m) {
      background-position: center center;
      background-size: auto auto;
    }

    @media (min-width: $screen-l) {
      background-image: url(~@/assets/img/drops_900.png);
    }

    @media (min-width: $screen-xl) {
      padding-top: 147px;
      background-image: url(~@/assets/img/drops_1248.png);
    }

    @media (min-width: $screen-xxl) {
      background-image: url(~@/assets/img/drops_1248.png);
    }
  }
}
</style>
