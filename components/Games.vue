<template>
  <div class="Games">
    <div class="Games-Items">
      <Card v-for="(game, i) in gamesLimited"
        :key="i"
        :imgUrl="game.imageUrl"
        @play="onClickStartGame({ gameId: game.gameId, returnUrl: '/' })"
        @playDemo="startGame({ gameId: game.gameId, returnUrl: '/', demo: true })"
        overlay
      />
    </div>
    <div v-if="games.length > gamesShowed" class="Games-Btn">
      <button class="Btn" :class="btnClass" @click="showMoreGames()">
        Load more games
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Games',
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
    btnClass: {
      type: String,
      required: false,
      default: '',
    }
  },
  data() {
    return {
      gamesShowed: 0,
    }
  },
  computed: {
    gamesLimited() {
      return this.games.slice(0, this.gamesShowed);
    }
  },
  created() {
    this.gamesShowed = this.gamesToShow
  },
  methods: {
    ...mapActions(['startGame']),
    showMoreGames() {
      this.gamesShowed += this.gamesToShow;
    },
    onClickStartGame(payload) {
      if (!this.isLoggedIn) {
        this.showRegistrationDialog('login');
      } else this.startGame(payload);
    },
  }
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

    @media(min-width: $screen-s) {
      grid-template-columns: repeat(6, 1fr);
    }

    @media(min-width: $screen-l) {
      margin-bottom: 24px;
    }

    @media(min-width: $screen-xl) {
      margin-bottom: 32px;
    }
  }

  &-Btn {
    text-align: center;
  }
}
</style>