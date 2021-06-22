<template>
  <section class="Winners">
    <div class="Winners-Section">
      <div class="Title Title--type-h2 Winners-Title">{{ $t('homepage.lastWinners') }}</div>
      <div class="Table TableBordered Winners-Table">
        <div v-for="(item, i) in lastWinnerList" :key="`lastWinner_${i}`" class="Table-Row">
          <div class="Table-Cell TableBordered-Cell Winners-Avatar">
            <img class="Winners-Avatar" :src="item.gameIconUrl" alt="" />
          </div>
          <div class="Table-Cell TableBordered-Cell Winners-Name">
            {{ item.nickname }} just won<br />
            in <span class="Winners-Game">{{ item.gameName }}</span>
          </div>
          <div class="Table-Cell TableBordered-Cell Winners-Money">
            {{ item.amount }} {{ item.currency }}
          </div>
        </div>
      </div>
    </div>
    <div class="Winners-Section">
      <div class="Title Title--type-h2 Winners-Title">{{ $t('homepage.topWinners') }}</div>
      <div class="Table Table--bordered Winners-Table">
        <div v-for="(item, i) in topWinnerList" :key="`topWinner_${i}`" class="Table-Row">
          <div class="Table-Cell TableBordered-Cell Winners-Avatar">
            <img class="Winners-Avatar" :src="item.gameIconUrl" alt="" />
          </div>
          <div class="Table-Cell TableBordered-Cell Winners-Name">
            {{ item.nickname }} just won<br />
            in <span class="Winners-Game">{{ item.gameName }}</span>
          </div>
          <div class="Table-Cell TableBordered-Cell Winners-Money">
            {{ item.amount }} {{ item.currency }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Winners',
  computed: {
    ...mapState('games', [
      'topWinnerList',
      'lastWinnerList',
      'topWinnerListError',
      'lastWinnerListError',
    ]),
  },
  mounted() {
    this.lastWinnersTimer = setInterval(this.getLastWinnerList, 10000, { limit: 5 });
    this.topWinnersTimer = setInterval(this.getTopWinnerList, 10000, { limit: 5 });
  },
  beforeDestroy() {
    clearInterval(this.lastWinnersTimer);
    clearInterval(this.topWinnersTimer);
  },
  methods: {
    ...mapActions('games', ['getTopWinnerList', 'getLastWinnerList']),
  },
};
</script>

<style lang="scss">
.Winners {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  padding-top: 20px;

  @media (min-width: $screen-s) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 60px;
  }

  @media (min-width: $screen-m) {
    padding-top: 30px;
  }

  @media (min-width: $screen-l) {
    padding-top: 40px;
  }

  @media (min-width: $screen-xl) {
    margin-bottom: 80px;
  }

  &-Section {
    width: 100%;
    margin-bottom: 30px;

    @media (min-width: $screen-s) {
      width: calc(50% - 16px);
      margin-bottom: 0;
    }

    @media (min-width: $screen-l) {
      width: calc(50% - 41px);
    }

    @media (min-width: $screen-xl) {
      width: calc(50% - 69px);
    }
  }

  &-Title {
    margin-bottom: 19px;
  }

  &-Avatar {
    width: 64px;
    height: 64px;
    padding-right: 0;
    padding-left: 0;

    @media (min-width: $screen-m) {
      width: 76px;
      height: 76px;
    }

    @media (min-width: $screen-xl) {
      width: 90px;
      height: 90px;
    }
  }

  &-Name {
    padding-left: 15px;
    font-size: 10px;
    font-weight: 700;
    line-height: 124%;
    color: var(--color-text-ghost);

    @media (min-width: $screen-l) {
      font-size: 12px;
    }

    @media (min-width: $screen-xl) {
      font-size: 14px;
    }
  }

  &-Game {
    color: var(--color-text-main);
  }

  &-Money {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-main1);
    white-space: nowrap;

    @media (min-width: $screen-m) {
      font-size: 18px;
    }

    @media (min-width: $screen-l) {
      font-size: 20px;
    }

    @media (min-width: $screen-xl) {
      font-size: 24px;
    }
  }
}
</style>
