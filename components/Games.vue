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
          :show-dga="showDga"
          show-footer
          :overlay="!startGameOnClickCard"
          :show-provider="startGameOnClickCard"
          :start-game-on-click="startGameOnClickCard"
          @open-gamepage="openGamePage($event, game.gameProducer)"
        />
      </template>
    </div>
    <template v-if="!games.length">
      <slot name="notFound"></slot>
      <p v-if="!$slots.notFound" class="Text Text--center">{{ $t('search.notFound') }}</p>
    </template>
    <slot name="btn"></slot>
    <div v-if="!$slots.btn && games.length > gamesShowed" class="Games-Btn">
      <button class="Btn" :class="btnClass" @click="showMoreGames()">
        {{ $t('buttons.loadMoreGames') }}
      </button>
    </div>
  </div>
</template>

<script>
import showAuthDialog from '@/mixins/showAuthDialog';
import Card from '@/components/Card.vue';
import openGame from '@/mixins/openGame';
import GameModals from '@/components/GameModals.vue';

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
    startGameOnClickCard: {
      type: Boolean,
      required: false,
      default: false,
    },
    showDga: {
      type: Boolean,
      required: false,
      default: true,
    },
    categoryName: {
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
      this.$gtag.event('load_more_games_pressed', { front_category: this.categoryName });
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

    @media (min-width: $screen-s) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: $screen-l) {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  &-Btn {
    margin-top: 20px;
    text-align: center;

    @media (min-width: $screen-l) {
      margin-top: 24px;
    }

    @media (min-width: $screen-xl) {
      margin-top: 32px;
    }
  }
}
</style>
