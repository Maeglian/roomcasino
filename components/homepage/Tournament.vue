<template>
  <section class="Tournament">
    <div class="Wrapper">
      <div class="Title Title--type-h1 Tournament-Title">
        Sign up <span class="Colored">&</span> win <br />
        two day tournament
      </div>
      <div class="Title Title--type-h2 Tournament-Subtitle">
        € 500 <span class="Colored">+</span> 500 Free Spins every day!
      </div>
      <div class="Tournament-Participate">
        <div class="Btn Btn--common Tournament-Btn">
          Participate
        </div>
        <Counter class="Tournament-Counter" enddate="2020-12-01" />
      </div>
      <div class="Tournament-Table">
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
          </div>
          <div
            v-for="(winner, i) in limitedTournamentWinners(winnersToShow)"
            :key="winner.id"
            class="Table-Row"
          >
            <div class="Table-Cell TableBordered-Cell">
              {{ i + 1 }}
            </div>
            <div class="Table-Cell TableBordered-Cell">
              {{ winner.name }}
            </div>
            <div class="Table-Cell TableBordered-Cell Tournament-Points">
              {{ winner.points }}
            </div>
          </div>
        </div>
        <NuxtLink class="Tournament-More" to="/daily-tournament">
          Show more
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import Counter from '@/components/Counter.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Tournament',
  components: {
    Counter,
  },
  data() {
    return {
      winnersToShow: 4,
    };
  },
  computed: {
    ...mapGetters(['limitedTournamentWinners']),
  },
};
</script>

<style lang="scss">
.Tournament {
  max-width: 100%;
  margin-bottom: 30px;
  padding: 20px 0;
  background-image: url('../../assets/img/tournament-bg_460.png');
  background-repeat: no-repeat;
  background-position: right top;
  background-size: auto 100%;

  @media (min-width: $screen-m) {
    margin-bottom: 38px;
    padding: 26px 0;
    background-image: url('../../assets/img/tournament-bg_768.png');
  }

  @media (min-width: $screen-l) {
    margin-bottom: 58px;
    background-image: url('../../assets/img/tournament-bg_960.png');
  }

  @media (min-width: $screen-xl) {
    margin-bottom: 80px;
    padding: 37px 0;
    background-image: url('../../assets/img/tournament-bg_1248.png');
  }

  &-Title {
    margin-bottom: 12px;
  }

  &-Subtitle {
    margin-bottom: 14px;

    @media (min-width: $screen-m) {
      margin-bottom: 23px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 34px;
    }
  }

  &-Btn {
    order: 1;

    @media (min-width: $screen-s) {
      order: 0;
      margin-right: 15px;
    }
  }

  &-Participate {
    display: flex;
    flex-direction: column;
    margin-bottom: 19px;

    @media (min-width: $screen-s) {
      flex-direction: row;
      margin-bottom: 24px;
    }

    @media (min-width: $screen-l) {
      margin-bottom: 28px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 40px;
    }
  }

  &-Counter {
    margin-bottom: 15px;

    @media (min-width: $screen-s) {
      margin-bottom: 0;
    }
  }

  &-Table {
    width: 100%;
    font-size: 12px;

    @media (min-width: $screen-m) {
      width: 50%;
    }

    @media (min-width: $screen-l) {
      width: 40%;
    }

    @media (min-width: $screen-xl) {
      width: 32%;
    }
  }

  &-Points {
    font-size: 14px;
    color: var(--color-main1);
  }

  &-More {
    display: block;
    width: 100px;
    margin-left: auto;
    padding: 15px 0;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>
