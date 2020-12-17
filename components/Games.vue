<template>
  <div class="Games">
    <div class="Games-Items">
      <Card
        v-for="(game, i) in gamesLimited"
        :key="i"
        :id="game.gameId"
        :img-url="game.imageUrl"
        overlay
        @play="onClickStartGame({ gameId: game.gameId, returnUrl: '/' })"
        @play-demo="startGame({ gameId: game.gameId, returnUrl: '/', demo: true })"
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
import showAuthDialog from '@/mixins/showAuthDialog';

export default {
  name: 'Games',
  mixins: [showAuthDialog],
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
    },
  },
  data() {
    return {
      gamesShowed: 0,
    };
  },
  computed: {
    gamesLimited() {
      return this.games.slice(0, this.gamesShowed);
    },
  },
  created() {
    this.gamesShowed = this.gamesToShow;
  },
  methods: {
    ...mapActions(['startGame']),
    showMoreGames() {
      this.gamesShowed += this.gamesToShow;
    },
    onClickStartGame(payload) {
      if (!this.isLoggedIn) {
        this.showRegistrationDialog('login');
        this.$router.push('/');
      } else {
        this.$router.push(`/game/${payload.gameId}?demo=0`);
      }
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
      grid-template-columns: repeat(6, 1fr);
    }

    @media (min-width: $screen-l) {
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
