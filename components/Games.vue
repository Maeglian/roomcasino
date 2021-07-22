<template>
  <div class="Games">
    <GameModals />
    <div class="Games-Items">
      <template v-for="(game, i) in games">
        <Card
          v-show="i < gamesShowed"
          :key="i"
          :game-info="game"
          :img-url="game.imageUrl"
          :show-demo="true"
          overlay
          show-footer
          @open-gamepage="openGamePage($event, game.gameProducer)"
        />
      </template>
    </div>
    <template v-if="!games.length">
      <slot name="notFound"></slot>
      <p v-if="!$slots.notFound" class="Text Text--center">{{ $t('search.notFound') }}</p>
    </template>
    <div v-if="games.length > gamesShowed" class="Games-Btn">
      <button class="Btn" :class="btnClass" @click="showMoreGames()">
        {{ $t('buttons.loadMoreGames') }}
      </button>
    </div>
  </div>
</template>

<script>
import showAuthDialog from '@/mixins/showAuthDialog';
import Card from '@/components/Card';
import openGame from '@/mixins/openGame';
import GameModals from '@/components/GameModals';

export default {
  name: 'Games',
  components: {
    Card,
    GameModals,
  },
  mixins: [showAuthDialog, openGame],
  props: {
    games: {
      type: Array,
      required: true,
    },
    gamesToShow: {
      type: Number,
      required: false,
      default: 12,
    },
    gamesToLoadMore: {
      type: [Number, Boolean],
      required: false,
      default: false,
    },
    btnClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      gamesShowed: 0,
    };
  },
  created() {
    this.gamesShowed = this.gamesToShow;
  },
  methods: {
    showMoreGames() {
      const numberOfGames = this.gamesToLoadMore ? this.gamesToLoadMore : this.gamesToShow;
      this.gamesShowed += numberOfGames;
    },
  },
};
</script>

<style lang="scss">
.Games {
  &-Items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    justify-items: center;
    margin-bottom: 20px;

    @media (min-width: $screen-s) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: $screen-l) {
      grid-template-columns: repeat(6, 1fr);
      margin-bottom: 24px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 32px;
    }
  }

  &-Btn {
    text-align: center;
  }
}
</style>
