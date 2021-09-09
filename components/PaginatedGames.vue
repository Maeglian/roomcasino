<template>
  <div class="PaginatedSlider">
    <div class="Title PaginatedSlider-Title">
      {{ title }}
    </div>
    <button v-if="page" class="PaginatedSlider-Prev" @click="onClickPrev"></button>
    <button v-if="page <= maxPages" class="PaginatedSlider-Next" @click="onClickNext"></button>
    <div class="PaginatedSlider-Games">
      <Card
        v-for="(game, i) in gamesPerPage"
        :key="i"
        :game-info="game"
        :show-demo="true"
        overlay
        @open-gamepage="openGamePage($event, game.gameProducer)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from '@/components/Card';
import openGame from '@/mixins/openGame';
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'PaginatedSlider',
  components: {
    Card,
  },
  mixins: [openGame, showAuthDialog],
  props: {
    games: {
      type: Array,
      required: true,
    },
    title: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
  },
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    ...mapState(['width']),
    itemsInScreen() {
      if (this.width >= 960) return 9;
      if (this.width < 960 && this.width >= 768) return 12;
      return 8;
    },
    maxPages() {
      return this.games.length / this.itemsInScreen;
    },
    gamesPerPage() {
      return this.games.slice(
        this.itemsInScreen * this.page,
        this.itemsInScreen * this.page + this.itemsInScreen,
      );
    },
  },
  methods: {
    onClickPrev() {
      if (this.page) this.page -= 1;
    },
    onClickNext() {
      if (this.page <= this.maxPages) this.page += 1;
    },
  },
};
</script>

<style lang="scss">
.PaginatedSlider {
  position: relative;

  &-Title {
    margin-bottom: 15px;
    font-size: 16px;

    @media (max-width: $screen-m) {
      font-size: 12px;
    }
  }

  &-Prev,
  &-Next {
    position: absolute;
    top: 10px;
    width: 8px;
    height: 14px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  &-Prev {
    right: 20px;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.37773 0.860612C5.77667 0.405174 6.48562 0.405931 6.88359 0.862218L7.42672 1.48494C7.75521 1.86158 7.75521 2.42291 7.42672 2.79954L3.76316 7L7.42672 11.2005C7.75521 11.5771 7.75521 12.1384 7.42671 12.5151L6.88359 13.1378C6.48562 13.5941 5.77667 13.5948 5.37773 13.1394L0.57716 7.6589C0.246795 7.28175 0.246796 6.71825 0.577162 6.3411L5.37773 0.860612Z' fill='%23AEB3C7'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: left;
  }

  &-Next {
    right: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.62227 13.1394C2.22333 13.5948 1.51438 13.5941 1.11641 13.1378L0.573285 12.5151C0.24479 12.1384 0.24479 11.5771 0.573285 11.2005L4.23684 7L0.573284 2.79954C0.244789 2.4229 0.24479 1.86158 0.573285 1.48494L1.11641 0.862217C1.51438 0.405931 2.22333 0.405175 2.62227 0.860613L7.42284 6.3411C7.75321 6.71825 7.7532 7.28175 7.42284 7.65891L2.62227 13.1394Z' fill='%23AEB3C7'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: right;
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
}
</style>
