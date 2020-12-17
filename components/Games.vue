<template>
  <div class="Games">
    <div class="Games-Items">
      <Card
        v-for="(game, i) in gamesLimited"
        :key="i"
        :id="game.gameId"
        :img-url="game.imageUrl"
        overlay
        @play="onClickStartGame"
        @openGamePage="openGamePage"
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
import { mapActions, mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';
import detect from '@/utils/deviceDetector';

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
    async openPage(id) {
      if (this.isMobile()) {
        const gameUrl = await this.startGame({
          gameId: id,
          returnUrl: '/',
          demo: true,
          platform: 'mobile',
          isMobile: true,
        });
        window.location.href = gameUrl;

        return;
      }
      
      this.$router.push(`/game`);
      const gameUrl = await this.startGame({
        gameId: id,
        returnUrl: '/',
        demo: true,
        platform: 'desktop',
      });
    },
    isMobile() {
      return detect.mobile() || detect.tablet() || detect.phone();
    },
    openGamePage({ id }) {
      this.openPage(id);
    },
    showMoreGames() {
      this.gamesShowed += this.gamesToShow;
    },
    onClickStartGame({ id }) {
      if (!this.isLoggedIn) {
        this.showRegistrationDialog('login');
        this.$router.push('/');
      } else {
        this.openPage(id);
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
